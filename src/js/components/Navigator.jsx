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
      <Navbar className={css(styles.navbarDim, styles.navbarColor)} expand="md">
        <NavbarBrand>
          <Link className={css(styles.mutedLink)} to="/">
            <FontAwesomeIcon icon={faUtensils} /> | What's Cooking
          </Link>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>Explore</NavLink>
          </NavItem>
          <NavItem>
            <Link to="/recipemanager">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className={css(styles.black)}
              />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size="2x"
                className={css(styles.black)}
                onClick={() => this.props.logout()}
              />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/what">
              <FontAwesomeIcon
                icon={faCog}
                size="2x"
                className={css(styles.black)}
              />
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigator;
