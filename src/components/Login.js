import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux"
import { login } from "../redux/actions";


class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (e, target) => {
    const newState = { ...this.state };
    newState[target] = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
  }

  render = () => (
    <div className={this.props.active === "login" ? "login active" : "login"}>
      <Button
        style={styles.backButton}
        onClick={e => this.props.handleClick(e, "greeting")}
      >
        Back
      </Button>
      <h2 style={styles.header}>Login</h2>
      <hr />
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={e => this.handleChange(e, "username")}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={e => this.handleChange(e, "password")}
          />
        </FormGroup>
        <Button
          type="submit"  
          bsStyle="primary"
          bsSize="large"
          block
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

const styles = {
  backButton: {
    border: "none",
    left: "-15px",
    position: "absolute",
    top: "-15px"
  },
  header: {
    marginTop: "10px"
  }
};

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password));
  }
})

export default connect(null, mapDispatchToProps)(Login);
