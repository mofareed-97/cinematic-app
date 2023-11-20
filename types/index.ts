export interface TMDBType {
  page: number
  results: ShowType[]
  total_pages: number
  total_results: number
}

export interface ShowType {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: OriginalLanguage
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  name: string
  media_type: "movie" | "tv"
  video: boolean
  vote_average: number
  vote_count: number
}

export enum OriginalLanguage {
  En = "en",
  Zh = "zh",
}
