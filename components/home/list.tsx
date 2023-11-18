import React, { useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import { moviesGenres } from "@/constant/genre"

import { cn } from "@/lib/utils"
import useDiscover from "@/hooks/useDiscover"

import StyledText from "../ui/text"
import StyledView from "../ui/view"

export default function List() {
  const [category, setCategory] = useState("Action")
  const { data } = useDiscover(category)
  return (
    <StyledView className="flex-1 py-10">
      <View>
        <StyledText className="px-6 text-2xl">Categories</StyledText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="my-6"
        >
          {moviesGenres.map((genre, i) => {
            const isActive = genre.name === category
            return (
              <Pressable
                onPress={() => setCategory(genre.name)}
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

        <StyledView
          className={cn("h-10 w-10 animate-pulse rounded-md bg-primary")}
        />
        <View className="h-10 w-10 animate-pulse bg-primary"></View>
      </View>
    </StyledView>
  )
}
