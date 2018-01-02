import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";
import { hideNewConversationModal, receiveAddedConversation } from "../redux/actions";
import uuid from "uuid"
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
    const currentUser = {
      ...this.props.currentUser,
      first_name: this.props.currentUser.firstName,
      last_name: this.props.currentUser.lastName
    }
    const users = [
      currentUser,
      ...this.state.selected
    ];
    this.props.newConversation({
      id: uuid.v4(),
      title: null,
      latest_message: null,
      last_viewed: null,
      users,
      messages: null,
      loading: false
    });
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
    dispatch(receiveAddedConversation(title));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NewConversationModal
);
