import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';
import Login from '../authfx/Login';

const mutation = graphql`
  mutation CreateUserMutation(
    $input: CreateUserInput!
  ){
    createUser(input: $input){
      user {
        username
      }
    }
  }
`;

export default (username, email, password, info, image, callback) => {
  const variables = {
    input: {
      username,
      email,
      password,
      info,
      image,
    }
  }
  console.log("variables: ", variables)
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
        Login(variables.input.username, variables.input.password, callback)
      }
    }
  )
}
