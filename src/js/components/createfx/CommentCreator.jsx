import React, { Component, Fragment } from 'react';
import CreateComment from './CreateComment';
import { StyleSheet, css } from 'aphrodite';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';

const styles = StyleSheet.create({
  sizing: {
    margin: "0 0",
    width: "100%",
  },
  invisBorder: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
  },
  transparent: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    color: "#8babb5"
  },
})

class CommentCreator extends Component {
  constructor(){
    super();
    this.state = {
      comment: "",
    }
  }

  keyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  resetForm = () => {
    this.setState({
      comment: "",
    })
  }

  postComment = (e) => {
    const commentData = {
      comment: this.state.comment
    };
    CreateComment(commentData.comment, this.props.userID, this.props.stepID, () => {
      console.log("Comment Created")
    });
    e.preventDefault();
    this.resetForm();
  }
  render(){
    console.log("this.props: ", this.props)
    return(
      <Row>
        <Col xs="8">
          <input
            className={css(styles.sizing, styles.invisBorder)}
            type="textarea"
            name="comment"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.comment}
          />
        </Col>
        <Col xs="4">
          <button className={css(styles.sizing, styles.transparent)} onClick={(e) => this.postComment(e)} color="primary">Post</button>
        </Col>
      </Row>
    )
  }
}

export default CommentCreator;
