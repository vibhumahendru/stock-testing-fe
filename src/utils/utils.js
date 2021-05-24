export const relDiff = (a, b) => {
  if (a && b && (a.toFixed(2) != b.toFixed(2))) {
    return (100 * Math.abs((b - a) / (a))).toFixed(2);
  }
  return 0
};


export const isProfitable = (investment, valuation) => {
  if (investment == valuation) {
    return 2
  }
  if (investment < valuation) {
    return 1;
  }
  return 0;
};
