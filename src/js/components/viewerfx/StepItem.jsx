import React, { Component, Fragment } from 'react';
import CommentCreator from '../createfx/CommentCreator';
import CommentData from './CommentData';
import { StyleSheet, css } from 'aphrodite';
import {
  Row,
  Col
} from 'reactstrap';

const styles = StyleSheet.create({
  imagesize: {
    width: "100%"
  },
})

class StepItem extends Component {
  render() {
    return (
      <Row>
        <Col xs="6">
          <img className={css(styles.imagesize)} src={this.props.image}/>
        </Col>
        <Col xs="6">
          <h4>{this.props.name}</h4>
          <hr />
          <p>{this.props.explanation}</p>
          <CommentData
            userID={this.props.userID}
            comments={this.props.comments}
          />
          <CommentCreator
            userID={this.props.userID}
            stepID={parseInt(this.props.id)}
            step={this.props.name}
          />
        </Col>
      </Row>
    )
  }
}

export default StepItem;

// <p>Position: {this.props.position}</p>
