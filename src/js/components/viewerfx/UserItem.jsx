import React, { Component, Fragment } from 'react';

class UserItem extends Component {
  render() {
    return (
      <Fragment>
        <h2>User: {this.props.username}</h2>
      </Fragment>
    )
  }
}

export default UserItem;
