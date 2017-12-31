import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import MessagesListHeader from "./MessagesListHeader";

const MessagesList = ({ currentUser, messages }) => {
  // debugger
  return (
    <div style={styles.messagesListContainer} id="messages_list_container">
      <MessagesListHeader />
      <div style={styles.messagesList} id="messages_list">
        {messages
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(m => <Message key={m.id} userMessage={m.user_id === currentUser.id} >{m.text}</Message>)}
      </div>
    </div>
  )
};

const styles = {
  messagesList: {
    color: "#888",
    display: "flex",
    flexDirection: "column-reverse",
    height: "calc(100% - 40px)",
    padding: "10px",
    overflow: "scroll"
  },
  messagesListContainer: {
    borderRadius: "8px",
    boxShadow: "0px 0px 5px #999",
    height: "100%"
  }
};

const mapStateToProps = ({
  currentUser,
  activeConversationId,
  conversations
}) => {
  const currentConvo = conversations.find(c => c.id === activeConversationId);
  return currentConvo
    ? { currentUser, messages: currentConvo.messages }
    : { currentUser, messages: [] };
};

export default connect(mapStateToProps, null)(MessagesList);
