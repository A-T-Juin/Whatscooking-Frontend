import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation CreateCommentMutation(
    $input: CreateCommentInput!
  ){
    createComment(input: $input){
      comment {
        text
      }
    }
  }
`;

export default (text, userID, stepID, callback) => {
  const variables = {
    input: {
      text,
      userID,
      stepID,
    }
  }
  commitMutation (
    environment,
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        if(errors) {
          return console.log("errors: ", errors)
        };
        if(!response) {
          return <div>Loading . . .</div>
        }
        callback();
        console.log("response: ", response)
      }
    }
  )
}
