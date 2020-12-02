import React, { Component } from 'react';
import Backdrop from './Backdrop';
import { css, StyleSheet } from 'aphrodite';

const Modal = props => {
  return (
    <div className={css(props.active ? styles.modalActive : styles.modalHidden)}>
      {props.children}
    </div>
  )
}

const styles = StyleSheet.create({
  modalActive: {
    position: 'fixed',
    backgroundColor: 'white',
    width: '75%',
    height: '80%',
    border: '1px solid #ccc',
    boxShadow: '1px 1px 1px black',
    boxSizing: 'border-box',
    overflowY: 'auto',
    transitions: 'all 0.3s ease-out',
    transform: 'translateY(0)',
    opacity: '1',
    left: '12.5%',
    top: '10%',
    zIndex: '10',
    // '@media (min-width: 600px)': {
    //   width: '80%',
    //   left: 'calc(25% - 250px)'
    // },
  },
  modalHidden: {
    opacity: '0'
  }
})

export default Modal;
