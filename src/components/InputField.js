import React from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
  Glyphicon
} from "react-bootstrap";
import { addMessage } from "../redux/actions";

let InputField = ({
  currentUserId,
  activeConversationId,
  conversation,
  newConversation,
  addMessage
}) => {
  let input;
  let newMessageCable;
  let newConversationCable;

  const onSubmit = e => {
    e.preventDefault();
    const inputValue = findDOMNode(input).value;
    if (!inputValue.trim()) {
      return;
    }
    if (newConversation) {
      newConversationCable.perform("new_conversation", {
        conversation,
        message: {
          text: inputValue,
          conversation: activeConversationId,
          user: currentUserId
        }
      });
    } else {
      newMessageCable.perform("send_message", {
      message: inputValue,
      conversation: activeConversationId,
      user: currentUserId
    });
    }
    // addMessage(inputValue, activeConversationId, currentUserId);
    findDOMNode(input).value = "";
  };

  return (
    <Grid style={styles.grid}>
      <ActionCable
        ref={node => {
          newMessageCable = node;
        }}
        channel={{
          channel: "ConversationChannel",
          conversation: activeConversationId
        }}
      />
      <ActionCable
        ref={node => {
          newConversationCable = node;
        }}
        channel={{ channel: "NewConversationChannel", user: currentUserId }}
      />
      <Row>
        <form onSubmit={e => onSubmit(e)}>
          <Col md={11} style={{ paddingRight: 0 }}>
            <FormGroup bsSize="large">
              <FormControl
                type="text"
                placeholder="Type to chat..."
                ref={node => {
                  input = node;
                }}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              bsStyle="primary"
              bsSize="large"
              style={styles.submitButton}
              type="submit"
              className="send_message_button"
            >
              <Glyphicon glyph="send" style={{ marginLeft: "-4px" }} />
            </Button>
          </Col>
        </form>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => {
  const activeConversationId = state.activeConversationId;
  const conversation = state.conversations.find(
    c => c.id === state.activeConversationId
  );
  const newConversation = activeConversationId
    ? conversation.messages.length === 0
    : null;
  return {
    currentUserId: state.currentUser.id,
    activeConversationId,
    newConversation,
    conversation
  };
};

const mapDispatchToProps = dispatch => ({
  addMessage: (text, conversationId, userId) => {
    dispatch(addMessage(text, conversationId, userId));
  }
});

InputField = connect(mapStateToProps, mapDispatchToProps)(InputField);

const styles = {
  grid: {
    marginTop: "20px"
  },
  submitButton: {
    width: "100%",
    paddingTop: "12px",
    paddingBottom: "8px"
  }
};

export default InputField;
