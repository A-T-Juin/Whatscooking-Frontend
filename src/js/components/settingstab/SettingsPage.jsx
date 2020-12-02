import React, { Component } from 'react';
import UserSettings from './UserSettings';
import { css, StyleSheet } from 'aphrodite';
import {
  Route,
  StaticRouter,
  Switch,
} from 'react-router-dom';
import {
  Row,
  Col
} from 'reactstrap';

const styles = StyleSheet.create({
  colWidth: {
    columnWidth: "auto"
  }
})

const SettingsPage = (props) => {
  return (
    <Row>
      {console.log(props)}
      <Col sm="12" md={{size: 6, offset: 3}}><UserSettings userInfo={props}/></Col>
    </Row>
  )
}

export default SettingsPage;
