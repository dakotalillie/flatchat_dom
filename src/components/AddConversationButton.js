import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { showNewConversationModal } from "../redux/actions";

const AddConversationButton = props => {
  return (
    <div style={styles.container}>
      <Button
        bsStyle="success"
        className="add_conversation_button"
        style={styles.button}
        onClick={props.showModal}
      >
        <Glyphicon glyph="plus" />
      </Button>
    </div>
  );
};

const styles = {
  container: {
    width: "calc(100% - 30px)",
    position: "absolute",
    bottom: 0
  },
  button: {
    border: 0,
    borderRadius: "8px",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // boxShadow: "0 -1px 1px #999",
    height: "40px",
    width: "100%"
  }
};

const mapDispatchToProps = dispatch => ({
  showModal: () => {
    dispatch(showNewConversationModal());
  }
});

export default connect(null, mapDispatchToProps)(AddConversationButton);
