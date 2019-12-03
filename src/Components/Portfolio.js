import React, { PureComponent } from 'react';
import PortfolioCard from './PortfolioCard';
import { Link } from '@reach/router';

class Portfolio extends PureComponent {
  state = {
    portfolio: [],
    isLoading: true,
    cleared: false,
    portfolioNotional: 1000000
  };
  componentDidMount() {
    const stringportfolio = localStorage.getItem('portfolio');
    if (stringportfolio) {
      const portfolio = JSON.parse(stringportfolio);
      this.setState({ portfolio, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }

  clearPortfolio = event => {
    event.preventDefault();
    this.setState({ portfolio: [], cleared: true });
    localStorage.clear();
    console.log('cleared');
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cleared !== prevState.cleared) {
      this.setState({ cleared: false });
    }
  }

  getAverageRisk = () => {
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    let rrArr = [];
    this.state.portfolio.forEach(security => {
      rrArr.push(security.rrRiskScore);
    });
    let averageRisk = arrAvg(rrArr);
    return Math.round(averageRisk);
  };

  getAverageReturn = () => {
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    let returnPercentArr = [];
    this.state.portfolio.forEach(security => {
      returnPercentArr.push(security.year1return);
    });
    let averageReturn =
      this.state.portfolioNotional +
      arrAvg(returnPercentArr) * this.state.portfolioNotional;

    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const portfolioReturn = formatNumber(Math.round(averageReturn));
    return portfolioReturn;
  };

  changeVal = event => {
    event.preventDefault();
    this.setState({ portfolioNotional: event.target.value });
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h2>Portfolio</h2>
        {this.state.portfolio.length === 0 ? (
          <p>Please add some securities!</p>
        ) : (
          <div>
            {this.state.portfolio.map((security, index) => {
              return (
                <PortfolioCard
                  symbol={security.symbol}
                  logo={security.logo}
                  name={security.profile.companyName}
                  y1return={security.year1return}
                  riskrating={security.rrRiskScore}
                  key={index}
                />
              );
            })}
            <div>
              {/* <input
                type="number"
                onChange={this.changeVal}
                value={this.state.portfolioNotional}
                placeholder="Enter Value Here, Default 1000000"
              /> */}
              <h3>Portfolio Metrics</h3>
              <h4>Average Risk Score: {this.getAverageRisk()}</h4>
              <h4>
                Backtested Return From Holding Portfolio Based on a £1,000,000
                Initial Investment: £{this.getAverageReturn()}
              </h4>
            </div>
          </div>
        )}
        <form onSubmit={this.clearPortfolio}>
          <button type="submit">Clear</button>
        </form>
        <Link to="/">Back To Search</Link>
      </div>
    );
  }
}

export default Portfolio;
