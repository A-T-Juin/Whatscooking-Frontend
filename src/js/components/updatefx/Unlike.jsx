import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '../../Environment';

const mutation = graphql`
  mutation UnlikeMutation(
    $input: UnLikeInput!
  ){
    unLike(input: $input){
      step {
        totalLikes
      }
    }
  }
`;

const config = [{
  type: 'NODE_DELETE',
  deletedIDFieldName: 'likes'
}]


export default (user, step, callback) => {
  return new Promise ((resolve, reject) => {
    const variables = {
      input: {
        user,
        step,
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
              console.log("response: ", response)
              resolve("liked??????")
            }
          },
          onError: (error) => console.log("error: ", error),
          configs: config
        })
    })
}
