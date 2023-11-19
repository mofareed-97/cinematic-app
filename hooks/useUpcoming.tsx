import { ShowType, TMDBType } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/client"

const keys = {
  getUpcoming: ["upcoming"],
}

export default function useUpcoming() {
  return useQuery({
    queryKey: keys.getUpcoming,
    queryFn: async (): Promise<ShowType[]> => {
      try {
        const { data } = await client(
          "/movie/upcoming?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
        )
        return data.results
      } catch (err: any) {
        throw new Error(err)
      }
    },
  })
}
