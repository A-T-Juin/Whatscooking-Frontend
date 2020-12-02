import React, { Component, Fragment } from 'react';
import * as AWS from 'aws-sdk';
import Hashes from 'jshashes';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import CreateUser from './CreateUser';
const MD5 = new Hashes.MD5

const credentials = {
  "accessKeyId": AWS_ACCESS_KEY_ID,
  "secretAccessKey": AWS_SECRET_ACCESS_KEY
}

let s3 = new AWS.S3({apiVersion: '2006-03-01', region:'us-west-1', credentials});

const ProfilePictureKeyMaker = (name) => {
  let key = name + "ProfilePicture" + ".jpg";
  return MD5.hex(key)
}

class UserCreator extends Component {
  constructor(){
    super();
    this.state = {
      upload: null,
      name: "",
      email: "",
      password: "",
      info: "",
      image: "",
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
      email: "",
      password: "",
      info: "",
      image: "",
    })
  }

  uploadToS3 = (e) => {
    let params = {
      Bucket: S3_BUCKET,
      Body: this.state.upload,
      Key: ProfilePictureKeyMaker(this.state.name),
      ContentType: 'image/jpeg'
    };
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      info: this.state.info,
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
      CreateUser(userData.name, userData.email, userData.password, userData.info, this.state.image, () => {
        console.log("upload complete")
      });
    });
    e.preventDefault();
    this.resetForm();
  }
  render(){
    return(
      <Fragment>
        <h2>Create User Function</h2>
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
            name="email"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.email}
          />
          <input
            type="password"
            name="password"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.password}
          />
          <input
            type="text"
            name="info"
            onChange={(e) => this.keyStroke(e)}
            value={this.state.info}
          />
          <button onClick={(e) => this.uploadToS3(e)}>Upload</button>
        </form>
        {this.state.image ? <img src={this.state.image} height="50%" width="50%" alt="User Portrait"/> : null}
      <h2>End</h2>
      </Fragment>
    )
  }
}

export default UserCreator;
