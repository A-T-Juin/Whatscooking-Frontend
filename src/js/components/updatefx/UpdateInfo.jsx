import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation UpdateInfoMutation(
    $input: UpdateInfoInput!
  ){
    updateInfo(input: $input){
      user {
        info
      }
    }
  }
`;

export default (id, info, callback) => {
  const variables = {
    input: {
      id,
      info
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
        callback()
        console.log("response: ", response)
      }
    }
  )
}
