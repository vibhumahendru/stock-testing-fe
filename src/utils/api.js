const axios = require('axios');

const MARKETSTACK_API_KEY='8c6e30c9297578771a66130e8cacba05'

const prod = {
 url: {
  API_URL: 'https://myapp.herokuapp.com',
  API_URL_USERS: 'https://myapp.herokuapp.com/users'}
};
const dev = {
 url: {
  // API_URL: 'http://127.0.0.1:8000'
  API_URL: 'https://backtest-portfolio.herokuapp.com/'
 }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

let token = localStorage.getItem('token')

var axiosInstance = axios.create({
  baseURL: config.url.API_URL
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = `Token ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error),
);

var noHeaderAxios = axios.create({
  baseURL: config.url.API_URL,
})

export const getPortfolios = () => {
  return axiosInstance.get('/portfolio/')
}

export const getTickers = () => {
  return axiosInstance.get('/ticker/')
}

export const getTickerData = (symbol) => {
  return noHeaderAxios.get(`http://api.marketstack.com/v1/eod?access_key=${MARKETSTACK_API_KEY}& symbols=${symbol}&limit=500&sort=ASC`)
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
  return noHeaderAxios.get(`http://api.marketstack.com/v1/eod/latest?access_key=${MARKETSTACK_API_KEY}&symbols=${symbol}`, {headers:{}})
}

export const getTickerByDate = (date, symbol) => {
  return noHeaderAxios.get(`http://api.marketstack.com/v1/eod/${date}?access_key=${MARKETSTACK_API_KEY}&symbols=${symbol}`)
}

export const deletePosition = (p) => {
  return axiosInstance.delete(`/position/${p.id}/`)
}

export const deletePortfolio = (id) => {
  return axiosInstance.delete(`/portfolio/${id}/`)
}

export const logoutUser = (id) => {
  return axiosInstance.post(`/auth/token/logout/`)
}

export const getToken = (data) => {
  return noHeaderAxios.post(`/auth/token/login/`, data)
}

export const createNewUser = (data) => {
  return noHeaderAxios.post(`auth/users/`, data)
}
