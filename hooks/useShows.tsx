import React from "react"
import { Text, View } from "react-native"
import { ShowType } from "@/types"
import { useQueries, useQuery } from "@tanstack/react-query"

import { client } from "@/lib/client"

const queryKeys = {
  trend: ["trend"],
  action: ["action"],
  comedy: ["comedy"],
  search: ["search"],
}
export function useShowsList() {
  return useQueries({
    queries: [
      {
        queryKey: queryKeys.trend,
        queryFn: async (): Promise<ShowType[]> => {
          try {
            const { data } = await client("/trending/movie/day?language=en-US")

            return data.results
          } catch (err: any) {
            throw new Error(err)
          }
        },
      },
      {
        queryKey: queryKeys.action,
        queryFn: async (): Promise<ShowType[]> => {
          try {
            const { data } = await client(
              "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28"
            )

            return data.results
          } catch (err: any) {
            throw new Error(err)
          }
        },
      },
      {
        queryKey: queryKeys.comedy,
        queryFn: async (): Promise<ShowType[]> => {
          try {
            const { data } = await client(
              "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35"
            )

            return data.results
          } catch (err: any) {
            throw new Error(err)
          }
        },
      },
    ],
  })
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.search,
    queryFn: async (): Promise<ShowType[]> => {
      console.log("running...")
      try {
        const { data } = await client(
          `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
        )

        return data.results
      } catch (err: any) {
        throw new Error(err)
      }
    },
    enabled: !!query,
  })
}
