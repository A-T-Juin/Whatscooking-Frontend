import React, { Component, Fragment } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Login from '../authfx/Login';
import CreateUser from '../createfx/CreateUser';

class LoginRegisterLogic extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
  };

  fast = async(e) => {
    e.persist();
    console.log("calling...")
    try {
      this.resetForm();
      let result = await Login('WhatsCookingHQ', 'Ven1Vid!V0ro');
      this.props.auth()
    }
    catch (error) {
      console.log("error: ", error)
    }
    e.preventDefault();
  }

  onLogin = async (e) => {
    e.persist();
    console.log("calling...")
    try {
      const credentials = {
        username: this.state.username,
        password: this.state.password
      };
      this.resetForm();
      let result = await Login(credentials.username, credentials.password)
      this.props.auth()
    }
    catch (error) {
      console.log("error: ", error)
    }
    e.preventDefault();
  }

  onRegister = (e) => {
    const credentials = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    CreateUser(credentials.username, credentials.email, credentials.password, "", "", (response) => {
      console.log("response: ", response)
    });
    this.resetForm();
    e.preventDefault();

  }

  onKeyStroke = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resetForm = () => {
    this.setState({
      username: "",
      password: "",
      email: ""
    });
  }

  render() {
    return(
      <Fragment>
        {
          this.props.version ?
          (
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Marco Pierre White"
                  onChange={(e) => this.onKeyStroke(e)}
                  value={this.state.username}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.onKeyStroke(e)}
                />
              </FormGroup>
              <div>
                <Button color="primary" onClick={(e) => this.fast(e)}>Fast Login</Button>
                <Button color="primary" onClick={(e) => this.onLogin(e)}>Login</Button>
              </div>
            </Form>
          ) : (
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Marco Pierre White"
                  onChange={(e) => this.onKeyStroke(e)}
                  value={this.state.username}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => this.onKeyStroke(e)}
                  placeholder="MarcoPierre@gmail.com"
                  value={this.state.email}
                />
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => this.onKeyStroke(e)}
                  value={this.state.password}
                />
              </FormGroup>
              </FormGroup>
              <div>
                <Button color="secondary" onClick={(e) => this.onRegister(e)}>Register</Button>
              </div>
            </Form>
          )
        }
      </Fragment>
    )
  }
}

export default LoginRegisterLogic;
