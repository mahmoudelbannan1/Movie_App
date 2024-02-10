import { axiosInstance } from "./config";

export const movieDetails = (id, language) => {
  
  return axiosInstance.get(`/movie/${id}?language=${language}`)
}