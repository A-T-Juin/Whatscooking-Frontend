import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { StyleSheet, css } from 'aphrodite';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Navigator from './Navigator';
import LandingPage from './LandingPage';
import SettingsPage from './settingstab/SettingsPage';
import RecipeManager from './viewerfx/RecipeManager';
import VarProfileData from './viewerfx/VarProfileData';
import VarProfileDatum from './viewerfx/VarProfileDatum';
import LoginPage from './viewerfx/LoginPage';
import NoMatch from './viewerfx/NoMatch';


const styles = StyleSheet.create({
  bgc: {
    backgroundColor: "#f1f1f1",
    height: "100%",
    width: "100%"
  }
})

class BasicUserInfo extends Component {
  constructor(props){
    super(props);
  }
  render (){
    return (
      <div className={css(styles.bgc)}>
        <Navigator logout={this.props.logout} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LandingPage {...this.props} />}
          />
          <Route
            path="/settings"
            render={(props) => <SettingsPage {...this.props}/>}
          />
          <Route
            path="/recipemanager"
            render={(props) => <RecipeManager {...this.props}/>}
          />
          <Route
            path="/user/:handle"
            render={
              ({ match }) => <VarProfileDatum match={match} {...this.props} />
            }
          />
          <Route path="/login" component={LoginPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}
// ...UserFollowData_following,


export default createFragmentContainer(BasicUserInfo, {
  userinfo: graphql`
  fragment BasicUserInfo_userinfo on UserNode {
    id,
    username,
    info,
    image,
    totalFollowing,
    totalFollowers,
    totalRecipes,
    collections {
      ...CollectionData_collections
    },
      ...FollowingRecipeData_followingRecipes
    followers {
      ...UserFollowData_followers
    },
    recipes {
      ...UserRecipeData_recipes
    },
  }
  `,
})
