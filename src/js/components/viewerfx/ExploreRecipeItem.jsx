import React, { Component, Fragment } from 'react';
import StepCreator from '../createfx/StepCreator';
import StepData from './StepData'
import { css, StyleSheet } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensilSpoon, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

const styles = StyleSheet.create({
  alignCenter: {
    textAlign: "center"
  },
  alignRight: {
    textAlign: "right"
  },
  cardResizer: {
    width: "300px"
  },
  fluid: {
    width: "100%"
  },
  hover: {
    ':hover': {
      opacity: ".60"
    }
  }
})

class ExploreRecipeItem extends Component {
  constructor(){
    super();
    this.state = {
      modalStatus: false
    }
  };

  activateModal = () => {
    this.setState({
      modalStatus: !this.state.modalStatus
    })
  }

  render() {
    const Buttons = ["Add to Collection", "Report"];
    const displayButtons = Buttons.map(button => {
      return (
        <Row>
          <Col className={css(styles.alignCenter)}>
            <Button outline color="secondary" className={css(styles.fluid)}>{button}</Button>
          </Col>
        </Row>
      )
    })
    return (
      <Col sm="12" md={{ size: 6, offset: 3}}>
        <Card className={css(styles.cardResizer)}>
          <CardHeader>
            <Row>
              <Col xs="6">Creator</Col>
              <Col className={css(styles.alignRight)} xs="6">
                <FontAwesomeIcon icon={faEllipsisH} onClick={() => {this.activateModal()}}/>
                <Modal isOpen={this.state.modalStatus} toggle={() => this.activateModal()}>
                  <ModalHeader toggle={() => this.activateModal()}></ModalHeader>
                  <ModalBody>
                    {displayButtons}
                  </ModalBody>
                </Modal>
              </Col>
            </Row>
          </CardHeader>
          <CardImg
            className={css(styles.hover)}
            src={this.props.image}
            alt="Recipe Cover Photo"
          />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>
              {this.props.likes + " "}
              <FontAwesomeIcon icon={faUtensilSpoon} />
            </CardSubtitle>
            <CardBody>
              <p>{this.props.description}</p>
            </CardBody>
            <CardFooter>
              <h4>{this.props.tags}</h4>
              <p>{this.props.createdDate}</p>
            </CardFooter>
          </CardBody>
        </Card>
        <StepData steps={this.props.steps} userID={this.props.userID}/>
        <StepCreator
          recipeID={this.props.id}
          recipe={this.props.name}
        />
      </Col>
    )
  }
}

export default ExploreRecipeItem;
