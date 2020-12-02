import React, { Component, Fragment } from 'react';
import CommentCreator from '../createfx/CommentCreator';
import CommentData from './CommentData'

class CollectionItem extends Component {
  render() {
    return (
      <Fragment>
        <h2>Collection Name: {this.props.name}</h2>
        <p>Info: {this.props.info}</p>
      </Fragment>
    )
  }
}

export default CollectionItem;
