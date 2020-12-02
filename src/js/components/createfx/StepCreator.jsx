import React, { Component, Fragment } from 'react';
import * as AWS from 'aws-sdk';
import Hashes from 'jshashes';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import CreateStep from './CreateStep';
const MD5 = new Hashes.MD5

const credentials = {
  "accessKeyId": AWS_ACCESS_KEY_ID,
  "secretAccessKey": AWS_SECRET_ACCESS_KEY
}

let s3 = new AWS.S3({apiVersion: '2006-03-01', region:'us-west-1', credentials});

const StepKeyMaker = (recipe, step) => {
  let key = recipe + "Recipe" + step + "Step.jpg";
  return MD5.hex(key)
}

class StepCreator extends Component {
  constructor(){
    super();
    this.state = {
      upload: null,
      name: "",
      image: "",
      explanation: "",
      position: 0,
    }
  }

  fileGrabber = (e) => {
    this.setState({
      upload: e.target.files[0]
    })
  }

  keyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  resetForm = () => {
    this.setState({
      upload: null,
      name: "",
      image: "",
      explanation: "",
      position: "",
    })
  }

  uploadToS3 = (e) => {
    let params = {
      Bucket: S3_BUCKET,
      Body: this.state.upload,
      Key: StepKeyMaker(this.props.recipeID, this.state.name),
      ContentType: 'image/jpeg'
    };
    const stepData = {
      name: this.state.name,
      explanation: this.state.explanation,
      position: this.state.position,
    };
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log("error: ", err, err.stack)
      } else {
        console.log("data: ", data)
      };
      this.setState({
        image: "http://" + params.Bucket + ".s3.amazonaws.com/" + params.Key
      });
      CreateStep(stepData.name, this.state.image, stepData.explanation, this.props.recipeID, stepData.position, () => {
        console.log("upload complete")
      });
    });
    e.preventDefault();
    this.resetForm();
  }
  render(){
    return(
      <Fragment>
        <h2>Create Step Function</h2>
        <form>
          <input
            type="file"
            onChange={(e) => this.fileGrabber(e)}
          />
          <input
            type="text"
            name="name"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.name}
          />
          <input
            type="text"
            name="explanation"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.explanation}
          />
          <input
            type="number"
            name="position"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.position}
          />
          <button onClick={(e) => this.uploadToS3(e)}>Upload</button>
        </form>
        {this.state.image ? <img src={this.state.image} height="50%" width="50%" alt="Step Portrait"/> : null}
      <h2>End</h2>
      </Fragment>
    )
  }
}

export default StepCreator;
