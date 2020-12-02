import React, { Component, Fragment } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import StepItem from './StepItem';
import {idStrip} from '../helperfx/GrapheneIDStripper';

class StepData extends Component {
  constructor(props){
    super(props);
    this.state = {
      stepData: this.props.steps,
    }
  }

  render() {
    console.log("this.props: ", this.props)
    console.log("this.state.stepData: ", this.state.stepData.edges[this.props.step])
    const stepsExist = this.state.stepData.total > 0
    console.log("stepExist: ", stepsExist)
    const hasSteps = this.props.steps.total > 0;

    return (
      <Fragment>
        {
          hasSteps && (
            <StepItem
              id={idStrip(this.state.stepData.edges[this.props.step].node.id)}
              key={this.state.stepData.edges[this.props.step].node.id}
              name={this.state.stepData.edges[this.props.step].node.name}
              image={this.state.stepData.edges[this.props.step].node.image}
              explanation={this.state.stepData.edges[this.props.step].node.explanation}
              position={this.state.stepData.edges[this.props.step].node.position}
              userID={this.state.stepData.edges[this.props.step].node.userID}
              comments={this.state.stepData.edges[this.props.step].node.comments}
            />
          )
        }
      </Fragment>
    )
  }
}

export default createFragmentContainer(StepData, {
  steps: graphql`
    fragment StepData_steps on StepConnection {
      total,
      edges {
        node {
          id,
          name,
          image,
          explanation,
          position,
          comments {
            ...CommentData_comments
          }
        }
      }
    }
  `
})

// {
//   hasSteps && (
//     this.props.steps.edges.map(step => (
//       <StepItem
//         id={idStrip(step.node.id)}
//         key={step.node.id}
//         name={step.node.name}
//         image={step.node.image}
//         explanation={step.node.explanation}
//         position={step.node.position}
//         userID={this.props.userID}
//         comments={step.node.comments}
//       />
//     ))
//   )
// }
//
// <StepItem
//   id={idStrip(this.state.stepData.edges[this.props.step].node.id)}
//   name={this.state.stepData.edges[this.props.step].node.name}
//   image={this.state.stepData.edges[this.props.step].node.image}
//   explanation={this.state.stepData.edges[this.props.step].node.explanation}
//   position={this.state.stepData.edges[this.props.step].node.position}
//   userID={this.props.userID}
//   comments={this.state.stepData.edges[this.props.step].node.comments}
// />
