import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation UpdateProfilePictureMutation(
    $input: UpdateProfilePictureInput!
  ){
    updateProfilePicture(input: $input){
      user {
        image
      }
    }
  }
`;

export default (username, image, callback) => {
  const variables = {
    input: {
      username,
      image
    }
  }
  commitMutation (
    s3environment,
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
