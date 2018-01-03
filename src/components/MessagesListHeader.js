import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";
import { ActionCable } from "react-actioncable-provider";
import {
  editConversationTitle,
  showEditConversationModal,
  updateViewConversation
} from "../redux/actions";

class MessagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.title) {
      this.state = { text: this.props.title };
    } else {
      this.state = { text: "" };
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.title) {
      this.setState({ text: nextProps.title });
    } else {
      if (nextProps.users) {
        const users = nextProps.users.filter(
          user => user.id !== nextProps.currentUser.id
        );
        const userNames = users.map(
          user => `${user.first_name} ${user.last_name}`
        );
        this.setState({ text: userNames.join(", ") });
      } else {
        this.setState({ text: "" });
      }
    }
  };

  onSubmitHandler = (e, input) => {
    e.preventDefault();
    if (!this.state.text.trim()) {
      return;
    }
    if (this.props.title === this.state.text) {
      return;
    }
    this.refs.cable.perform("rename_conversation", {
      conversation: this.props.id,
      title: this.state.text,
      user: this.props.currentUser.id
    });
    this.props.updateViewConversation(
      this.props.currentUser.id,
      this.props.id
    );
    // this.props.editConversationTitle(this.props.id, this.state.text);
    input.blur();
  };

  render() {
    let input;
    return (
      <div className="messages_list_header" style={styles.header}>
        <ActionCable
          ref="cable"
          channel={{
            channel: "ConversationChannel",
            conversation: this.props.activeConversationId
          }}
        />
        <form onSubmit={e => this.onSubmitHandler(e, input)}>
          <input
            className="messages_list_header_title_input"
            type="text"
            value={this.state.text}
            style={styles.title}
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
            ref={node => (input = node)}
            spellCheck="false"
          />
        </form>
        {this.props.id ? (
          <Button
            className="edit_conversation_button"
            style={styles.button}
            onClick={() => this.props.showEditConversationModal(this.props.id)}
          >
            <Glyphicon glyph="option-horizontal" style={styles.glyphicon} />
          </Button>
        ) : null}
      </div>
    );
  }
}

const styles = {
  button: {
    position: "absolute",
    right: "18px",
    top: "4px",
    border: "none",
    padding: "5px 10px 4px"
  },
  header: {
    boxShadow: "0 1px 3px #999",
    height: "40px",
    textAlign: "center",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
  },
  title: {
    border: 0,
    fontSize: "1.5rem",
    fontWeight: "700",
    marginTop: "9px",
    textAlign: "center",
    width: "90%"
  },
  glyphicon: {
    paddingTop: "4px"
  }
};

const mapStateToProps = ({
  conversations,
  activeConversationId,
  currentUser
}) => {
  const currentConvo = conversations.find(c => c.id === activeConversationId);
  return currentConvo
    ? {
        id: currentConvo.id,
        title: currentConvo.title,
        users: currentConvo.users,
        currentUser
      }
    : {
        id: null,
        title: null,
        users: null,
        currentUser
      };
};

const mapDispatchToProps = dispatch => ({
  editConversationTitle: (conversationId, text) => {
    dispatch(editConversationTitle(conversationId, text));
  },
  showEditConversationModal: conversationId => {
    dispatch(showEditConversationModal(conversationId));
  },
  updateViewConversation: (user_id, conversation_id) => {
    dispatch(updateViewConversation(user_id, conversation_id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListHeader);
