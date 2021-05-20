const axios = require('axios');

const prod = {
 url: {
  API_URL: 'https://myapp.herokuapp.com',
  API_URL_USERS: 'https://myapp.herokuapp.com/users'}
};
const dev = {
 url: {
  API_URL: 'http://127.0.0.1:8000'
 }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

var axiosInstance = axios.create({
  baseURL: config.url.API_URL,
})

export const getPortfolios = () => {
  return axiosInstance.get('/portfolio/')
}

export const getTickers = () => {
  return axiosInstance.get('/ticker/')
}

export const getTickerData = (symbol) => {
  return axiosInstance.get(`http://api.marketstack.com/v1/eod?access_key=ce8415abdd92171bffe3063e2361ecd4& symbols=${symbol}&limit=500&sort=ASC`)
}

export const createPortfolio = (data) => {

  let payload = {
    name:data.name,
    note:data.notes,
  }
  return axiosInstance.post(`/portfolio/`, payload)
}

export const createPosition = (data) => {
  return axiosInstance.post(`/position/`, data)
}

export const getPositionsForPortfolio = (portfolioId) => {
  return axiosInstance.get(`/position/?portfolio=${portfolioId}`)
}
export const getPortfolioDetails = (portfolioId) => {
  return axiosInstance.get(`/portfolio/${portfolioId}/`)
}

export const getLatestTickerData = (symbol) => {
  return axiosInstance.get(`http://api.marketstack.com/v1/eod/latest?access_key=ce8415abdd92171bffe3063e2361ecd4&symbols=${symbol}`)
}

export const getTickerByDate = (date, symbol) => {
  return axiosInstance.get(`http://api.marketstack.com/v1/eod/${date}?access_key=ce8415abdd92171bffe3063e2361ecd4&symbols=${symbol}`)
}
