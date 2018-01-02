import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import MessagesListHeader from "./MessagesListHeader";

const MessagesList = ({ currentUser, messages, users }) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const myMessages = sortedMessages.map((m, i, sortedMessages) => {
    return (
      <Message
        key={m.id}
        userMessage={m.user_id === currentUser.id}
        user={users.find(u => u.id === m.user_id)}
        groupChat={users.length > 2}
        lastMessageBySameUser={
          i < sortedMessages.length - 1
            ? sortedMessages[i].user_id === sortedMessages[i + 1].user_id
            : false
        }
      >
        {m.text}
      </Message>
    );
  });
  return (
    <div style={styles.messagesListContainer} id="messages_list_container">
      <MessagesListHeader />
      <div style={styles.messagesList} id="messages_list">
        {myMessages}
      </div>
    </div>
  );
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
    ? {
        currentUser,
        messages: currentConvo.messages,
        users: currentConvo.users
      }
    : { currentUser, messages: [], users: [] };
};

export default connect(mapStateToProps, null)(MessagesList);
