import axios from "axios";

const {
  NODE_ENV: environment,
  REACT_APP_API_URL_PROD: prodApiUrl,
  REACT_APP_API_URL_DEV: devApiUrl
} = process.env;

export const baseUrl = environment === "development" ? devApiUrl : prodApiUrl;

export default axios.create({
  baseURL: baseUrl,
  timeout: 8000
});
