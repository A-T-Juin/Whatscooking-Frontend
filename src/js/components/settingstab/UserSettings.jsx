import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import { css, StyleSheet } from 'aphrodite';
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from '../../../Admin';
import { idStrip } from '../helperfx/GrapheneIDStripper';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';
import UpdateInfo from '../updatefx/UpdateInfo';

const credentials = {
  "accessKeyId": AWS_ACCESS_KEY_ID,
  "secretAccessKey": AWS_SECRET_ACCESS_KEY
}

const s3 = new AWS.S3({apiVersion: '2006-03-01', region:'us-west-1', credentials});


const styles = StyleSheet.create({
  imageSize: {
    width: "250px"
  },
  center: {
    textAlign: "center"
  },
})

class UserSettings extends Component {
  constructor(props){
    super(props);
    const {
      info,
    } = props.userInfo.userinfo;
    this.state = {
      info,
      upload: null,
    }
  }

  handleKeyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  imagePost = () => {
    const {
      image
    } = this.props.userInfo.userinfo
    const params = {
      Bucket: S3_BUCKET,
      Body: this.state.upload,
      Key: image,
      ContentType: 'image/jpeg'
    };
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log("error: ", err, err.stack)
      } else {
        console.log("data: ", data)
      };
    });
  }

  onSubmit = (e) => {
    this.state.upload ? (
      this.imagePost()
    ) : (
      console.log("No Image to Put")
    );
    const updatedInfo = {
      id: 1,
      info: this.state.info
    };
    UpdateInfo(updatedInfo.id, updatedInfo.info, () => {
      this.setState({
        info: updatedInfo.info
      })
    });
    e.preventDefault();
  }

  render(){
    const {
      id,
      image
    } = this.props.userInfo.userinfo
    return(
      <Form>
        <FormGroup className={css(styles.center)}>
          <img className={css(styles.imageSize)} src={image} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">Profile Picture</Label>
          <Input type="file" name="file" id="exampleFile" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">About Me!</Label>
          <Input
            type="textarea"
            name="info"
            onChange={(e) => this.handleKeyStroke(e)}
            value={this.state.info}
          />
        </FormGroup>
        <Button onClick={(e) => this.onSubmit(e)}>Submit</Button>
      </Form>
    )
  }
}

export default UserSettings;
