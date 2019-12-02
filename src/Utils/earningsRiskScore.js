const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const earningsRiskScore = earningsArr => {
  const variances = [];
  earningsArr.forEach(earning => {
    variances.push(earning.estimate - earning.actual);
  });
  console.log(variances);
  const averageVar = arrAvg(variances);
  console.log(averageVar);
  return averageVar;
};

export default earningsRiskScore;
