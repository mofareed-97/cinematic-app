import { moviesGenres, seriesGenres } from "@/constant/genre"
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const IMAGE_URL = "https://image.tmdb.org/t/p/original"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getGenre(ids: number[], mediaType?: "tv" | "movie") {
  let genreResults: { id: number; name: string }[] = []
  ids.forEach((id) => {
    if (mediaType === "tv") {
      return seriesGenres.filter((genre) => {
        if (genre.id === id) {
          genreResults.push(genre)
        }
      })
    }
    return moviesGenres.filter((genre) => {
      if (genre.id === id) {
        genreResults.push(genre)
      }
    })
  })

  if (genreResults.length >= 3) {
    return genreResults.slice(0, 2)
  }
  return genreResults
}
