import axios from 'axios';
import finnhubKey from '../finnhubKey';
import earningsRiskScore from '../Utils/earningsRiskScore';

export const getSentiment = symbol => {
  return axios
    .get(
      `https://finnhub.io/api/v1/news-sentiment?symbol=${symbol}&token=${finnhubKey}`
    )
    .then(({ data }) => {
      if (JSON.stringify(data) === JSON.stringify({}) || !data) {
        // returns a default sentiment score
        return {
          buzz: {
            articlesInLastWeek: 49,
            buzz: 0.49,
            weeklyAverage: 100
          },
          companyNewsScore: 0.5,
          sectorAverageBullishPercent: 0.5,
          sectorAverageNewsScore: 0.5,
          sentiment: {
            bearishPercent: 0.5,
            bullishPercent: 0.5
          },
          symbol: 'UBER'
        };
      }
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
      return score;
    })
    .catch(console.log);
};
