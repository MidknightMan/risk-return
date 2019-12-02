import React from 'react';
import { Link } from '@reach/router';

function SearchResultCard({ symbol, name, type, origin }) {
  return (
    <div id="resultCardContainer">
      <p id="ticker">Ticker: {symbol}</p>
      <p id="secName">Name: {name}</p>
      <p id="assetCur">Asset Type/Currency: {type}</p>
      <p id="orex">Origin/Exchange: {origin}</p>
      <form onSubmit={() => {}} id="clickOnSec">
        <Link to={`/security/${symbol}`}>
          <button type="submit" id="submitButton2">
            See More >
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchResultCard;
