import React, { Component } from 'react';

class EllipsisModal extends Component{
  constructor(){
    super();
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !modal
    })
  }

  render(){
    const Buttons = ["Edit", "Delete"];
    const displayButtons = Buttons.map(button => {
      return (
        <Row>
          <Col sm='12' md={{size: 6, offset: 3}}>{button}</Col>
        </Row>
      )
    })
    return(
      <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
        <ModalHeader toggle={() => this.toggle()}></ModalHeader>
        <ModalBody>
          {displayButtons}
        </ModalBody>
      </Modal>
    )
  }
}

export default EllipsisModal;
