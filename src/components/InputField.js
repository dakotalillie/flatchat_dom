import React from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
  Glyphicon
} from "react-bootstrap";
import { addMessage } from "../redux/actions";

let InputField = ({ currentUserId, activeConversationId, addMessage }) => {
  let input;

  const onSubmit = e => {
    e.preventDefault();
    const inputValue = findDOMNode(input).value;
    if (!inputValue.trim()) {
      return;
    }
    addMessage(inputValue, activeConversationId, currentUserId);
    findDOMNode(input).value = "";
  };

  return (
    <Grid style={styles.grid}>
      <Row>
        <form onSubmit={e => onSubmit(e)}>
          <Col md={11} style={{paddingRight: 0}}>
            <FormGroup bsSize="large">
              <FormControl
                type="text"
                placeholder="Type to chat..."
                ref={node => {
                  input = node;
                }}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              bsStyle="primary"
              bsSize="large"
              style={styles.submitButton}
              type="submit"
              className="send_message_button"
            >
              <Glyphicon glyph="send" style={{marginLeft: "-4px"}}/>
            </Button>
          </Col>
        </form>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentUserId: state.currentUser.id,
  activeConversationId: state.activeConversationId
})

const mapDispatchToProps = dispatch => (
  {
    addMessage: (text, conversationId, userId) => {
      dispatch(addMessage(text, conversationId, userId))
    }
  }
)

InputField = connect(mapStateToProps, mapDispatchToProps)(InputField);

const styles = {
  grid: {
    marginTop: "20px"
  },
  submitButton: {
    width: "100%",
    paddingTop: "12px",
    paddingBottom: "8px"
  }
};

export default InputField;
