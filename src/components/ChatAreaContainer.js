import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { ActionCable } from "react-actioncable-provider";
import MessagesList from "./MessagesList";
import ConversationsList from "./ConversationsList";
import InputField from "./InputField";
import NewConversationModal from "./NewConversationModal";
import UserProfileModal from "./UserProfileModal";
import {
  fetchConversations,
  fetchMessagesForActiveConversation,
  updateViewConversation,
  receiveAddedConversation,
  receiveAddedMessage
} from "../redux/actions";
import EditConversationModal from "./EditConversationModal";

class ChatAreaContainer extends React.Component {
  componentDidMount = () => {
    const id = this.props.currentUserId;
    this.props.fetchConversations(id);
  };

  componentWillReceiveProps = nextProps => {
    // fetch original messages
    const activeConversation = nextProps.conversations.find(
      c => c.id === nextProps.activeConversationId
    );
    if (
      activeConversation &&
      !activeConversation.loading &&
      !activeConversation.messages.length &&
      activeConversation.last_viewed
    ) {
      this.props.fetchMessagesForActiveConversation(
        nextProps.activeConversationId
      );
    }

    // update conversation's last_checked time every time a new conversation is opened
    if (
      nextProps.activeConversationId !== this.props.activeConversationId &&
      activeConversation &&
      activeConversation.last_viewed
    ) {
      this.props.updateViewConversation(
        this.props.currentUserId,
        nextProps.activeConversationId
      );
    }
  };

  render = () => (
    <Grid>
      <ActionCable
        channel={{
          channel: "NewConversationChannel",
          user: this.props.currentUserId
        }}
        onReceived={conversation => {
          if (!this.props.conversations.find(c => c.id === conversation.id)) {
            this.props.addedConversation(conversation);
          } else {
            this.props.addedMessage(conversation.messages[0])
          }
        }}
      />
      <Row style={styles.topRow}>
        <Col sm={3} style={styles.col}>
          <ConversationsList />
        </Col>
        <Col sm={9} style={styles.col}>
          <MessagesList />
        </Col>
      </Row>
      <Row>
        <InputField />
      </Row>
      <NewConversationModal />
      <UserProfileModal />
      <EditConversationModal />
    </Grid>
  );
}

const styles = {
  topRow: {
    height: "calc(100vh - 100px)",
    marginTop: "20px"
  },
  col: {
    height: "100%"
  }
};

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  activeConversationId: state.activeConversationId,
  conversations: state.conversations
});

const mapDispatchToProps = dispatch => ({
  fetchConversations: userId => {
    dispatch(fetchConversations(userId));
  },
  fetchMessagesForActiveConversation: activeConversationId => {
    dispatch(fetchMessagesForActiveConversation(activeConversationId));
  },
  updateViewConversation: (userId, conversationId) => {
    dispatch(updateViewConversation(userId, conversationId));
  },
  addedConversation: conversation => {
    dispatch(receiveAddedConversation(conversation));
  },
  addedMessage: message => {
    dispatch(receiveAddedMessage(message))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatAreaContainer);
