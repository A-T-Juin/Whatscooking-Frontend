import React, { Component, Fragment } from 'react';
import CreateCollection from './CreateCollection';

class CollectionCreator extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      info: "",
    }
  }

  keyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  resetForm = () => {
    this.setState({
      name: "",
      info: "",
    })
  }

  addCollection = (e) => {
    const collectionData = {
      name: this.state.name,
      info: this.state.info
    };
    CreateCollection(collectionData.name, collectionData.info, this.props.owner, () => {
      console.log("Collection Created")
    });
    e.preventDefault();
    this.resetForm();
  }
  render(){
    return(
      <Fragment>
        <h2>Create Collection Function</h2>
        <form>
          <input
            type="text"
            name="name"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.name}
          />
          <input
            type="text"
            name="info"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.info}
          />
        <button onClick={(e) => this.addCollection(e)}>Post</button>
        </form>
        <h2>End</h2>
      </Fragment>
    )
  }
}

export default CollectionCreator;
