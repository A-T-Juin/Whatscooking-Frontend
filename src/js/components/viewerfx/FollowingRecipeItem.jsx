import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensilSpoon, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';

class FollowingRecipeItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ellipsisModal: false,
        viewerModal: false,
        step: 0
      };
    };

    activateEllipsis = () => {
      this.setState({
        ellipsisModal: !this.state.ellipsisModal
      });
    };

    activateViewer = () => {
      this.setState({
        viewerModal: !this.state.viewerModal
      });
    };

    render() {
      const Buttons = ["Add To Collection"];
      // We can add buttons to the ellipsis modal here
      const displayButtons = Buttons.map(button => {
        return (
          <Row key={button}>
            <Col className={css(styles.alignCenter)}>
              <Button outline color="secondary" className={css(styles.fluid)}>{button}</Button>
            </Col>
          </Row>
        )
      });
      return (
        <Card className={css(styles.cardResizer, styles.cardShadow)}>
          <CardHeader>
            <div className={css(styles.headerUserContainer)}>
              <div className={css(styles.headerImageFrame)}>
                <img
                  className={css(styles.headerImage)}
                  src={this.props.createdBy.image}
                />
              </div>
              <Link
                className={css(styles.muted)}
                to={`/user/${this.props.createdBy.id}`}
              >
                {this.props.createdBy.username}
              </Link>
            </div>
            <FontAwesomeIcon
              icon={faEllipsisH}
              onClick={() => this.activateEllipsis()}
              className={css(styles.ellipsisPlacer)}
            />
            <Modal isOpen={this.state.ellipsisModal} toggle={() => this.activateEllipsis()} size="lg">
              <ModalHeader>Options</ModalHeader>
              <ModalBody>
                {displayButtons}
              </ModalBody>
            </Modal>
          </CardHeader>
          <div>
            <CardImg
              className={css(styles.hover)}
              src={this.props.image}
              alt="Recipe Cover Photo"
              onClick={() => this.activateViewer()}
            />
          <Modal size="lg"isOpen={this.state.viewerModal} toggle={() => this.activateViewer()}>
              <CardHeader className={css(styles.cardColor)}>
                <Row>
                  <Col xs="6">
                    <h5>{this.props.name}</h5>
                  </Col>
                  <Col className={css(styles.alignRight)} xs="6">
                    {this.props.likes + " "}
                    <FontAwesomeIcon icon={faUtensilSpoon} />
                  </Col>
                </Row>
              </CardHeader>
            </Modal>
          </div>
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>
              {this.props.likes + " "}
              <FontAwesomeIcon icon={faUtensilSpoon} />
            </CardSubtitle>
            <CardBody>
              <p>{this.props.description}</p>
            </CardBody>
          </CardBody>
        </Card>
      )
    }
}

const styles = StyleSheet.create({
  cardResizer: {
    width: '750px',
    marginTop: '75px',
    marginBottom: '75px',
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right',
  },
  cardColor: {
    backgroundColor: "#fff"
  },
  fluid: {
    width: "100%"
  },
  hover: {
    ':hover': {
      opacity: '.60',
      zIndex: -2
    }
  },
  headerUserContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  headerImageFrame: {
    minWidth: '42px',
    minHeight: '42px',
    maxWidth: '42px',
    maxHeight: '42px',
    marginRight: '1em',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  ellipsisPlacer: {
    position: 'absolute',
    right: '1em',
    top: '2em',
  },
  cardShadow: {
    border: "1px solid",
    padding: "10 px",
    boxShadow: "5px 10px #e2e3e7"
  },
  muted: {
    marginTop: '.70em',
    textDecoration: 'none',
    color: 'black',
  },
})

export default FollowingRecipeItem;
