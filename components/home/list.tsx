import React, { useEffect, useState } from "react"
import { Dimensions, Pressable, ScrollView, View } from "react-native"
import { moviesGenres } from "@/constant/genre"
import { ShowType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { cn, getGenre, IMAGE_URL } from "@/lib/utils"
import useDiscover from "@/hooks/useDiscover"

import Skeleton from "../ui/skeleton"
import StyledText from "../ui/text"
import StyledView from "../ui/view"

export default function List() {
  const [category, setCategory] = useState(28)
  const { data, refetch, isLoading } = useDiscover(category)

  // useEffect(() => {
  //   refetch()
  // }, [category])
  return (
    <StyledView className="h-full py-10">
      <StyledText className="px-6 text-2xl">Categories</StyledText>
      <StyledView className="my-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {moviesGenres.map((genre, i) => {
            const isActive = genre.id === category
            return (
              <Pressable
                onPress={() => setCategory(genre.id)}
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
      </StyledView>

      <View style={{ flex: 1 }}>
        {data ? (
          <FlashList
            data={data}
            renderItem={({ item, index }) => (
              <ShowCard item={item} index={index} />
            )}
            horizontal
            estimatedItemSize={120}
            // onLoad={({}) => (
            //   <Skeleton className="h-48 w-44 bg-input opacity-60" />
            // )}
            estimatedListSize={{
              height: 300,
              width: Dimensions.get("screen").width,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
        {!isLoading ? (
          <Skeleton className="h-64 w-44 bg-input opacity-60" />
        ) : null}
      </View>
    </StyledView>
  )
}

function ShowCard({ item, index }: { item: ShowType; index: number }) {
  const genres = getGenre(item.genre_ids, "movie")

  return (
    <StyledView
      className={cn(
        "relative mx-3  w-44 overflow-hidden rounded-lg",
        index === 0 ? "ml-6" : ""
      )}
    >
      <Image
        source={{ uri: IMAGE_URL + item.backdrop_path }}
        style={{
          width: "100%",
          height: 200,
          borderBottomWidth: 2,
        }}
        className=""
      />
      <LinearGradient
        colors={["rgba(23, 23, 23, 0.8)", "rgba(23, 23, 23, 1)", "transparent"]}
        style={{
          width: "100%",
          height: 50,
          zIndex: 10,
          opacity: 0.5,
          position: "absolute",
          top: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <StyledView className="absolute right-1 top-1 z-10 flex-row items-center gap-1 bg-transparent">
        <Ionicons name="star" color={"orange"} />
        <StyledText className="text-orange-400">
          {item.vote_average.toFixed(1)}
        </StyledText>
      </StyledView>

      <StyledView className="bg-input px-3 py-2">
        <StyledText numberOfLines={1}>{item.title}</StyledText>
        <View className="flex-row items-center gap-1">
          {genres.map((el, i) => (
            <StyledText key={el.id} className="text-xs text-muted-foreground">
              {el.name} {i === 0 ? "•" : ""}
            </StyledText>
          ))}
        </View>
      </StyledView>
    </StyledView>
  )
}
