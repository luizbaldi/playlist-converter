import axios from "axios";

export const baseUrl = "http://localhost:4000";

export default axios.create({
  baseURL: baseUrl,
  timeout: 8000
});
