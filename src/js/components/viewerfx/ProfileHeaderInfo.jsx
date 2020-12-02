import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

const ProfileHeaderInfo = (props) => {
  return(
    <div className={css(styles.headContainer)}>
      <div className={css(styles.headImageContainer)}>
        <div className={css(styles.headImageFrame)}>
          <img className={css(styles.headImage)} src={props.image} alt="" />
        </div>
      </div>
      <div className={css(styles.headerRight)}>
        <div className={css(styles.headProfileInfo)}>
          <h1>{props.username}</h1>
        </div>
        <div className={css(styles.headProfileStats)}>
          <h5 className={css(styles.individualStats, styles.followStats)}>{props.recipes} Recipes</h5>
          <h5 className={css(styles.followStats)}>{props.followers} followers</h5>
          <h5 className={css(styles.followStats)}>{props.following} following</h5>
        </div>
        <div className={css(styles.headInfoContainer)}>
          <p>
            asdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc sdaf er wrqw adsf adsf ewr qwerasdfl;kjasdfjlkajsdf zxc
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  headContainer: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerRight: {
    maxWidth: '50%'
  },
  headImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '50%',
    marginRight: '175px',
  },
  headImageFrame: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '225px',
    minHeight: '225px',
    maxWidth: '225px',
    maxHeight: '225px',
  },
  headImage: {
    width: 'auto',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  headProfileInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: '25px',
  },
  folButton: {
    marginLeft: '35px',
  },
  headProfileStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  individualStats: {
    marginLeft: '0'
  },
  followStats: {
    marginRight: '40px',
  },
  headProfileEachStat: {
    textAlign: 'center'
  },
})

export default ProfileHeaderInfo;
