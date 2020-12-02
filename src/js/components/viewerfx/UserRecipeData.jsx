import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import { createFragmentContainer, graphql } from 'react-relay';
import keyMaker from '../helperfx/KeyMaker';
import RecipeItem from './RecipeItem';
import CreateRecipe from '../createfx/CreateRecipe';
import { idStrip } from '../helperfx/GrapheneIDStripper';
import { css, StyleSheet } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  Input
} from 'reactstrap';

const credentials = {
  'accessKeyId': AWS_ACCESS_KEY_ID,
  'secretAccessKey': AWS_SECRET_ACCESS_KEY
};

const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-west-1', credentials});

class UserRecipeData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      createModal: false,
      recipeFile: null,
      recipeImage: "",
      recipeName: "",
      recipeTags: "",
      recipeDescription: "",
      recipeDifficulty: "E",
      recipeIngredients: "",
      recipeTime: 0,
      recipeServings: 0
    };
  }

  fileGrabber = async (e) => {
    if (this.state.recipeFile){
      let deletePreviousImage = new Promise((resolve, reject) => {
         let params = {
           Bucket: S3_BUCKET,
           Key: this.state.recipeImage.split('.com/')[1]
         };
         s3.deleteObject(params, (err, data) => {
           if (err) {
             reject(err)
           } else {
             resolve(data)
           }
         });
      });
      let newImageUpload = new Promise((resolve, reject) => {
        resolve(this.setState({
          recipeFile: e.target.files[0],
          recipeImage: ""
        }))
      });
      let deleted = await deletePreviousImage;
      let uploadedToFrontend = await newImageUpload;
      console.log("uploaded to app");
      let uploadToS3 = new Promise((resolve, reject) => {
        let params = {
          Bucket: S3_BUCKET,
          Body: this.state.recipeFile,
          Key: keyMaker(this.props.username, this.state.recipeName, "RecipePicture"),
          ContentType: 'image/jpeg'
        };
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err)
          } else {
            console.log('data: ', data);
            resolve(this.setState({
              recipeImage: data.Location
            }));
          }
        });
      });
      let uploadedToS3 = await uploadToS3;
      console.log("uploaded to s3")
    } else {
      let promise = new Promise((resolve, reject) => {
        resolve(this.setState({recipeFile: e.target.files[0]}))
      })
      let test = await promise;
      // This promise ensures that the state is successfully set before we upload to s3
      let upload = new Promise((resolve, reject) => {
        let params = {
          Bucket: S3_BUCKET,
          Body: this.state.recipeFile,
          Key: keyMaker(this.props.username, this.state.recipeName, "RecipePicture"),
          ContentType: 'image/jpeg'
        };
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err)
          } else {
            console.log('data: ', data)
            console.log('data.location: ', data.Location);
            resolve(this.setState({
              recipeImage: data.Location
            }))
          }
        })
      })
      let uploaded = await upload
    }
    e.preventDefault()
  }

  activateModal = () => {
    this.setState({
      createModal: !this.state.createModal,
      hovered: false
    });
  }

  keyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render (){
    const {
      username
    } = this.props
    const hasRecipes = this.props.recipes.total > 0;
    return (
      <div className={css(styles.galleryContainer)}>
        {console.log("this.props: ", this.props)}
        {hasRecipes &&
          this.props.recipes.edges.map(recipe => (
            <RecipeItem
              user={username}
              id={idStrip(recipe.node.id)}
              key={recipe.node.id}
              name={recipe.node.name}
              image={recipe.node.image}
              tags={recipe.node.tags}
              description={recipe.node.description}
              difficulty={recipe.node.difficulty}
              difficultyLevel={recipe.node.difficultyLevel}
              ingredients={recipe.node.ingredients}
              time={recipe.node.time}
              servings={recipe.node.servings}
              createdDate={recipe.node.createdDate}
              likes={recipe.node.likes}
              comments={recipe.node.comments}
              userID={this.props.userID}
              steps={recipe.node.steps}
              totalStep={recipe.node.steps.total}
            />
          ))
        }
        <div
          className={css(this.state.hovered ? styles.hoveredImageContainer : styles.imageContainer)}
          onMouseEnter={(e) => this.setState({
            hovered: true
          })}
          onMouseLeave={(e) => this.setState({
            hovered: false
          })}
          onClick={(e) => this.activateModal()}
        >
          <FontAwesomeIcon
            icon={faPlus}
            size="6x"
            className={css(styles.additionIcon)}
          />
          <Modal size="lg" isOpen={this.state.createModal} toggle={() => this.activateModal()}>
            <ModalHeader className={css(styles.modalHeader)}>Recipe Creator</ModalHeader>
            <ModalBody>
              <Form>
                <div>
                  <Label className={css(styles.modalTextColor)}>Recipe Name:</Label>
                  <Input
                    type="text"
                    name="recipeName"
                    placeholder="Some Amazing Recipe"
                    onChange={(e) => this.keyStroke(e)}
                    value={this.state.recipeName}
                  />
                </div>
                <div>
                  <Label className={css(styles.modalTextColor)}>Recipe Description:</Label>
                  <Input
                    type="textarea"
                    name="recipeDescription"
                    placeholder="This is a recipe that I stole from my grandma and it's been one of my favorites ever since"
                    onChange={(e) => this.keyStroke(e)}
                    value={this.state.recipeDescription}
                  />
                </div>
                <div className={css(styles.modalServingsAndTime)}>
                  <div>
                    <Label className={css(styles.modalTextColor)}>Servings:</Label>
                    <Input
                      type="number"
                      name="recipeServings"
                      placeholder="4"
                      onChange={(e) => this.keyStroke(e)}
                      value={this.state.recipeServings}
                      />
                  </div>
                  <div>
                    <Label className={css(styles.modalTextColor)}>Total Time (mins)</Label>
                    <Input
                      type="number"
                      name="recipeTime"
                      placeholder="45"
                      onChange={(e) => this.keyStroke(e)}
                      value={this.state.recipeTime}
                    />
                  </div>
                  <div>
                    <Label className={css(styles.modalTextColor)}>Difficulty</Label>
                    <Input type="select" name="select" value={this.state.recipeDifficulty} onChange={(e) => this.setState({recipeDifficulty: e.target.value})}>
                      <option value='E'>Easy</option>
                      <option value='F'>Fair</option>
                      <option value='H'>Hard</option>
                      <option value='C'>Challenging</option>
                    </Input>
                  </div>
                </div>
                <div>
                  <Label className={css(styles.modalTextColor)}>Recipe Ingredients:</Label>
                  <Input
                    type="textarea"
                    name="recipeIngredients"
                    placeholder="8 oz prime rib, 2 sprigs of thyme... Please keep the format of (qty)_(ingredient)(,)"
                    onChange={(e) => this.keyStroke(e)}
                    value={this.state.recipeIngredients}
                  />
                </div>
                <div>
                  <Label className={css(styles.modalTextColor)}>Recipe Image</Label>
                  <div className={css(this.state.recipeImage ? styles.modalRecipeImageContainer : null)}>
                    <div className={css(this.state.recipeImage ? styles.modalImageCol : styles.modalImageRow)}>
                      {this.state.recipeImage ?
                        <img className={css(styles.modalRecipeImage)} src={this.state.recipeImage} />
                        : null}
                      <Input
                        type="file"
                        onChange={(e) => this.fileGrabber(e)}
                        accept=".jpeg,.jpg, .png"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className={css(styles.modalTextColor)}>Tags</Label>
                  <Input
                    type="text"
                    name="recipeTags"
                    placeholder="#healthy #fire #seafood #keto"
                    onChange={(e) => this.keyStroke(e)}
                    value={this.state.recipeTags}
                  />
                </div>
                {this.state.recipeImage ?
                  <Button color='primary' onClick={() => CreateRecipe(
                    this.state.recipeName,
                    this.state.recipeImage,
                    this.state.recipeTags,
                    this.state.recipeDescription,
                    this.state.recipeDifficulty,
                    this.state.recipeIngredients,
                    this.state.recipeTime,
                    this.state.recipeServings,
                    this.props.username,
                    () => console.log("saving to db")
                  )}>
                    Submit
                  </Button>
                : null}
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    )
  }
}



const styles = StyleSheet.create({
  // galleryContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'start',
  //   padding: '0 0 0 12%',
  //   flexWrap: 'wrap',
  //   marginTop: '50px',
  //   position: 'relative',
  // },
  // Optional in case we can't find a way to left align items

// We need to find a way to make recipeImageUpload more aesthetic

  galleryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0 1%',
    margin: '2.5% 8% 0% 8%',
    position: 'relative',
  },

  hoveredImageContainer: {
    backgroundColor: '#e8e8e8',
    position: 'relative',
    minWidth: '450px',
    minHeight: '450px',
    maxWidth: '450px',
    maxHeight: '450px',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    marginBottom: '1%',
    opacity: '.7',
  },
  imageContainer: {
    backgroundColor: '#e8e8e8',
    position: 'relative',
    minWidth: '450px',
    minHeight: '450px',
    maxWidth: '450px',
    maxHeight: '450px',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    marginBottom: '1%',
    opacity: '1',
  },
  additionIcon: {
    position: 'absolute',
    top: '34%',
    left: '39%',
    color: '#c3c3c3',
  },
  modal: {},
  modalTextColor: {
    color: 'blue'
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: '100%',
    color: 'orange'
  },
  modalBody: {},
  modalServingsAndTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalServings: {
    width: '50%'
  },
  modalTime: {
    width: '50%'
  },
  modalRecipeImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalImageCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  modalImageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start'
  },
  modalRecipeImage: {
    minWidth: '300px',
    minHeight: '300px',
    maxWidth: '300px',
    maxHeight: '300px'
  }
})

export default createFragmentContainer(UserRecipeData, {
  recipes: graphql`
    fragment UserRecipeData_recipes on RecipeConnection {
      total,
      edges {
        node {
          id,
          name,
          image,
          tags,
          description,
          difficulty,
          difficultyLevel,
          ingredients,
          time,
          servings,
          createdDate,
          likes,
          comments,
          steps {
            total,
            ...StepData_steps
          }
        }
      }
    }
  `
})
