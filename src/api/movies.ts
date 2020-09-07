import axios, { AxiosResponse } from "axios";
import {API_ENDPOINT} from '../constants';


export const searchMovie = async (movieStr: string, page: number) => {
  let response: AxiosResponse<any>;

  console.log(movieStr);
  const API_URL = new URL(API_ENDPOINT);

  API_URL.searchParams.append("page", page.toString());
  API_URL.searchParams.append("s", movieStr);
  try {
    response = await axios.get(API_URL.href,
    );
  } catch (e) {
    response = e.response;
  }
  return response;
};
