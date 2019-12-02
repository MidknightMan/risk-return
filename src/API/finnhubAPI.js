import axios from 'axios';
import finnhubKey from '../finnhubKey';
import earningsRiskScore from '../Utils/earningsRiskScore';

export const getSentiment = symbol => {
  return axios
    .get(
      `https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=${finnhubKey}`
    )
    .then(({ data }) => {
      return data;
    });
};

export const getEarningsScore = symbol => {
  return axios
    .get(
      `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${finnhubKey}`
    )
    .then(({ data }) => {
      const score = earningsRiskScore(data);
      console.log(score);
      return score;
    });
};
