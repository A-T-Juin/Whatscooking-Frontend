import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import { css, StyleSheet } from 'aphrodite';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import keyMaker from '../helperfx/KeyMaker';
import CreateRecipe from '../createfx/CreateRecipe';
import ProfileHeaderInfo from './ProfileHeaderInfo';
import UserRecipeData from './UserRecipeData';
import { idStrip } from '../helperfx/GrapheneIDStripper';

const credentials = {
  "accessKeyId": AWS_ACCESS_KEY_ID,
  "secretAccessKey": AWS_SECRET_ACCESS_KEY
}

const s3 = new AWS.S3({apiVersion: '2006-03-01', region:'us-west-1', credentials});



class CreationManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      createModal: false,
      recipeFile: null,
      recipeImage: "",
      recipeName: "",
      recipeTags: "",
      recipeDescription: "",
      recipeDifficulty: "",
      recipeIngredients: "",
      recipeTime: 0,
      recipeServings: 0
    }
  }

  fileGrabber = (e) => {
    this.setState({
      recipeFile: e.target.files[0]
    });
  }

  keyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  activateCreateModal = () => {
    this.setState({
      createModal: !this.state.createModal
    });
  }

  resetForm = () => {
    this.setState({
      recipeFile: null,
      recipeName: "",
      recipeImage: "",
      recipeTags: "",
      recipeDescription: "",
      recipeDifficulty: "",
      recipeIngredients: "",
      recipeTime: 0,
      recipeServings: 0
    });
  }

  async createRecipe(e) {

    const s3UploadPromise = () => {
      return new Promise ((resolve, reject) => {
        let params = {
          Bucket: S3_BUCKET,
          Body: this.state.recipeFile,
          Key: keyMaker(this.state.recipeName, "RecipePicture"),
          ContentType: 'image/jpeg'
        };
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    var s3UploadInfo = await s3UploadPromise()

    const recipeData = {
      name: this.state.recipeName,
      image: s3UploadInfo.Location,
      tags: this.state.recipeTags,
      description: this.state.recipeDescription
    }
    CreateRecipe(
      recipeData.name,
      recipeData.image,
      recipeData.tags,
      recipeData.description,
      this.props.userinfo.username,
      (data) => {
        console.log("Upload Complete")
      }
    );
    this.resetForm();
    e.preventDefault();
  }

  submit = (e) => {
    const recipeData = {
      name: this.state.recipeName,
      image: "test",
      tags: this.state.recipeTags,
      description: this.state.recipeDescription,
      difficulty: this.state.recipeDifficulty,
      ingredients: this.state.recipeIngredients,
      time: this.state.recipeTime,
      servings: this.state.recipeServings,
    };
    CreateRecipe(
      recipeData.name,
      recipeData.image,
      recipeData.tags,
      recipeData.description,
      recipeData.difficulty,
      recipeData.ingredients,
      recipeData.time,
      recipeData.servings,
      this.props.userinfo.username,
      () => {
        console.log("Upload COmplete")
      }
    );
    e.preventDefault();
    this.resetForm()
  }


  render() {
    const {
      id,
      info,
      username,
      image,
      recipes
    } = this.props.userinfo
    return (
      <div className={css(styles.componentContainer)}>
        <div className={css(styles.row)}>
          <ProfileHeaderInfo
            userID={id}
            username={username}
            info={info}
            image={image}
            recipes={this.props.userinfo.totalRecipes}
            following={this.props.userinfo.totalFollowing}
            followers={this.props.userinfo.totalFollowers}
          />
        </div>
        <hr className={css(styles.separationLine)}/>
        <UserRecipeData
          className={css(styles.galleryContainer)}
          username={username}
          recipes={recipes}
          userID={parseInt(idStrip(id))}
        />
      </div>
    )
  }

}

const styles = StyleSheet.create({
  componentContainer: {
    margin: '2.5% 0 0 0',
    height: '100%'
  },
  separationLine: {
    margin: '2.5% 15% 0% 15%'
  },
  galleryContainer: {
    marginTop: '-5%',
  },
})

export default CreationManager;

// const blah = (
// <Modal size="" isOpen={this.state.createModal} toggle={() => this.activateCreateModal()} size="lg">
//   <ModalHeader className={css(styles.center)}>Recipe Creator</ModalHeader>
//   <ModalBody>
//     <Form>
//       <FormGroup>
//         <Label for="recipeName">Recipe Name</Label>
//         <Input
//           type="text"
//           name="recipeName"
//           placeholder="Some Amazing Recipe..."
//           onChange={(e) => this.keyStroke(e)}
//           value={this.state.recipeName}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="recipeTags">Recipe Tags</Label>
//         <Input
//           type="text"
//           name="recipeTags"
//           placeholder="#yums #seafood"
//           onChange={(e) => this.keyStroke(e)}
//           value={this.state.recipeTags}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="description">Description</Label>
//         <Input
//           type="textarea"
//           name="recipeDescription"
//           placeholder="This fantastic recipe is ..."
//           onChange={(e) => this.keyStroke(e)}
//           value={this.state.recipeDescription}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="ingredients">Ingredients</Label>
//         <Input
//           type="textarea"
//           name="recipeIngredients"
//           placeholder="This fantastic recipe is made of . . ."
//           onChange={(e) => this.keyStroke(e)}
//           value={this.state.recipeIngredients}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="recipeTime">Time</Label>
//         <Input
//           type="number"
//           name="recipeTime"
//           placeholder="45 minutes"
//           onChange={(e) => this.keyStroke(e)}
//           value={this.state.recipeTime}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="recipeServings">Recipe Servings</Label>
//         <Input
//           type="number"
//           name="recipeServings"
//           placeholder="Serves 6 . . ."
//           onChange={(e) => this.keyStroke(e)}
//           value={this.state.recipeServings}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="recipeDifficulty">
//           <Input
//             type="radio"
//             name="recipeDifficulty"
//             onChange={() => this.setState({
//               recipeDifficulty: "E"
//             })}
//           />
//           Easy
//         </Label>
//         <Label for="recipeDifficulty">
//           <Input
//             type="radio"
//             name="recipeDifficulty"
//             onChange={() => this.setState({
//               recipeDifficulty: "F"
//             })}
//           />
//           Fair
//         </Label>
//         <Label for="recipeDifficulty">
//           <Input
//             type="radio"
//             name="recipeDifficulty"
//             onChange={() => this.setState({
//               recipeDifficulty: "H"
//             })}
//           />
//           Hard
//         </Label>
//         <Label for="recipeDifficulty">
//           <Input
//             type="radio"
//             name="recipeDifficulty"
//             onChange={() => this.setState({
//               recipeDifficulty: "C"
//             })}
//           />
//           Challenging
//         </Label>
//       </FormGroup>
//       <FormGroup>
//         <Label for="recipeImage">Recipe Photo</Label>
//         <Input
//           type="file"
//           name="recipeImage"
//           onChange={(e) => this.fileGrabber(e)}
//         />
//       </FormGroup>
//       <Button onClick={(e) => {this.submit(e)}}>Submit</Button>
//     </Form>
//   </ModalBody>
// </Modal>
// )
