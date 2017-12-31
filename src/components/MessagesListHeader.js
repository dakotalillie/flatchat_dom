import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "react-bootstrap";
import { editConversationTitle } from "../redux/actions";

class MessagesListHeader extends React.Component {
  state = {
    text: this.props.title
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ text: nextProps.title });
  };

  onSubmitHandler = (e, input) => {
    e.preventDefault();
    if (!this.state.text.trim()) {
      return;
    }
    this.props.editConversationTitle(this.props.id, this.state.text);
    input.blur();
  };

  render() {
    let input;
    return (
      <div className="messages_list_header" style={styles.header}>
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
        <Button className="edit_conversation_button" style={styles.button}>
          <Glyphicon glyph="option-horizontal" style={styles.glyphicon} />
        </Button>
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
    textAlign: "center"
  },
  glyphicon: {
    paddingTop: "4px"
  }
};

const mapStateToProps = ({ conversations, activeConversationId }) => {
  const currentConvo = conversations.find(c => c.id === activeConversationId);
  return currentConvo
    ? {
        id: currentConvo.id,
        title: currentConvo.title
      }
    : {
        id: null,
        title: ""
      };
};

const mapDispatchToProps = dispatch => ({
  editConversationTitle: (conversationId, text) => {
    dispatch(editConversationTitle(conversationId, text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListHeader);
