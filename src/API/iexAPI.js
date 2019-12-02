import axios from 'axios';
import iexKey from '../keys3';

export const getCompanyLogo = symbol => {
  return axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=${iexKey}`
    )
    .then(({ data }) => {
      return data.url;
    });
};

export const getCompanyProfile = symbol => {
  return axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${iexKey}`
    )
    .then(({ data }) => {
      return data;
    });
};

export const getKeyStats = symbol => {
  return axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${iexKey}`
    )
    .then(({ data }) => {
      return data;
    });
};

export const getStandardDev = symbol => {
  return axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/indicator/stddev?range=1y&token=${iexKey}`
    )
    .then(({ data }) => {
      const devs = data.indicator[0][0];
      console.log(devs);
      return devs;
    })
    .catch(console.dir);
};
