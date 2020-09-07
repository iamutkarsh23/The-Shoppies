import axios, { AxiosResponse } from "axios";
import { API_ENDPOINT, API_TIMEOUT } from "../constants";

export const searchMovieBySearchQuery = async (
  movieStr: string,
  page: number
) => {
  let response: AxiosResponse<any>;

  console.log(movieStr);
  const API_URL = new URL(API_ENDPOINT);

  API_URL.searchParams.append("page", page.toString());
  API_URL.searchParams.append("s", movieStr);
  try {
    const config = { timeout: API_TIMEOUT };
    response = await axios.get(API_URL.href, config);
  } catch (e) {
    response = e.response;
  }
  return response;
};

export const searchMovieById = async (id: string) => {
  let response: AxiosResponse<any>;

  const API_URL = new URL(API_ENDPOINT);

  API_URL.searchParams.append("i", id);
  try {
    const config = { timeout: API_TIMEOUT };
    response = await axios.get(API_URL.href, config);
  } catch (e) {
    response = e.response;
  }
  return response;
};
