import { ShowType, TMDBType } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/client"

const keys = {
  getDiscover: ["discover"],
}

export default function useDiscover(genre: string) {
  return useQuery({
    queryKey: keys.getDiscover,
    queryFn: async (): Promise<ShowType[]> => {
      try {
        const { data } = await client(
          "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
        )

        return data.results
      } catch (err: any) {
        console.log(err)
        throw new Error(err)
      }
    },
  })
}
