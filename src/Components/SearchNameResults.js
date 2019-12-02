import React, { PureComponent } from 'react';

class SearchNameResults extends PureComponent {
  state = { isLoading: true, results: null };

  componentDidMount() {
    this.setState({ isLoading: false, results: this.props.searchResults });
  }

  render() {
    return (
      <div>
        <p>Search Results:</p>
        <p>{this.state.results.length}</p>
      </div>
    );
  }
}

export default SearchNameResults;
