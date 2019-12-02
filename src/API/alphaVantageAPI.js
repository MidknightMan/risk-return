import axios from 'axios';
import avKey from '../keys4.js';

export const getDeviation = symbol => {
  return axios
    .get(
      `https://www.alphavantage.co/query?function=BBANDS&symbol=${symbol}&interval=weekly&time_period=5&series_type=close&nbdevup=2&nbdevdn=2&apikey=${avKey}`
    )
    .then(({ data }) => {
      const bandData = data['Technical Analysis: BBANDS'];
      const bandArr = Object.keys(bandData).map(key => {
        // return { [key]: bandData[key] };
        return bandData[key];
      });

      const bandVar = bandArr.map(datapoint => {
        return (
          (datapoint['Real Upper Band'] - datapoint['Real Lower Band']) /
          datapoint['Real Middle Band']
        );
      });
      const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      const varianceRisk = arrAvg(bandVar);
      return varianceRisk;
    })
    .catch(console.log);
};
