import React from 'react';

function PortfolioCard({ symbol, logo, name, y1return, riskrating }) {
  return (
    <div>
      <img src={logo} alt="" />
      <h3>{name}</h3>
      <p>Ticker:{symbol}</p>
      <p>r//r Risk Rating: {riskrating}</p>
      <p>Return{y1return * 100}%</p>
    </div>
  );
}

export default PortfolioCard;
