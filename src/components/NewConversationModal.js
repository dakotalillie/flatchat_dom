import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";
import { hideNewConversationModal, addConversation } from "../redux/actions";
import Typeahead from "./Typeahead";

class NewConversationModal extends React.Component {
  state = {
    selected: []
  };
  handleSelect = selected => {
    this.setState({ selected });
  };
  handleSubmit = e => {
    e.preventDefault();
    const users = [
      this.props.currentUser.id,
      ...this.state.selected.map(i => i.id)
    ]
    this.props.newConversation(users);
    this.props.hide();
    this.setState({ selected: [] });
  };
  render = () => (
    <Modal show={this.props.isShown} onHide={this.props.hide}>
      <form onSubmit={this.handleSubmit}>
        <Modal.Body>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Who would you like to chat with?</ControlLabel>
            <Typeahead
              handleSelect={this.handleSelect}
              selected={this.state.selected}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hide}>Close</Button>
          <Button bsStyle="success" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    isShown: state.showNewConversationModal,
    currentUser: state.currentUser
  };
}

const mapDispatchToProps = dispatch => ({
  hide: () => {
    dispatch(hideNewConversationModal());
  },
  newConversation: title => {
    dispatch(addConversation(title));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NewConversationModal
);
