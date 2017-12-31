import React from "react";
import { Button } from "react-bootstrap";

const Greeting = ({ active, handleClick }) => (
  <div className={active === "greeting" ? "greeting active" : "greeting"}>
    <h1 style={styles.header}>FlatChat</h1>
    <h4 style={styles.subHeader}>a Flatiron chat service</h4>
    <hr />
    <Button
      bsStyle="primary"
      bsSize="large"
      block
      onClick={e => handleClick(e, "login")}
    >
      Log In
    </Button>
    <Button bsSize="large" block>
      Sign Up
    </Button>
  </div>
);

const styles = {
  header: {
    marginTop: "10px"
  },
  subHeader: {
    color: "#888"
  }
};

export default Greeting;
