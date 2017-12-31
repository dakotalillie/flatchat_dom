import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { hideNewConversationModal, addConversation } from "../redux/actions";

class NewConversationModal extends React.Component {
  state = {
    value: ""
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.newConversation(this.state.value);
    this.props.hide();
    this.setState({ value: "" });
  };
  setInput = ref => {
    if (ref) {
      this.input = ref
    }
    this.input.focus();
  };
  render = () => (
    <Modal show={this.props.isShown} onHide={this.props.hide}>
      <form onSubmit={this.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formBasicText">
            <ControlLabel>
              What do you want to name this conversation?
            </ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
              inputRef={ref => {
                this.setInput(ref);
              }}
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
    isShown: state.showNewConversationModal
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

// const mapDispatchToProps = dispatch => ({
//   editConversationTitle: (conversationId, text) => {
//     dispatch(editConversationTitle(conversationId, text));
//   }
// });

export default connect(mapStateToProps, mapDispatchToProps)(
  NewConversationModal
);
