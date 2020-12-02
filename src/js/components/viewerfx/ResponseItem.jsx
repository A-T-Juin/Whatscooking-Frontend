import React, { Component, Fragment } from 'react';

class ResponseItem extends Component {
  render() {
    return (
      <Fragment>
        {console.log("this.props: ", this.props)}
        <h2>Posted By: {this.props.postedBy.username}</h2>
        <p>Text: {this.props.text}</p>
      </Fragment>
    )
  }
}

export default ResponseItem;
