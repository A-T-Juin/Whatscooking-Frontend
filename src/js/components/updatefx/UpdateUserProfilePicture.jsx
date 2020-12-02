import React, { Component, Fragment } from 'react'
import * as AWS from 'aws-sdk';
import Hashes from 'jshashes';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import UpdateProfilePicture from './UpdateProfilePicture';
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

class UpdateUserProfilePicture extends Component {
  constructor(){
    super();
    this.state = {
      upload: null,
      image: ""
    }
  }

  fileGrabber = (e) => {
    this.setState({
      upload: e.target.files[0]
    })
  }

  resetForm = () => {
    this.setState({
      upload: null
    })
  }

  uploadToS3 = (e) => {
    let params = {
      Bucket: S3_BUCKET,
      Body: this.state.upload,
      Key: ProfilePictureKeyMaker(this.props.owner),
      ContentType: 'image/jpeg'
    }
    s3.putObject(params, (err, data) => {
      console.log("this.params: ", params)
      if (err) {
        console.log("error: ", err, err.stack)
      } else {
        console.log("data: ", data)
      };
      this.setState({
        image: "http://" + params.Bucket + ".s3.amazonaws.com/" + params.Key
      });
      UpdateProfilePicture(this.props.owner, this.state.image, () => {
        console.log("upload complete")
      });
    });
    e.preventDefault();
    this.resetForm();
  }
  render(){
    return(
      <Fragment>
        <h2>Update Profile Picture</h2>
        <form>
          <input
            type="file"
            onChange={(e) => this.fileGrabber(e)}
          />
          <button onClick={(e) => this.uploadToS3(e)}>Upload</button>
        </form>
        {this.state.image ? <img src={this.state.image} height="50%" width="50%"/> : null}
        <h2>End</h2>
      </Fragment>
    )
  }
}

export default UpdateUserProfilePicture;
