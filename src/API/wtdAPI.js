import axios from 'axios';
import wtdKey from '../keys2';

export const getSymbolCompany = symbol => {
  return axios
    .get(
      `https://api.worldtradingdata.com/api/v1/stock_search?search_term=${symbol}&search_by=symbol,name&limit=50&page=1&api_token=${wtdKey}`
    )
    .then(({ data }) => {
      return data;
    });
};
