import React from "react";
import { connect } from "react-redux";
import ConversationsListHeader from "./ConversationsListHeader";
import AddConversationButton from "./AddConversationButton";
import ConversationCard from "./ConversationCard";

const ConversationsList = ({ conversations }) => {
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

  return (
    <div style={styles.conversationsList}>
      <ConversationsListHeader />
      {cons}
      <AddConversationButton />
    </div>
  );
};

const styles = {
  conversationsList: {
    borderRadius: "8px",
    boxShadow: "0px 0px 5px #999",
    color: "#888",
    height: "100%"
  }
};

const mapStateToProps = state => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps, null)(ConversationsList);
