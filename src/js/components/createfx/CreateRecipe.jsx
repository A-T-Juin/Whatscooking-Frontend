import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation CreateRecipeMutation(
    $input: CreateRecipeInput!
  ){
    createRecipe(input: $input){
      recipe {
        name
      }
    }
  }
`;

export default (name, image, tags, description, difficulty, ingredients, time, servings, owner, callback) => {
  const variables = {
    input: {
      name,
      image,
      tags,
      description,
      difficulty,
      ingredients,
      time,
      servings,
      owner
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
