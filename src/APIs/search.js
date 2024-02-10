import { axiosInstance } from "./config";

export const search = (name, language) => {
  return axiosInstance.get(`/search/movie?query=${name}&language=${language}`)
}

export const searchPages = (name, pageNumber, language) => {
  return axiosInstance.get(`/search/movie?query=${name}&page=${pageNumber}&language=${language}`)
}