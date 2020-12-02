
import React, { Component, Fragment } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Like from '../updatefx/Like';
import Unlike from '../updatefx/Unlike';
import { css, StyleSheet } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '../utils/Backdrop';
import Modal from '../utils/Modal';
import {
  faUtensilSpoon,
  faHourglassHalf,
  faLemon,
  faHeart,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faWindowClose,
} from '@fortawesome/free-regular-svg-icons';
import {
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem
} from 'reactstrap';

const difficultyLevels = {
  'E': 1,
  'F': 2,
  'H': 3,
  'C': 4
};

class VarUserRecipes extends Component {
  constructor(props){
    super(props);
    this.state = {
      hovered: false,
      tab: 'Ingredients',
      modalViewer: false,
      stepHighlight: null,
      activeStep: null,
      totalLikes: props.likes,
      totalComments: props.comments,
      steps: props.steps
    };
  };

  onLike = async (stepID) => {
    console.log("Liking the step....");
    try {
      let result = await Like(1, 1, stepID);
      console.log('result: ', result)
    }
    catch (error) {
      console.log("error: ", error)
    };
  }

  onUnlike = async (userID, edge, node, stepID) => {
    console.log("unliking the step....");
    // let step = this.state.steps;
    // for (var i = 0; i < step.edges.length; i ++){
    //   if (step.edges[i].node.id === stepID){
    //     console.log('step: ', step.edges[i].node.likes.edges);
    //     step.edges[i].node.likes.edges.splice(node, 1);
    //     // step.edges[i].node.likes.splice(node, 1);
    //   };
    // }
    try {
      // this.setState({
      //   steps: step
      // });
      let result = await Unlike(1, 1);
    }
    catch (error) {
      // console.log("error: ", error)
    };
  }

  triggerModal = () => {
    this.setState({
      modalViewer: !this.state.modalViewer,
      activeStep: null,
    });
  };

  render(){
    const recipeTags = (this.props.tags).split('#').map(tag => {
      return (
        <Button outline color='success' className={css(styles.tags)}>#{tag}</Button>
      );
    });
    recipeTags.splice(0, 1);

    let difficultyMultiplier = [...Array(difficultyLevels[this.props.difficulty])];

    const numLemons = difficultyMultiplier.map(lemons => {
      return (
        <FontAwesomeIcon
          icon={faLemon}
          size='1x'
          className={css(styles.lemon)}
          />
      );
    });

    const ingredients = this.props.ingredients.split(',').map(ingredient => {
      return (
        <div className={css(styles.ingredientItemContainer)}>
          <p className={css(styles.ingredientItem)}>- {ingredient}</p>
        </div>
      );
    });

    const userLiked = (id, edge, stepID) => {
      for (var i = 0; i < edge.likes.edges.length; i ++){
        if (id === edge.likes.edges[i].node.id){
          let node = i;
          return (
            <FontAwesomeIcon
              className={css(this.state.stepHighlight == stepID ? styles.stepHeart : styles.stepHeartHidden)}
              icon={faHeart}
              size='1x'
              onClick={() => this.onUnlike(id, edge, node, stepID)}
              />
          )
        }
      };
      return (
        <FontAwesomeIcon
          className={css(this.state.stepHighlight == stepID ? styles.stepHeart : styles.stepHeartHidden)}
          icon={farHeart}
          size='1x'
          onClick={() => this.onLike(stepID)}
        />
      )
    }

    const steps = this.state.steps.edges.map(step => {
      return (
        <div
          onMouseEnter={() => this.setState({stepHighlight: step.node.id})}
          onMouseLeave={() => this.setState({stepHighlight: null})}
          className={css(styles.stepItem)}
          >
          <p className={css(styles.stepPosition)}>{step.node.position + 1}.</p>
          <p
            id={step.node.id}
            className={css(this.state.stepHighlight === step.node.id ? styles.stepExplanationHighlight : styles.stepExplanation)}
            onClick={() => this.setState({activeStep: step.node.id})}
            >
            {step.node.explanation}
          </p>
          <p className={css(this.state.stepHighlight == step.node.id ? styles.stepLike : styles.stepLikeHidden)}>{step.node.totalLikes}</p>
          {userLiked(this.props.user, step.node, step.node.id)}
          <p className={css(this.state.stepHighlight == step.node.id ? styles.stepCommentText : styles.stepCommentTextHidden)}>{step.node.comments.total}</p>
          <FontAwesomeIcon
            icon={faComments}
            size='1x'
            className={css(this.state.stepHighlight == step.node.id ? styles.stepComment : styles.stepCommentHidden)}
            />
        </div>
      );
    });

    const commentViewer = (stepID) => {
      let step = null;
      for (var i = 0; i < this.props.steps.edges.length; i ++){
        if (this.props.steps.edges[i].node.id == stepID){
          step = this.props.steps.edges[i].node;
        };
      };
      return (
        <div className={css(styles.modalTextContainer)}>
          <div className={css(styles.exitIconContainer)}>
            <FontAwesomeIcon
              icon={faWindowClose}
              size='2x'
              className={css(styles.exitIcon)}
              onClick={() => this.setState({activeStep: null})}
              />
          </div>
          <div className={css(styles.stepsContainer)}>
            <div className={css(styles.stepViewerExplanationSection)}>
              <p className={css(styles.stepViewerExplanation)}>Sous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, BakeSous Vide, Braise, Sear, Bake</p>

            </div>
          </div>
          <hr className={css(styles.stepViewerSeparator)} />
        </div>
      )
    }

    return(
      <div className={css(styles.imageContainer)}>
        <div className={css(this.state.hovered ? styles.shadowTextContainer : styles.invisibleTextContainer)}>
          <p className={css(styles.shadowText)}>
            {this.state.totalLikes}
          </p>
          <FontAwesomeIcon
            icon={faHeart}
            size="1x"
            className={css(styles.shadowIcon)}
            />
          <p className={css(styles.shadowText)}>
            {this.state.totalComments}
          </p>
          <FontAwesomeIcon
            icon={faComments}
            size="1x"
            className={css(styles.shadowIcon)}
            />
        </div>
        <img
          src={this.props.image}
          className={css(this.state.hovered ? styles.opaqueImage : styles.image)}
          onMouseEnter={(e) => this.setState({
            hovered: !this.state.hovered
          })}
          onMouseLeave={(e) => this.setState({
            hovered: !this.state.hovered
          })}
          onClick={() => this.triggerModal()}
          />
        <Backdrop active={this.state.modalViewer} toggler={this.triggerModal} />
        {this.state.modalViewer ?
          <Modal active={this.state.modalViewer}>
            <div className={css(styles.modalLayout)}>
              <div className={css(styles.modalImageContainer)}>
                <img className={css(styles.modalImage)} src={this.props.image} alt='recipe image' />
              </div>
              {this.state.activeStep ?
                <Fragment>
                  {commentViewer(this.state.activeStep)}
                </Fragment>
                :
                <div className={css(styles.modalTextContainer)}>
                  <div className={css(styles.modalHeaderTitle)}>{this.props.name}</div>
                  <div className={css(styles.modalHeaderAuthored)}>
                    <p className={css(styles.author)}>{this.props.createdBy}</p>
                    <p className={css(styles.date)}>{this.props.createdDate}</p>
                  </div>
                  <div className={css(styles.modalHeaderTags)}>{recipeTags}</div>
                  <div className={css(styles.modalRecipeBigStats)}>
                    <div className={css(styles.timeContainer)}>
                      <div className={css(styles.timeText)}>
                        <p className={css(styles.time)}>{this.props.time}</p>
                        <p className={css(styles.minutes)}>Minutes</p>
                      </div>
                      <FontAwesomeIcon
                        icon={faHourglassHalf}
                        size="2x"
                        className={css(styles.hourglass)}
                        />
                    </div>
                    <div className={css(styles.servingsContainer)}>
                      <div className={css(styles.servingsText)}>
                        <p className={css(styles.servingAmount)}>{this.props.servings}</p>
                        <p className={css(styles.serving)}>Servings</p>
                      </div>
                      <FontAwesomeIcon
                        icon={faUtensilSpoon}
                        size="2x"
                        className={css(styles.spoon)}
                        />
                    </div>
                    <div className={css(styles.difficultyContainer)}>
                      <div className={css(styles.difficultyText)}>
                        <p className={css(styles.diff)}>{this.props.difficultyLevel}</p>
                        <p className={css(styles.diffLevel)}>Difficulty</p>
                      </div>
                      <div className={css(styles.lemonContainer)}>
                        {numLemons}
                      </div>
                    </div>
                  </div>
                  <hr className={css(styles.sectionSeparator)}/>
                  <div className={css(styles.ingredientSection)}>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 5lb Steak</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 5lb Steak</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 999 grams of super sasdfasdfasdf jkasdf</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 4qt Milk fat</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 999 grams of super spek</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 5lb Steak</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 5lb Steak</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 5lb Steak</p>
                    </div>
                    <div className={css(styles.ingredientItemContainer)}>
                      <p className={css(styles.ingredientItem)}>- 4qt Milk fat</p>
                    </div>
                  </div>
                  <hr className={css(styles.sectionSeparator)} />
                  <div className={css(styles.stepsContainer)}>
                    {steps}
                  </div>
                </div>
              }
            </div>
          </Modal>
          : null}
        </div>
      )
    }
  }

  const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative',
      minWidth: '450px',
      minHeight: '450px',
      maxWidth: '450px',
      maxHeight: '450px',
      marginLeft: '1%',
      marginRight: '1%',
      marginTop: '1%',
      marginBottom: '1%',
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    opaqueImage: {
      width: '100%',
      height: '100%',
      opacity: '.6',
      position: 'absolute',
    },
    shadowTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: '50%',
      left: '35%',
      opacity: '1',
      zIndex: '1',
    },
    invisibleTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: '50%',
      left: '35%',
      opacity: '0',
    },
    shadowIcon: {
      fontSize: '1.4em',
      verticalAlign: 'middle',
      color: '#ffffff',
      marginTop: '.30em',
      marginRight: '1em',
    },
    shadowText: {
      fontSize: '1.7em',
      color: '#ffffff',
      marginRight: '.5em',
    },
    modalLayout: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      width: '100%',
      height: '100%',
    },
    modalImageContainer: {
      width: '40%',
      overflow: 'hidden',
      position: 'relative',
    },
    modalImage: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    modalTextContainer: {
      width: '60%',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
    },
    modalHeaderTitle: {
      fontSize: '300%',
      textAlign: 'center',
    },
    modalHeaderAuthored: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '-1%'
    },
    author: {
      fontSize: '75%',
      marginRight: '0.5%',
    },
    date: {
      fontSize: '75%',
      marginLeft: '0.5%',
    },
    modalHeaderTags: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tags: {
      fontSize: '100%',
      marginLeft: '0.5%',
      marginRight: '0.5%',
    },
    modalRecipeBigStats: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    timeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: '2%',
      marginRight: '2%',
    },
    timeText: {
      fontSize: '150%',
      marginLeft: '2.5%',
      marginRight: '2.5%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
    },
    time: {
      fontSize: '1.5em',
      textAlign: 'center',
    },
    minutes: {
      marginTop: '-50%',
      fontSize: '50%',
      textAlign: 'center',
    },
    hourglass: {
      fontSize: '300%',
      marginTop: '.3em',
      color: '#f2ac3f',
      // color: '#0D53C0',
    },
    servingsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: '8%',
      marginRight: '8%',
    },
    servingsText: {
      fontSize: '150%',
      marginLeft: '2.5%',
      marginRight: '2.5%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
    },
    servingAmount: {
      fontSize: '1.5em',
      textAlign: 'center',
    },
    serving: {
      marginTop: '-50%',
      fontSize: '50%',
      textAlign: 'center',
    },
    spoon: {
      fontSize: '300%',
      marginTop: '.3em',
      color: '#f2ac3f',
      // color: '#0D53C0',
      // color: '#6b889e',
    },
    difficultyContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: '2%',
      marginRight: '2%',
    },
    difficultyText: {
      fontSize: '150%',
      marginLeft: '2.5%',
      marginRight: '2.5%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
    },
    diff: {
      fontSize: '1.5em',
      textAlign: 'center',
    },
    diffLevel: {
      marginTop: '-35%',
      fontSize: '50%',
      textAlign: 'center',
    },
    lemonContainer: {
      marginLeft: '2%',
      marginRight: '2%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    lemon: {
      fontSize: '150%',
      marginTop: '2%',
      color: '#f2ac3f',
      // color: '#0D53C0',
      // color: '#fbfb9e',
    },
    sectionSeparator: {
      width: '77%',
      padding: '-10% 0',
    },
    ingredientSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      flexWrap: 'wrap',
      textAlign: 'center',
      padding: '0 15%',
    },
    ingredientItemContainer: {
      maxWidth: '30%',
      minWidth: '30%',
      marginTop: '1%',
      marginBottom: '1%',
      display: 'flex',
      flexDirection: 'row',
    },
    ingredientItem: {
      marginLeft: '7%',
      marginRight: '7%',
      fontSize: '100%',
    },
    stepsContainer: {
      padding: '0 15%',
    },
    stepItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      width: '100%',
    },
    stepPosition: {
      width: '5%',
      padding: '0 1% 0 0',
    },
    stepExplanation: {
      width: '95%',
      padding: '0 0 0 1%',
    },
    stepExplanationHighlight: {
      width: '95%',
      padding: '0 0 0 1%',
      color: 'orange',
    },
    stepLike: {
      opacity: '1',
    },
    stepLikeHidden: {
      opacity: '0',
    },
    stepCommentText: {
      opacity: '1',
    },
    stepCommentTextHidden: {
      opacity: '0',
    },
    stepHeart: {
      fontSize: '.75em',
      marginTop: '1%',
      marginLeft: '1%',
      marginRight: '1%',
      opacity: '1',
      color: '#e7633f',
    },
    stepComment: {
      fontSize: '.75em',
      marginTop: '1%',
      marginLeft: '1%',
      marginRight: '1%',
      opacity: '1',
      color: '#51d797',
    },
    stepHeartHidden: {
      fontSize: '.75em',
      marginTop: '1%',
      marginLeft: '1%',
      marginRight: '1%',
      opacity: '0',
    },
    stepCommentHidden: {
      fontSize: '.75em',
      marginTop: '1%',
      marginLeft: '1%',
      marginRight: '1%',
      opacity: '0',
    },
    // The below styles will refer to when the step is clicked
    exitIconContainer: {
      textAlign: 'right',
    },
    exitIcon: {
      color: 'grey',
      opacity: '.7',
    },
    stepViewerExplanationSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      width: '100%',
    },
    stepViewerExplanation: {
      width: '90%',
      fontSize: '125%',
    },
    stepViewerSeparator: {
      width: '95%',
      padding: '-10% 0 10% 0',
    },
  })

export default VarUserRecipes;

  // export default createFragmentContainer(VarUserRecipes,
  //   {
  //   userRecipes: graphql`
  //   fragment VarUserRecipes_userRecipes on UserNode {
  //     recipes(
  //       first: 2147483647
  //     ) @connection(key: "VarUserRecipes_recipes"){
  //       total,
  //       edges {
  //         node {
  //           name
  //
  //         }
  //       }
  //     }
  //   }
  //   `
  // })
