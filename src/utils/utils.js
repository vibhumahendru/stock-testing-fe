export const relDiff = (a, b) => {
  if (a && b && (a.toFixed(2) != b.toFixed(2))) {
    return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
  }
  return 0
};


export const isProfitable = (investment, valuation) => {
  if (investment.toFixed(2) <= valuation.toFixed(2)) {
    return true;
  }
  return false;
};
