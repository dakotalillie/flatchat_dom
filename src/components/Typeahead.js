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
  render = () => (
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
    />
  );
}

export default Typeahead;
