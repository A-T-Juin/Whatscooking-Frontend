import React, { Component, Fragment } from 'react';
import CreateResponse from './CreateResponse';

class ResponseCreator extends Component {
  constructor(){
    super();
    this.state = {
      response: "",
    }
  }

  keyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  resetForm = () => {
    this.setState({
      response: "",
    })
  }

  postResponse = (e) => {
    const responseData = {
      response: this.state.response
    };
    CreateResponse(responseData.response, this.props.userID, this.props.commentID, () => {
      console.log("Response Created")
    });
    e.preventDefault();
    this.resetForm();
  }
  render(){
    console.log("this.props: ", this.props)
    return(
      <Fragment>
        <h2>Create Response Function</h2>
        <form>
          <input
            type = "text"
            name = "response"
            onChange = {(e) => this.keyStroke(e)}
            value = {this.state.response}
          />
        <button onClick={(e) => this.postResponse(e)}>Post</button>
        </form>
        <h2>End</h2>
      </Fragment>
    )
  }
}

export default ResponseCreator;
