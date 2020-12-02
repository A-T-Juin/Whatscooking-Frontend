import React, { Component, Fragment } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import CommentItem from './CommentItem';
import {idStrip} from '../helperfx/GrapheneIDStripper';

class CommentData extends Component {
  render() {
    console.log("this.props.comments: ", this.props)
    console.log("this.props.comments: ", this.props.comments)
    const hasComments = this.props.comments.total > 0;
    return (
      <Fragment>
        {
          hasComments && (
            this.props.comments.edges.map(comment => (
              <CommentItem
                key={comment.node.id}
                text={comment.node.text}
                postedBy={comment.node.postedBy}
                userID={this.props.userID}
                responses={comment.node.responses}
                commentID={parseInt(idStrip(comment.node.id))}
              />
            ))
          )
        }
      </Fragment>
    )
  }
}

export default createFragmentContainer(CommentData, {
  comments: graphql`
    fragment CommentData_comments on CommentConnection {
      total,
      edges {
        node {
          id,
          text,
          postedBy {
            username
          }
          responses {
            ...ResponseData_responses
          }
        }
      }
    }
  `
})
