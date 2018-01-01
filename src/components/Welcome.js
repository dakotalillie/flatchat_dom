import React from "react";
import Greeting from "./Greeting";
import Login from "./Login";
import Signup from "./Signup";

class Welcome extends React.Component {
  state = {
    active: "greeting"
  };

  handleClick = (e, type) => {
    this.setState({ active: type });
  };

  render = () => (
    <div id="welcome" style={styles.welcome}>
      <video
        autoPlay
        muted
        loop
        id="welcome_video_background"
        style={styles.video}
      >
        <source
          src={require("../assets/background_vid.mp4")}
          type="video/mp4"
        />>
      </video>
      {this.state.active === "greeting" || this.state.active === "login" ? (
        <div style={styles.centerDiv}>
          <div className="welcome_div_content">
            <Greeting
              active={this.state.active}
              handleClick={this.handleClick}
            />
            <Login active={this.state.active} handleClick={this.handleClick} />
          </div>
        </div>
      ) : (
        <div style={styles.centerDivSignup}>
          <div className="welcome_div_content">
            <Signup
              active={this.state.active}
              handleClick={this.handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  centerDiv: {
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "400px",
    height: "275px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 1px 1px rgba(0,0,0,.05)",
    padding: "20px",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "white"
  },
  centerDivSignup: {
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "400px",
    height: "475px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 1px 1px rgba(0,0,0,.05)",
    padding: "20px",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "white"
  },
  video: {
    position: "fixed",
    right: 0,
    bottom: 0,
    minWidth: "100vw",
    minHeight: "100vh"
  },
  welcome: {
    height: "100vh",
    width: "100vw"
  }
};

export default Welcome;
