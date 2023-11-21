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

export interface ShowDetailsType {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Genre {}

export interface CreditsType {
  id: number
  cast: CastType[]
  crew: CastType[]
}

export interface CastType {
  adult: boolean
  gender: number
  id: number
  name: string
  original_name: string
  popularity: number
  profile_path: null | string
  cast_id?: number
  character?: string
  credit_id: string
  order?: number
  job?: string
}
