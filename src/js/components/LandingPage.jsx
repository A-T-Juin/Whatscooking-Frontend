import React, { Component } from 'react';
import FollowingRecipeData from './viewerfx/FollowingRecipeData';

const LandingPage = (props) => {
  const {
    id,
    totalFollowing,
  } = props.userinfo
  return (
    <div>
      <FollowingRecipeData
        followingRecipes={props.userinfo}
        id={id}
        totalFollowing={totalFollowing}
      />
    </div>
  )
}

export default LandingPage;
