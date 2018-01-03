import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import ChatAreaContainer from "./ChatAreaContainer";
import Welcome from "./Welcome";
import { fetchCurrentUser, noToken } from "../redux/actions";

class App extends React.Component {
  componentWillMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.fetchCurrentUser();
    } else {
      this.props.noToken();
    }
  };

  render = () => {
    return (
      <div id="App">
        <Route
          exact
          path="/"
          render={() => {
            if (this.props.loading) {
              return (
                <div />
              );
            } else if (this.props.loggedIn) {
              return <ChatAreaContainer />;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route exact path="/welcome" component={Welcome} />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  loggedIn: state.isLoggedIn,
  loading: state.currentUser.loading
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },
  noToken: () => {
    dispatch(noToken());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
