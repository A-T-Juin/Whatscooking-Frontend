import React, { Component, Fragment } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';
import BasicUserInfo from './BasicUserInfo';
import LoginPage from './viewerfx/LoginPage';

const userQuery = graphql`
  query UserdashQuery (
    $token: String!
  ){
    userinfo: viewer (token: $token) {
      ...BasicUserInfo_userinfo
    }
  }
`

class Userdash extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log("sessionStorage: ", sessionStorage.Authorization)
    return (
      <QueryRenderer
        environment={environment}
        query={userQuery}
        variables={{
          token: sessionStorage.Authorization
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          }
          if (!props) {
            return <div>Loading . . .</div>;
          }
          if (props) {
            return (
              <div>
                <BasicUserInfo logout={this.props.logout} userinfo={props.userinfo}/>
              </div>
            )
          }
        }}
      />
    )
  }
}

export default Userdash;
