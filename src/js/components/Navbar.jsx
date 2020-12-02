import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import {
  faCog,
  faUtensils,
  faSignOutAlt,
 } from '@fortawesome/free-solid-svg-icons';
 import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';

const styles = StyleSheet.create({
  black: {
    color: 'black'
  },
  mutedLink: {
    color: 'black',
    textDecoration: "none"
  },
  navbarDim: {
    height: '77px',
  },
  navbarColor: {
    backgroundColor: 'white'
  }
});

class Navigator extends Component {
  render() {
    return (
      <div className={css(styles.navBarContainer)}>
        <div className={css(styles.navBarLeft)}>
          <Link className={css(styles.mutedLink)} to="/">
            <FontAwesomeIcon icon={faUtensils} /> | What's Cooking
          </Link>
        </div>
        <div className={css(styles.navBarRight)}>
          <div>
            <Link to="/recipemanager">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className={css(styles.black)}
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size="2x"
                className={css(styles.black)}
                onClick={() => this.props.logout()}
              />
            </Link>
          </div>
          <div>
            <Link to="/what">
              <FontAwesomeIcon
                icon={faCog}
                size="2x"
                className={css(styles.black)}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigator;
