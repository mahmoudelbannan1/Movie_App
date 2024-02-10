import { axiosInstance } from "./config";

export const moviePage = (page, language) => {
  return axiosInstance.get(`/movie/popular?page=${page}&language=${language}`)
}