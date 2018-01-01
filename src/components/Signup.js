import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from "react-redux";
import { signup } from "../redux/actions";

class Signup extends React.Component {
  state = {
    username: "",
    first_name: "",
    last_name: "",
    password: ""
  };

  handleChange = (e, target) => {
    const newState = { ...this.state };
    newState[target] = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signup(this.state);
  };

  render = () => (
    <div className="signup">
      <Button
        style={styles.backButton}
        onClick={e => this.props.handleClick(e, "greeting")}
      >
        Back
      </Button>
      <h2 style={styles.header}>Signup</h2>
      <hr />
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <FormGroup>
          <ControlLabel>username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="jdoe"
            onChange={e => this.handleChange(e, "username")}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>first name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.first_name}
            placeholder="Jane"
            onChange={e => this.handleChange(e, "first_name")}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>last name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.last_name}
            placeholder="Doe"
            onChange={e => this.handleChange(e, "last_name")}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={e => this.handleChange(e, "password")}
          />
        </FormGroup>
        <Button type="submit" bsStyle="primary" bsSize="large" block>
          Submit
        </Button>
      </form>
    </div>
  );
}

const styles = {
  backButton: {
    border: "none",
    left: "5px",
    position: "absolute",
    top: "5px"
  },
  form: {
    textAlign: "left"
  },
  header: {
    marginTop: "10px"
  }
};

const mapDispatchToProps = dispatch => ({
  signup: params => {
    dispatch(signup(params));
  }
});

export default connect(null, mapDispatchToProps)(Signup);