import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Button, Glyphicon, Grid, Col, Row } from "react-bootstrap";
import { changeActiveConversation, showEditConversationModal } from "../redux/actions";
import NotificationDot from "./NotificationDot";

const ConversationCard = ({
  conversation,
  activeConversationId,
  currentUserId,
  changeActive,
  showEditConversationModal
}) => {
  const { id, title, latest_message, last_viewed, users } = conversation;
  let displayTitle;
  if (title) {
    displayTitle = title
  } else {
    const myUsers = users.filter(user => user.id !== currentUserId);
    const userNames = myUsers.map(user => user.first_name);
    displayTitle = userNames.join(", ")
  }
  return (
    <div
      className={
        id === activeConversationId
          ? "conversation_card active"
          : "conversation_card"
      }
      style={styles.wrapper}
      onClick={e => changeActive(id)}
    >
      <Grid style={styles.grid}>
        <Col xs={10}>
          <Row>
            <h5 style={styles.title}>{displayTitle}</h5>
          </Row>
          <Row>
            <p style={styles.time}>
              {latest_message ? (
                <Moment fromNow>{latest_message.created_at}</Moment>
              ) : null}
            </p>
          </Row>
        </Col>
        <Col xs={2}>
          <Row style={styles.dotRow}>
            {latest_message &&
            latest_message.created_at > last_viewed &&
            latest_message.user_id !== currentUserId ? (
              <NotificationDot />
            ) : null}
          </Row>
          <Row>
            <Button className="edit_conversation_button" style={styles.button} onClick={e => {
              e.stopPropagation();
              showEditConversationModal(id)
            }}>
              <Glyphicon glyph="option-horizontal" style={styles.glyphicon} />
            </Button>
          </Row>
        </Col>
      </Grid>
    </div>
  );
};

const styles = {
  button: {
    float: "right",
    marginRight: "-6px",
    marginTop: "4px",
    backgroundColor: "inherit",
    border: "none",
    padding: "5px 10px 4px"
  },
  dotRow: {
    height: "20px"
  },
  glyphicon: {
    paddingTop: "4px"
  },
  grid: {
    width: "100%",
    padding: 0
  },
  time: {
    margin: "5px 0 0"
  },
  title: {
    display: "inline-block",
    margin: 0
  },
  wrapper: {
    // backgroundColor: "#eee",
    cursor: "pointer",
    height: "70px",
    padding: "10px"
  }
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  activeConversationId: state.activeConversationId,
  currentUserId: state.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  changeActive: id => {
    dispatch(changeActiveConversation(id));
  },
  showEditConversationModal: id => {
    dispatch(showEditConversationModal(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationCard);
