import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Login from '../authfx/Login';
import LoginRegisterLogic from './LoginRegisterLogic';

class LoginPage extends Component {
  constructor(){
    super();
    this.state = {
      login: true
    };
  }

  onKeyStroke = e => (
    this.setState({
      [e.target.name]: e.target.value
    })
  )

  activate = () => {
    this.setState({
      login: !this.state.login
    })
  }

  render() {
    return (
      <div className={css(styles.row)}>
        {console.log("this.props: ", this.props)}
        <div className={css(styles.colLeft)}><img className={css(styles.imageResize)}src={process.env.PUBLIC_URL + '/loginPagePhoto.jpg'}/></div>
        <div className={css(styles.colRight)}>
          <div>
            <h2 className={css(styles.grey)}>We are <span className={css(styles.orange)}>WhatsCooking</span></h2>
            {this.state.login ?
              (
                <div>
                  <p>Welcome back! Please log back in.</p>
                  <p>If you do not have an account, register <span className={css(styles.orange)} onClick={() => this.activate()}>here.</span></p>
                </div>
              ) : (
                <div>
                  <p>Hey there! Join us and get cooking!</p>
                  <p>If you have an account, login <span className={css(styles.orange)} onClick={() => this.activate()}>here.</span></p>
                </div>
              )
            }
          </div>
          <LoginRegisterLogic version={this.state.login} auth={this.props.auth} />
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
  },
  colLeft: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    maxHeight: '100vh',
    overflow: 'hidden',
  },
  colRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '40%'
  },
  imageResize: {
    width: '100%',
    // overflow: 'hidden'
  },
  grey: {
    color: 'gray'
  },
  orange: {
    color: 'orange'
  },
  rowSpacer: {
    justifyContent: 'space-between'
  }
})

export default LoginPage;
