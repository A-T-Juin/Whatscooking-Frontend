import React, { Component, Fragment } from 'react';
import ResponseData from './ResponseData';
import ResponseCreator from '../createfx/ResponseCreator'

class CommentItem extends Component {
  render() {
    return (
      <Fragment>
        <h2>{this.props.postedBy.username}</h2>
        <p>{this.props.text}</p>
        <ResponseData responses={this.props.responses} />
        <ResponseCreator
          userID={this.props.userID}
          commentID={this.props.commentID}
        />
      </Fragment>
    )
  }
}

export default CommentItem;
