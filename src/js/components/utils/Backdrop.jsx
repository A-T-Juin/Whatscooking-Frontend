import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const Backdrop = (props) => {
  return (
    props.active ? <div className={css(styles.backdrop)} onClick={() => props.toggler(null)}/> : null
  )
}

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '5',
  },
})

export default Backdrop;
