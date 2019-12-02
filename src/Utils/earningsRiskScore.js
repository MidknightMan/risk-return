const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const earningsRiskScore = earningsArr => {
  if (earningsArr.length === 0) {
    return 0.1;
  }
  const variances = [];
  earningsArr.forEach(earning => {
    variances.push(earning.estimate - earning.actual);
  });

  const averageVar = arrAvg(variances);

  return averageVar;
};

export default earningsRiskScore;
