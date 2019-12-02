import React, { PureComponent } from 'react';
import * as iex from '../API/iexAPI';
import * as finnhub from '../API/finnhubAPI';
import * as av from '../API/alphaVantageAPI';
import { navigate } from '@reach/router';

class StockInfoRisk extends PureComponent {
  state = {
    symbol: '',
    isLoading: true,
    logo: null,
    keyStats: {},
    beta: null,
    sentiment: {},
    earningsRisk: null,
    stddev: null,
    profile: {},
    year1return: null,
    currentPortfolio: []
  };

  componentDidMount() {
    return Promise.all([
      iex.getCompanyLogo(this.props.symbol),
      iex.getCompanyProfile(this.props.symbol),
      finnhub.getSentiment(this.props.symbol),
      finnhub.getEarningsScore(this.props.symbol),
      iex.getKeyStats(this.props.symbol),
      av.getDeviation(this.props.symbol)
    ]).then(([url, profileObj, sentimentObj, score, stats, stddev]) => {
      this.setState({
        symbol: this.props.symbol,
        logo: url,
        profile: profileObj,
        sentiment: sentimentObj,
        earningsRisk: score,
        keyStats: stats,
        beta: stats.beta,
        year1return: stats.year1ChangePercent,
        stddev,
        isLoading: false,
        currentPortfolio: JSON.parse(localStorage.getItem('portfolio'))
      });
    });
  }

  handleAddToPortfolio = event => {
    event.preventDefault();
    const {
      symbol,
      logo,
      keyStats,
      beta,
      earningsRisk,
      stddev,
      profile,
      year1return,
      currentPortfolio,
      sentiment
    } = this.state;

    const betaPrep = beta - 1;
    const betaRisk = betaPrep * 25;
    const ER = earningsRisk * 25;
    const devRisk = stddev * 25;
    const sentiRisk = sentiment.sentiment.bearishPercent * 25;
    const rrRiskScore = Math.round(betaRisk + ER + devRisk + sentiRisk);

    let newPortfolio;
    if (currentPortfolio === null) {
      newPortfolio = [];
    } else {
      newPortfolio = [...currentPortfolio];
    }
    const portfolioObject = {
      symbol,
      logo,
      keyStats,
      beta,
      earningsRisk,
      stddev,
      profile,
      year1return,
      sentiment,
      rrRiskScore
    };
    newPortfolio.push(portfolioObject);
    console.log(newPortfolio);
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
    navigate('/portfolio');
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    const betaPrep = this.state.beta - 1;
    const betaRisk = betaPrep * 25;
    const ER = this.state.earningsRisk * 25;
    const devRisk = this.state.stddev * 25;
    const sentiRisk = this.state.sentiment.sentiment.bearishPercent * 25;
    const rrRiskScore = betaRisk + ER + devRisk + sentiRisk;
    return (
      <div>
        <img src={this.state.logo} alt="" />
        {this.state.sentiment.buzz.buzz > 0.5 && <p>HOT IN THE MARKET</p>}
        <p>{this.state.profile.companyName}</p>
        <p>{this.state.profile.description}</p>
        <p>{this.state.profile.exchange}</p>
        <p>{this.state.profile.industry}</p>
        <p>{this.state.profile.sector}</p>
        <p>
          r//r Risk Score (based on 100 points, higher being more risky):{' '}
          {Math.round(rrRiskScore)}
        </p>
        <p>1 Year Return: {this.state.year1return * 100}%</p>

        <form onSubmit={this.handleAddToPortfolio}>
          <button type="submit">Add To Portfolio</button>
        </form>
      </div>
    );
  }
}

export default StockInfoRisk;
