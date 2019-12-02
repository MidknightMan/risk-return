import React from 'react';
import StockSearch from './Components/StockSearch';
import './App.css';
import NavBar from './Components/NavBar';
import { Router } from '@reach/router';
import Portfolio from './Components/Portfolio';
import StockInfoRisk from './Components/StockInfoRisk';
import rrentericon from './rrentericon.png';
import ErrorHandling from './Components/ErrorHandling';

class App extends React.Component {
  state = { isLoading: true };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>risk//return</h1>
          <img src={rrentericon} alt="" />
        </header>
        <NavBar />
        <Router>
          <StockSearch path="/" />
          <Portfolio path="/portfolio" />
          <StockInfoRisk path="/security/:symbol" />
          <ErrorHandling path="/*" />
        </Router>
        <p>Created by Krishan Tanna</p>
        <div>
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    );
  }
}

export default App;
