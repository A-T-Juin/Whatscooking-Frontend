import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import RecipeItem from './RecipeItem';
import {idStrip} from '../helperfx/GrapheneIDStripper';
import {
  Col,
  Row,
} from 'reactstrap';

class ExploreRecipes extends Component {
  render() {
    console.log("this.props.recipes: ", this.props)
    console.log("this.props.recipes: ", this.props.recipes)
    const hasRecipes = this.props.recipes.total > 0;
    return (
      <Fragment>
        <header>Recipe Information</header>
        {
          hasRecipes && (
            <Row>
              {this.props.recipes.edges.map(recipe => (
                <RecipeItem
                  id={idStrip(recipe.node.id)}
                  key={recipe.node.id}
                  name={recipe.node.name}
                  image={recipe.node.image}
                  tags={recipe.node.tags}
                  description={recipe.node.description}
                  createdDate={recipe.node.createdDate}
                  likes={recipe.node.likes}
                  userID={this.props.userID}
                  steps={recipe.node.steps}
                />
              ))}
            </Row>
          )
        }
      </Fragment>
    )
  }
}

// export default createFragmentContainer(ExploreRecipes, {
//   recipes: graphql`
//     fragment UserRecipeData_recipes on RecipeConnection {
//       total,
//       edges {
//         node {
//           id,
//           name,
//           image,
//           tags,
//           description,
//           createdDate,
//           likes,
//           steps {
//             ...StepData_steps
//           }
//         }
//       }
//     }
//   `
// })
