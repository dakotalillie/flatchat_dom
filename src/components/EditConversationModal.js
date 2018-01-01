import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";
import { hideEditConversationModal, leaveConversation } from "../redux/actions";
import Typeahead from "./Typeahead";

class EditConversationModal extends React.Component {
  state = {
    title: "",
    selected: []
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.conversation && nextProps.conversation.title) {
      this.setState({ title: nextProps.conversation.title });
    }
  };
  handleSelect = selected => {
    this.setState({ selected });
  };
  handleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleDelete = e => {
    if (this.props.conversation) {
      this.props.leaveConversation(this.props.conversation.id, this.props.currentUser.id);
    }
    this.props.hide();
  }
  handleSubmit = e => {
    e.preventDefault();
    const users = [
      this.props.currentUser.id,
      ...this.state.selected.map(i => i.id)
    ];
    // this.props.newConversation(users);
    this.props.hide();
    this.setState({ selected: [] });
  };
  render = () => (
    <Modal show={this.props.isShown} onHide={this.props.hide}>
      <form onSubmit={this.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Conversation Title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Conversation Members</ControlLabel>
            <FormControl.Static>
              {this.props.conversation
                ? this.props.conversation.users
                    .map(u => `${u.first_name} ${u.last_name}`)
                    .join(", ")
                : null}
            </FormControl.Static>
          </FormGroup>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Add people to this conversation:</ControlLabel>
            <Typeahead
              handleSelect={this.handleSelect}
              selected={this.state.selected}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.handleDelete}>
            Leave Conversation
          </Button>
          <Button bsStyle="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function mapStateToProps(state) {
  let conversation;
  if (state.showEditConversationModal.isShown) {
    conversation = state.conversations.find(
      c => c.id === state.showEditConversationModal.conversationId
    );
  }
  return {
    isShown: state.showEditConversationModal.isShown,
    conversation,
    currentUser: state.currentUser
  };
}

const mapDispatchToProps = dispatch => ({
  hide: () => {
    dispatch(hideEditConversationModal());
  },
  leaveConversation: (conversationId, userId) => {
    dispatch(leaveConversation(conversationId, userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EditConversationModal
);
