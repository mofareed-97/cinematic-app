import axios from "axios"

export const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer " + process.env.EXPO_PUBLIC_TMDB_API!,
    Accept: "application/json",
  },
})
