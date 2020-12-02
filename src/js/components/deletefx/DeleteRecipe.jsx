import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation DeleteRecipeMutation(
    $input: DeleteRecipeInput!
  ){
    deleteRecipe(input: $input){
      recipe
    }
  }
`;

export default (recipeID, callback) => {
  const variables = {
    input: {
      recipeID
    }
  }
  console.log(variables);
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
