import React, { Component, Fragment } from 'react';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import keyMaker from '../helperfx/KeyMaker';
import * as AWS from 'aws-sdk';
import StepCreator from '../createfx/StepCreator';
import StepData from './StepData';
import { css, StyleSheet } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '../utils/Backdrop';
import Modal from '../utils/Modal';
import {
  faUtensilSpoon,
  faEllipsisH,
  faHeart,
  faLemon,
  faComments,
  faHourglassHalf,
  faWindowClose,
  faBible
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons';
import {
  Button,

} from 'reactstrap';

const credentials = {
  "accessKeyId": AWS_ACCESS_KEY_ID,
  "secretAccessKey": AWS_SECRET_ACCESS_KEY
}

const s3 = new AWS.S3({apiVersion: '2006-03-01', region:'us-west-1', credentials});

const difficultyLevels = {
  'E': 1,
  'F': 2,
  'H': 3,
  'C': 4
};

class RecipeItem extends Component {
  constructor(){
    super();
    this.state = {
      hovered: false,
      modalViewer: false,
      stepHighlight: null
    }
  };

  triggerModal = () => {
    this.setState({
      modalViewer: !this.state.modalViewer,
      hovered: false
    });
  };

  render() {
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

    // const steps = this.state.steps.edges.map(step => {
    //   return (
    //     <div
    //       onMouseEnter={() => this.setState({stepHighlight: step.node.id})}
    //       onMouseLeave={() => this.setState({stepHighlight: null})}
    //       className={css(styles.stepItem)}
    //       >
    //       <p className={css(styles.stepPosition)}>{step.node.position + 1}.</p>
    //       <p
    //         id={step.node.id}
    //         className={css(this.state.stepHighlight === step.node.id ? styles.stepExplanationHighlight : styles.stepExplanation)}
    //         onClick={() => this.setState({activeStep: step.node.id})}
    //         >
    //         {step.node.explanation}
    //       </p>
    //       <p className={css(this.state.stepHighlight == step.node.id ? styles.stepLike : styles.stepLikeHidden)}>{step.node.totalLikes}</p>
    //       {userLiked(this.props.user, step.node, step.node.id)}
    //       <p className={css(this.state.stepHighlight == step.node.id ? styles.stepCommentText : styles.stepCommentTextHidden)}>{step.node.comments.total}</p>
    //       <FontAwesomeIcon
    //         icon={faComments}
    //         size='1x'
    //         className={css(this.state.stepHighlight == step.node.id ? styles.stepComment : styles.stepCommentHidden)}
    //         />
    //     </div>
    //   );
    // });

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

    return (
      <div
        className={css(styles.imageContainer)}
        onClick={() => this.triggerModal()}
        onMouseEnter={(e) => this.setState({
          hovered: true
        })}
        onMouseLeave={(e) => this.setState({
          hovered: false
        })}
      >
        <div className={css(this.state.hovered ? styles.shadowTextContainer : styles.invisibleTextContainer)}>
          <p className={css(styles.shadowText)}>
            {this.props.likes}
          </p>
          <FontAwesomeIcon
            icon={faHeart}
            size="1x"
            className={css(styles.shadowIcon)}
            />
          <p className={css(styles.shadowText)}>
            {this.props.comments}
          </p>
          <FontAwesomeIcon
            icon={faComments}
            size="1x"
            className={css(styles.shadowIcon)}
            />
        </div>
        <div className={css(this.state.hovered ? styles.shadowButtonContainer : styles.invisibleButtonContainer)}>
          <Button className={css(styles.shadowButton)} color='danger' onClick={() => console.log(this.props)}>Delete</Button>
        </div>
        <img src={this.props.image} className={css(this.state.hovered ? styles.opaqueImage : styles.image)} />
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
                        <p className={css(styles.ingredientItem)}>- 999 grams of super sasdfas</p>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    minWidth: '450px',
    minHeight: '450px',
    maxWidth: '450px',
    maxHeight: '450px',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '15px',
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  opaqueImage: {
    width: '100%',
    height: '100%',
    opacity: '.60',
    position: 'absolute',
  },
  shadowButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: '0 0 10% 0',
    opacity: '.7',
    zIndex: '1'
  },
  invisibleButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    opacity: '0',
    zIndex: '0'
  },
  shadowButton: {
    fontSize: '200%'
  },
  shadowTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: '1',
    zIndex: '1',
  },
  invisibleTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
  date: {
    fontSize: '75%',
    marginLeft: '0.5%',
  },
  modalHeaderTags: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '12.5%',
    paddingRight: '12.5%'
  },
  tags: {
    fontSize: '100%',
    marginLeft: '0.5%',
    marginRight: '0.5%',
  },
  modalRecipeBigStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '2%',
    marginRight: '2%',
    width: '33%',
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
    width: '33%',
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
    width: '33%',
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
    fontSize: '150%',
    textAlign: 'center',
  },
  diffLevel: {
    marginTop: '-20%',
    fontSize: '50%',
    textAlign: 'center',
  },
  lemonContainer: {
    marginLeft: '4%',
    marginRight: '4%',
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
  },
  ingredientSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: '0 12.5%',
  },
  ingredientItemContainer: {
    maxWidth: '30%',
    minWidth: '30%',
    margin: '1%',
    display: 'flex',
    flexDirection: 'row',
  },
  ingredientItem: {
    // marginLeft: '7%',
    // marginRight: '7%',
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
  }
})


export default RecipeItem;
