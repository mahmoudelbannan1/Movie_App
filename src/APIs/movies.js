import { axiosInstance } from "./config";

export const movieList = (language) => {
  return axiosInstance.get(`/movie/popular?language=${language}`)
}