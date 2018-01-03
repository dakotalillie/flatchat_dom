import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { API_ROOT } from "../redux/actions";

class Typeahead extends React.Component {
  state = {
    isLoading: false,
    options: []
  };
  handleSearch = query => {
    this.setState({ isLoading: true });
    fetch(`${API_ROOT}/search/users/${query}`)
      .then(res => res.json())
      .then(options => {
        this.setState({
          isLoading: false,
          options
        });
      });
  };

  render = () => {
    return (
      <AsyncTypeahead
        {...this.state}
        multiple
        labelKey={option =>
          `${option.username} (${option.first_name} ${option.last_name})`
        }
        minLength={2}
        onSearch={this.handleSearch}
        placeholder="Add users"
        onChange={selected => {
          this.props.handleSelect(selected);
        }}
        selected={this.props.selected}
        useCache={false}
        delay={0}
        isLoading={this.state.isLoading}
        filterBy={(option, text) => {
          let good = true;
          this.props.dontSearch.forEach(banned => {
            if (option.id === banned) {
              good = false;
            }
          });
          if (good === false) {
            return;
          }
          return option;
        }}
      />
    );
  };
}

export default Typeahead;
