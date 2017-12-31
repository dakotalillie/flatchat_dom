import React from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { hideUserProfileModal } from "../redux/actions";

class UserProfileModal extends React.Component {
  handleClick = e => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  render = () => (
    <Modal show={this.props.isShown} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {this.props.currentUser.firstName} {this.props.currentUser.lastName}</p>
          <p>Username: {this.props.currentUser.username}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.props.hide}>Close</Button>
          <Button bsStyle="danger" onClick={this.handleClick}>
            Log Out
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    isShown: state.showUserProfileModal,
    currentUser: state.currentUser
  };
}

const mapDispatchToProps = dispatch => ({
  hide: () => {
    dispatch(hideUserProfileModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModal);
