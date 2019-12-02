import axios from 'axios';
import tiingoKey from '../keys';

export const getCompanyList = query => {
  return axios
    .get(
      `https://api.tiingo.com/tiingo/utilities/search?query=${query}&token=${tiingoKey}`
    )
    .then(({ data }) => {
      return data;
    });
};
