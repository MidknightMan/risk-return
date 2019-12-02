import React, { PureComponent } from 'react';
import Switch from 'react-switch';
import * as tiingo from '../API/tiingoAPI';
import * as wtd from '../API/wtdAPI';
import SearchResultCard from './SearchResultCard';

class StockSearch extends PureComponent {
  state = {
    nameSearch: false,
    searchedName: false,
    searchedSymbol: false,
    nameQuery: '',
    noResults: false,
    nameList: null,
    symbolList: null,
    symbolQuery: ''
  };

  handleSwitch = () => {
    this.setState(currentState => {
      return { nameSearch: !currentState.nameSearch };
    });
  };

  handleNameSubmit = event => {
    event.preventDefault();
    const { nameQuery } = this.state;
    tiingo.getCompanyList(nameQuery).then(list => {
      console.log(list);
      if (list.length === 0) {
        this.setState({ noResults: true, nameQuery: '' });
      } else {
        this.setState({
          searchedName: true,
          nameList: list,
          nameQuery: '',
          noResults: false
        });
      }
    });
  };

  handleSymbolSubmit = event => {
    event.preventDefault();
    const { symbolQuery } = this.state;
    wtd.getSymbolCompany(symbolQuery).then(list => {
      console.log(list);
      if (list.data.length === 0) {
        this.setState({ noResults: true, nameQuery: '' });
      } else {
        this.setState({
          searchedSymbol: true,
          symbolList: list.data,
          symbolQuery: '',
          noResults: false
        });
      }
    });
  };

  handleNameChange = event => {
    this.setState({ nameQuery: event.target.value });
  };

  handleSymbolChange = event => {
    this.setState({ symbolQuery: event.target.value });
  };

  render() {
    return (
      <div id="searchContainer">
        <label id="switchContainer">
          <p id="labelElement">Toggle To Search For Security Name:</p>
          <Switch
            onChange={this.handleSwitch}
            checked={this.state.nameSearch}
            id="switchToggle"
          />
        </label>
        {this.state.nameSearch ? (
          <form onSubmit={this.handleNameSubmit} id="boxForSearch">
            {' '}
            <input
              type="text"
              placeholder="Search for security by name e.g. Apple"
              onChange={this.handleNameChange}
              value={this.state.nameQuery}
              id="searchBox"
            />{' '}
            <button type="submit" id="submitButton">
              Search
            </button>{' '}
          </form>
        ) : (
          <form onSubmit={this.handleSymbolSubmit} id="boxForSearch">
            <input
              type="text"
              placeholder="Search for stock by ticker e.g. AAPL"
              onChange={this.handleSymbolChange}
              value={this.state.symbolQuery}
              id="searchBox"
            />
            <button type="submit" id="submitButton">
              Search
            </button>
          </form>
        )}
        {this.state.noResults && <p>No Results Found - Please Search Again</p>}
        {this.state.searchedName &&
          this.state.nameList.map((company, index) => {
            return (
              <SearchResultCard
                symbol={company.ticker}
                name={company.name}
                type={company.assetType}
                origin={company.countryCode}
                key={index}
              />
            );
          })}
        {this.state.searchedSymbol &&
          this.state.symbolList.map((company, index) => {
            return (
              <SearchResultCard
                symbol={company.symbol}
                name={company.name}
                type={company.currency}
                origin={company.stock_exchange_short}
                key={index}
              />
            );
          })}
      </div>
    );
  }
}

export default StockSearch;
