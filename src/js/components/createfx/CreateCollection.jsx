import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation CreateCollectionMutation(
    $input: CreateCollectionInput!
  ){
    createCollection(input: $input){
      collection {
        name
      }
    }
  }
`;

export default (name, info, owner, callback) => {
  const variables = {
    input: {
      name,
      info,
      owner,
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
