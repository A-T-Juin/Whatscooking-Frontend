import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation CreateStepMutation(
    $input: CreateStepInput!
  ){
    createStep(input: $input){
      step {
        name
      }
    }
  }
`;

export default (name, image, explanation, id, position, callback) => {
  const variables = {
    input: {
      name,
      image,
      explanation,
      id,
      position,
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
