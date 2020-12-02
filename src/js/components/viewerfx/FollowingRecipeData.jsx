import React, { Component } from 'react';
import FollowingRecipeItem from './FollowingRecipeItem';
import { recipeExtractor } from '../helperfx/RecipeArrayFormer';
import { idStrip } from '../helperfx/GrapheneIDStripper';
import { createPaginationContainer, createFragmentContainer, createRefetchContainer, graphql } from 'react-relay';
import { css, StyleSheet } from 'aphrodite';

class FollowingRecipeData extends Component {


  render() {
    const { totalFollowing: total } = this.props
    const {
      edges
    } = this.props.followingRecipes.following;
    const isFollowingUsers = total > 0;
    let userRecipes;
    if (isFollowingUsers) {
      userRecipes = recipeExtractor(edges);
    }
    return (
      <div className={css(styles.Center)}>
        {console.log("this.props: ", this.props)}
        {isFollowingUsers ? (
          userRecipes.map((recipe) => (
            <div>
              <FollowingRecipeItem
                id={recipe.node.id}
                key={recipe.node.id}
                name={recipe.node.name}
                image={recipe.node.image}
                tags={recipe.node.tags}
                description={recipe.node.description}
                createdDate={recipe.node.createdDate}
                createdBy={recipe.node.createdBy}
                likes={recipe.node.likes}
              />
            </div>
          ))
        ) : (
          <div>User is not following anybody</div>
        )}
        <button onClick={this._loadMore}>Load More</button>
      </div>
    )
  }
  // TODO: Implement infinite scroll
  // _loadMore(props) {
  //   console.log("load more props: ", props)
  //   const refetchVariables = fragmentVariables => ({
  //     count: fragmentVariables.count + 3,
  //   });
  //   console.log("refetchVariables: ", refetchVariables)
  //   this.props.relay.refetch(refetchVariables);
  // }
}

// export default createPaginationContainer(FollowingRecipeData, {
//     followingRecipes: graphql`
//       fragment FollowingRecipeData_followingRecipes on UserNode
//       @argumentDefinitions(
//         count: {type: "Int", defaultValue: 3}
//         cursor: {type: "String"}
//       ){
//         following(
//           first: $count
//           after: $cursor
//         ) @connection(key: "FollowingRecipeData_following"){
//           total,
//           edges {
//             node {
//               id,
//               username,
//               recipes (
//                 first: 1
//               ){
//                 total
//                 edges {
//                   node {
//                     id
//                     name
//                     image
//                     tags
//                     description
//                     difficulty
//                     servings
//                     time
//                     ingredients
//                     createdDate
//                     comments
//                     likes
//                     createdBy {
//                       id
//                       username
//                       image
//                       recipes {
//                         total
//                         edges {
//                           node {
//                             id
//                             name
//                             image
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//   },
//   {
//     direction: 'forward',
//     getConnectionFromProps(props){
//       return props.user && props.user.followingRecipes;
//     },
//     getFragmentVariables(prevVars, totalCount){
//       return {
//         count,
//         cursor,
//         orderBy: fragmentVariables.orderBy,
//         userID: fragmentVariables.userID,
//       };
//     },
//     query: graphql`
//       query FollowingRecipeDataQuery(
//         $count: Int!
//         $cursor: ID
//         $userID: ID!
//       ){
//         user(id: $userID){
//           ...FollowingRecipeData @arguments(count: $count, cursor: $cursor)
//         }
//       }
//     `
//   }
// )
// const FollowingRecipeData = (props) => {
//   const { totalFollowing: total } = props
//   const {
//     edges
//   } = props.followingRecipes.following;
//   const isFollowingUsers = total > 0;
//   let userRecipes;
//   if (isFollowingUsers) {
//     userRecipes = recipeExtractor(edges);
//   }
//   return (
//     <div className={css(styles.Center)}>
//       {isFollowingUsers ? (
//         userRecipes.map((recipe) => (
//           <div>
//             <FollowingRecipeItem
//               id={recipe.node.id}
//               key={recipe.node.id}
//               name={recipe.node.name}
//               image={recipe.node.image}
//               tags={recipe.node.tags}
//               description={recipe.node.description}
//               createdDate={recipe.node.createdDate}
//               createdBy={recipe.node.createdBy}
//               likes={recipe.node.likes}
//             />
//           </div>
//         ))
//       ) : (
//         <div>User is not following anybody</div>
//       )}
//     </div>
//   )
// }
//
const styles = StyleSheet.create({
  Center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default createFragmentContainer(FollowingRecipeData, {
  followingRecipes: graphql`
    fragment FollowingRecipeData_followingRecipes on UserNode {
      following(
        first: 5
      ) @connection(key: "FollowingRecipeData_following"){
        total,
        edges {
          node {
            id,
            username,
            recipes (
              first: 1
            ){
              total
              edges {
                node {
                  id
                  name
                  image
                  tags
                  description
                  difficulty
                  servings
                  time
                  ingredients
                  createdDate
                  comments
                  likes
                  createdBy {
                    id
                    username
                    image
                    recipes {
                      total
                      edges {
                        node {
                          id
                          name
                          image
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
})

// export default createRefetchContainer(
//   FollowingRecipeData,
//   {
//         followingRecipes: graphql`
//           fragment FollowingRecipeData_followingRecipes on UserNode
//           @argumentDefinitions(
//             count: {type: "Int", defaultValue: 3}
//           ){
//             following(
//               first: $count
//             ){
//               total,
//               edges {
//                 node {
//                   id,
//                   username,
//                   recipes (
//                     first: 1
//                   ){
//                     total
//                     edges {
//                       node {
//                         id
//                         name
//                         image
//                         tags
//                         description
//                         difficulty
//                         servings
//                         time
//                         ingredients
//                         createdDate
//                         comments
//                         likes
//                         createdBy {
//                           id
//                           username
//                           image
//                           recipes {
//                             total
//                             edges {
//                               node {
//                                 id
//                                 name
//                                 image
//                               }
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         `
//   },
//   graphql`
//     query FollowingRecipeDataRefetchQuery($count: Int){
//       user{
//         ...FollowingRecipeData_followingRecipes @arguments(count: $count)
//       }
//     }
//   `,
// )
