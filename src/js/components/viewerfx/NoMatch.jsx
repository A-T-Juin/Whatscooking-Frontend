import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
  },
  colLeft: {
    display: 'flex',
    direction: 'column',
    width: '60%'
  },
  colRight: {
    display: 'flex',
    direction: 'column',
    width: '40%'
  },
  imageResize: {
    width: '100%'
  },
  textStyling: {
    textAlign: 'center',
  }
})

const NoMatch = () => {
  return (
    <div className={css(styles.row)}>
      <div className={css(styles.colLeft)}><img className={css(styles.imageResize)}src={process.env.PUBLIC_URL + '/404image.jpeg'}/></div>
      <div className={css(styles.colRight)}>
        <h4 className={css(styles.textStyling)}>Sorry, there doesn't seem to be any thing on this page!</h4>
      </div>
    </div>
  )
}

export default NoMatch;
