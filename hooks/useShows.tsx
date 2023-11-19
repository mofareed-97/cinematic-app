import React from "react"
import { Text, View } from "react-native"
import { ShowType } from "@/types"
import { useQueries } from "@tanstack/react-query"

import { client } from "@/lib/client"

const queryKeys = {
  trend: ["trend"],
  action: ["action"],
  comedy: ["comedy"],
}
export default function useShows() {
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
