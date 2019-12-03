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
    currentPortfolio: [],
    errorHandler: null
  };

  componentDidMount() {
    return Promise.all([
      iex.getCompanyLogo(this.props.symbol),
      iex.getCompanyProfile(this.props.symbol),
      finnhub.getSentiment(this.props.symbol),
      finnhub.getEarningsScore(this.props.symbol),
      iex.getKeyStats(this.props.symbol),
      av.getDeviation(this.props.symbol)
    ])
      .then(([url, profileObj, sentimentObj, score, stats, stddev]) => {
        if (!stats || !stddev || !score || !sentimentObj) {
          this.setState({ errorHandler: 'data missing', isLoading: true });
        }
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
      })
      .catch(err => {
        console.log(err);
        this.setState({ errorHandler: err, isLoading: false });
      });
  }

  getRiskScore = () => {
    if (!this.state.sentiment.sentiment) {
      const betaPrep = this.state.beta - 1;
      const betaRisk = betaPrep * 33;
      const ER = this.state.earningsRisk * 33;
      const devRisk = this.state.stddev * 34;
      const rrRiskScore = betaRisk + ER + devRisk;
      return Math.round(rrRiskScore);
    }
    const betaPrep = this.state.beta - 1;
    const betaRisk = betaPrep * 25;
    const ER = this.state.earningsRisk * 25;
    const devRisk = this.state.stddev * 25;
    const sentiRisk = this.state.sentiment.sentiment.bearishPercent * 25;
    const rrRiskScore = betaRisk + ER + devRisk + sentiRisk;
    return Math.round(rrRiskScore);
  };

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

    const rrRiskScore = this.getRiskScore();

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
    if (this.state.errorHandler) {
      return <p>Sorry, this security is not yet supported.</p>;
    }

    return (
      <div id="stockInfoContainer">
        <div id="stockLogo">
          <img src={this.state.logo} alt="" />
        </div>
        {this.state.sentiment.buzz.buzz > 0.5 && (
          <p id="stockTrending">{`<<<TRENDING>>>`}</p>
        )}
        <p id="stockName">Name: {this.state.profile.companyName}</p>
        <p id="stockDesc">Description: {this.state.profile.description}</p>
        <p id="stockExch">Exchange: {this.state.profile.exchange}</p>
        <p id="stockInd">Industry: {this.state.profile.industry}</p>
        <p id="stockSector">Sector: {this.state.profile.sector}</p>
        <p id="riskScore">
          r//r Risk Score (based on 100 points, higher being more risky):{' '}
          {this.getRiskScore()}
        </p>
        <p id="stockReturn">
          1 Year Return: {Math.round(this.state.year1return * 100)}%
        </p>

        <form onSubmit={this.handleAddToPortfolio} id="addToPortfolio">
          <button type="submit" id="submitButton3">
            Add To Portfolio
          </button>
        </form>
      </div>
    );
  }
}

export default StockInfoRisk;
