import React, { Component, Fragment } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import ResponseItem from './ResponseItem';

class ResponseData extends Component {
  render() {
    console.log("this.props.responses: ", this.props)
    console.log("this.props.responses: ", this.props.responses)
    const hasResponses = this.props.responses.total > 0;
    return (
      <Fragment>
        <header>Response Information</header>
        {
          hasResponses && (
            this.props.responses.edges.map(response => (
              <ResponseItem
                key={response.node.id}
                text={response.node.text}
                postedBy={response.node.postedBy}
                userID={this.props.userID}
              />
            ))
          )
        }
      </Fragment>
    )
  }
}

export default createFragmentContainer(ResponseData, {
  responses: graphql`
    fragment ResponseData_responses on CommentNodeConnection {
      total,
      edges {
        node {
          id,
          text,
          postedBy {
            username
          }
        }
      }
    }
  `
})
