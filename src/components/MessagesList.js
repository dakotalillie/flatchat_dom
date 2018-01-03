import React from "react";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import Message from "./Message";
import MessagesListHeader from "./MessagesListHeader";

const MessagesList = ({ currentUser, messages, users, loading }) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const myMessages = sortedMessages.map((m, i, sortedMessages) => {
    return (
      <Message
        key={m.id}
        userMessage={m.user_id === currentUser.id}
        user={users.find(u => u.id === m.user_id)}
        lastMessageBySameUser={
          i < sortedMessages.length - 1
            ? sortedMessages[i].user_id === sortedMessages[i + 1].user_id
            : false
        }
        systemMessage={!m.user_id}
      >
        {m.text}
      </Message>
    );
  });
  return <div style={styles.messagesListContainer} id="messages_list_container">
      <MessagesListHeader />
      <div style={styles.messagesList} id="messages_list">
        {loading ? <div style={styles.loaderContainer}>
            <ClipLoader color={"#377BB5"} size={60} />
          </div> : myMessages}
      </div>
    </div>;
};

const styles = {
  loaderContainer: {
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "45px",
    height: "20px"
  },
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
        users: currentConvo.users,
        loading: currentConvo.loading
      }
    : { currentUser, messages: [], users: [], loading: false };
};

export default connect(mapStateToProps, null)(MessagesList);
