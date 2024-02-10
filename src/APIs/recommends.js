import { axiosInstance } from "./config";

export const recommends = (id, language) => {
  return axiosInstance.get(`/movie/${id}/recommendations?language=${language}`)
}