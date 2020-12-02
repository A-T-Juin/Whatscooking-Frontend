import React from 'react';
import {
  commitMutation,
  graphql,
} from 'react-relay';
import environment from '../../Environment';
import Userdash from '../Userdash';

const mutation = graphql`
  mutation LoginMutation(
    $input: ObtainJSONWebTokenInput!
  ){
    tokenAuth(input: $input){
      token
    }
  }
`;

export default (username, password, callback) => {
  return new Promise ((resolve, reject) => {
    const variables = {
      input: {
        username,
        password,
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
              return errors
            } else if(!response) {
              return <div>Loading . . .</div>
            } else {
              sessionStorage.setItem('Authorization', response.tokenAuth.token)
              // callback(response.tokenAuth.token);
              resolve(response.tokenAuth.token)
            }
          },
          onError: (error) => console.log("error: ", error)
        })
    })
}
