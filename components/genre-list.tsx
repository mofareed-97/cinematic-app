import React from "react"
import { Pressable, ScrollView } from "react-native"
import { moviesGenres } from "@/constant/genre"

import { cn } from "@/lib/utils"

import StyledText from "./ui/text"

export default function GenreList() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {moviesGenres.map((genre, i) => {
        //   const isActive = genre.id === category
        const isActive = false
        return (
          <Pressable
            //   onPress={() => setCategory(genre.id)}
            key={genre.id}
            className={cn(
              "rounded-lg px-6 py-2",
              i === 0 ? "ml-6" : "",
              isActive ? "bg-input" : ""
            )}
          >
            <StyledText className={cn(isActive ? "text-primary" : "")}>
              {genre.name}
            </StyledText>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}
