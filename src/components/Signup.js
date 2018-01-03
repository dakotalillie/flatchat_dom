import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import { connect } from "react-redux";
import { API_ROOT, signup } from "../redux/actions";

class Signup extends React.Component {
  state = {
    username: {
      value: "",
      validation: null,
      error: ""
    },
    first_name: {
      value: "",
      validation: null,
      error: ""
    },
    last_name: {
      value: "",
      validation: null,
      error: ""
    },
    password: {
      value: "",
      validation: null,
      error: ""
    },
    retype_password: {
      value: "",
      validation: null,
      error: ""
    }
  };

  handleChange = (e, target) => {
    const newState = { ...this.state };
    newState[target].value = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.checkForBlankFields()) {
      return;
    }
    if (this.checkForErrors()) {
      return;
    }
    this.props.signup({
      username: this.state.username.value,
      first_name: this.state.first_name.value,
      last_name: this.state.last_name.value,
      password: this.state.password.value
    });
  };

  checkForBlankFields = () => {
    let errors = false
    for (let key in this.state) {
      if (!this.state[key].value) {
        this.renderError(key, "required field");
        errors = true;
      }
    }
    return errors
  }

  checkForErrors = () => {
    let errors = false
    for (let key in this.state) {
      if (this.state[key].error) {
        errors = true;
      }
    }
    return errors
  }

  renderError = (target, message) => {
    const newState = { ...this.state };
    newState[target].validation = "error";
    newState[target].error = message;
    this.setState(newState);
  };

  renderSuccess = target => {
    const newState = { ...this.state };
    newState[target].validation = "success";
    newState[target].error = "";
    this.setState(newState);
  };

  capitalize = (target, name) => {
    const arr = name.split("");
    arr[0] = arr[0].toUpperCase();
    const capName = arr.join("");
    const newState = { ...this.state };
    newState[target].value = capName;
    this.setState(newState);
  };

  getValidationState = (e, key) => {
    const username = this.state.username.value;
    const first_name = this.state.first_name.value;
    const last_name = this.state.last_name.value;
    const password = this.state.password.value;
    const retype_password = this.state.retype_password.value;
    switch (key) {
      case "username":
        if (username.length === 0) {
          return;
        } else if (username.length < 3) {
          this.renderError("username", "username is too short");
        } else if (username.length > 16) {
          this.renderError("username", "username is too long");
        } else {
          fetch(`${API_ROOT}/search/users/exact/${username}`)
            .then(res => res.json())
            .then(json => {
              if (json.message === "taken") {
                this.renderError("username", "username is already taken");
              } else if (json.message === "available") {
                this.renderSuccess("username");
              }
            });
        }
        break;
      case "first_name":
        if (first_name.length === 0) {
          return;
        } else if (first_name.length === 1) {
          this.renderError("first_name", "name is too short");
        } else {
          this.renderSuccess("first_name");
          this.capitalize("first_name", first_name);
        }
        break;
      case "last_name":
        if (last_name.length === 0) {
          return;
        } else if (last_name.length === 1) {
          this.renderError("last_name", "name is too short");
        } else {
          this.renderSuccess("last_name");
          this.capitalize("last_name", last_name);
        }
        break;
      case "password":
        if (password.length === 0) {
          return;
        } else if (password.length < 6) {
          this.renderError(
            "password",
            "password must be a minimum of 6 characters"
          );
        } else if (password.length > 32) {
          this.renderError("password", "password is too long");
        } else if (password.match(/\s/)) {
          this.renderError("password", "password cannot contain whitespace");
        } else {
          this.renderSuccess("password");
          if (
            this.state.retype_password.validation === "error" &&
            retype_password === password
          ) {
            this.renderSuccess("retype_password");
          }
        }
        break;
      case "retype_password":
        if (retype_password.length === 0) {
          return;
        } else if (retype_password !== password) {
          this.renderError("retype_password", "passwords do not match");
        } else {
          this.renderSuccess("retype_password");
        }
        break;
      default:
        debugger;
    }
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
        <FormGroup validationState={this.state.username.validation}>
          <ControlLabel>username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username.value}
            placeholder="jdoe"
            onChange={e => this.handleChange(e, "username")}
            onBlur={e => this.getValidationState(e, "username")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.username.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.first_name.validation}>
          <ControlLabel>first name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.first_name.value}
            placeholder="Jane"
            onChange={e => this.handleChange(e, "first_name")}
            onBlur={e => this.getValidationState(e, "first_name")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.first_name.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.last_name.validation}>
          <ControlLabel>last name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.last_name.value}
            placeholder="Doe"
            onChange={e => this.handleChange(e, "last_name")}
            onBlur={e => this.getValidationState(e, "last_name")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.last_name.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.password.validation}>
          <ControlLabel>password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="password"
            onChange={e => this.handleChange(e, "password")}
            onBlur={e => this.getValidationState(e, "password")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.password.error}</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.retype_password.validation}>
          <ControlLabel>re-type password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.retype_password.value}
            placeholder="password"
            onChange={e => this.handleChange(e, "retype_password")}
            onBlur={e => this.getValidationState(e, "retype_password")}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.retype_password.error}</HelpBlock>
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
