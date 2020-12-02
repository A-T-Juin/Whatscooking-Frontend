import React, { Component, Fragment } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import UserItem from './UserItem';

class UserFollowData extends Component {
  render() {
    const hasFollowers = this.props.followers.total > 0;
    const isFollowing = this.props.following.total > 0;
    return (
      <Fragment>
        <header>Follow information</header>
        {
          hasFollowers && (
            this.props.followers.edges.map(user => (
              <UserItem key={user.node.id} username={user.node.username} />
            ))
          )
        }
        {
          isFollowing && (
            this.props.following.edges.map(user => (
              <UserItem key={user.node.id} username={user.node.username} />
            ))
          )
        }
      </Fragment>
    )
  }
}

export default createFragmentContainer(UserFollowData, {
  following: graphql`
    fragment UserFollowData_following on UserNodeConnection {
      total,
      edges {
        node {
          id,
          username
        }
      }
    }
  `,
  followers: graphql`
    fragment UserFollowData_followers on UserNodeConnection {
      total,
      edges {
        node {
          id,
          username
        }
      }
    }
  `
})
