import React, { Component, Fragment } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import CollectionItem from './CollectionItem';
import CollectionCreator from '../createfx/CollectionCreator';
import {idStrip} from '../helperfx/GrapheneIDStripper';

class CollectionData extends Component {
  render() {
    const hasCollections = this.props.collections.total > 0;
    return (
      <Fragment>
        <header>Collection Information</header>
        {
          hasCollections && (
            this.props.collections.edges.map(collection => (
              <CollectionItem
                id={parseInt(idStrip(collection.node.id))}
                key={collection.node.id}
                name={collection.node.name}
                info={collection.node.info}
                recipes={collection.node.recipes}
              />
            ))
          )
        }
        <CollectionCreator />
      </Fragment>
    )
  }
}

export default createFragmentContainer(CollectionData, {
  collections: graphql`
  fragment CollectionData_collections on CollectionConnection {
    total,
    edges {
      node {
        id,
        name,
        info,
        recipes {
          total
          edges {
            node {
              id,
              name,
              image
            }
          }
        }
      }
    }
  }
  `
})
