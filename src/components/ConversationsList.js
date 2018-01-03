import React from "react";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import ConversationsListHeader from "./ConversationsListHeader";
import AddConversationButton from "./AddConversationButton";
import ConversationCard from "./ConversationCard";

const ConversationsList = ({
  conversations,
  currentUser,
  conversationsLoading,
  addedConversation
}) => {
  let cons;

  if (conversations.length) {
    cons = conversations
      // eslint-disable-next-line
      .sort((a, b) => {
        if (a.latest_message && b.latest_message) {
          return (
            new Date(b.latest_message.created_at) -
            new Date(a.latest_message.created_at)
          );
        } else if (!a.latest_message) {
          return -1;
        } else if (!b.latest_message) {
          return 1;
        }
      })
      .map(c => <ConversationCard key={c.id} conversation={c} />);
  }

  let toRender;

  if (conversationsLoading) {
    toRender = (
      <div style={styles.loaderContainer}>
        <BeatLoader color={"#377BB5"} />
      </div>
    );
  } else if (!cons) {
    toRender = (
      <div style={styles.noMessageContainer}>
        <p style={{marginBottom: "20px"}}>You haven't joined any conversations yet.</p>
        <p> Press "+" to get started!</p>
      </div>
    );
  } else {
    toRender = cons
  }

  return (
    <div style={styles.conversationsList}>
      <ConversationsListHeader />
      <div id="conversations_list_container" style={styles.container}>
        {toRender}
      </div>
      <AddConversationButton />
    </div>
  );
};

const styles = {
  container: {
    height: "calc(100% - 80px)",
    overflow: "scroll"
  },
  conversationsList: {
    borderRadius: "8px",
    boxShadow: "0px 0px 5px #999",
    color: "#888",
    height: "100%"
  },
  loaderContainer: {
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "57px",
    height: "20px"
  },
  noMessageContainer: {
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "225px",
    height: "80px",
    textAlign: "center"
  }
};

const mapStateToProps = state => {
  return {
    conversations: state.conversations,
    currentUser: state.currentUser,
    conversationsLoading: state.conversationsLoading
  };
};

export default connect(mapStateToProps, null)(ConversationsList);
