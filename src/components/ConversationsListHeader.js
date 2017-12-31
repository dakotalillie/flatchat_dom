import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { showUserProfileModal } from "../redux/actions";

const ConversationsListHeader = props => (
  <div style={styles.header}>
    <h4 style={styles.title}>FlatChat</h4>
    <Button
      className="profile_button"
      style={styles.settingsButton}
      onClick={props.showUserProfileModal}
    >
      <Glyphicon glyph="user" />
    </Button>
  </div>
);

const styles = {
  header: {
    boxShadow: "0 1px 3px #999",
    height: "40px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
  },
  title: {
    paddingTop: "11px",
    float: "left",
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
    paddingLeft: "10px"
  },
  settingsButton: {
    float: "right",
    marginRight: "3px",
    padding: "5px 10px",
    border: 0,
    marginTop: "5px"
  }
};

const mapDispatchToProps = dispatch => ({
  showUserProfileModal: () => {
    dispatch(showUserProfileModal());
  }
});

export default connect(null, mapDispatchToProps)(ConversationsListHeader);
