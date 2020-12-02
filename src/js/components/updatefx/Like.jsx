import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../../Environment';

const mutation = graphql`
  mutation LikeMutation(
    $input: LikeInput!
  ){
    like(input: $input){
      step {
        likes {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

const sharedUpdater = (store, stepID, newEdge) => {
  const stepProxy = store.get(stepID);
  const conn = ConnectionHandler.getConnection(
    stepProxy,
    "VarUserRecipes_likes"
  );
  console.log('conn: ', conn);
  console.log('connhandler.insertedge: ', ConnectionHandler.insertEdgeAfter(conn, newEdge))
}

export default (user, step, gqlStepID, callback) => {
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
          updater: (store) => {
            const payload = store.getRootField('like');
            console.log('payload: ', payload);
            const newEdge = payload.getLinkedRecord('step');
            console.log('newEdge: ', newEdge);
            sharedUpdater(store, gqlStepID, newEdge);
          }
        })
    })
}
