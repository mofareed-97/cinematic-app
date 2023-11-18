import React, { useEffect, useState } from "react"
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native"
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
  const { data, refetch } = useDiscover(category)

  // useEffect(() => {
  //   refetch()
  // }, [category])
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

        <StyledView style={{ flexGrow: 1 }}>
          <FlashList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <StyledView
                  className={cn(
                    "relative mx-3 w-44 overflow-hidden rounded-lg bg-input",
                    index === 0 ? "ml-6" : ""
                  )}
                >
                  <ShowCard item={item} />
                </StyledView>
              )
            }}
            horizontal
            estimatedItemSize={120}
            estimatedListSize={{
              height: 200,
              width: Dimensions.get("screen").width,
            }}
            // onLoad={({}) => (
            // <Skeleton className="h-48 w-44 bg-input opacity-60" />
            // )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        </StyledView>
      </View>
    </StyledView>
  )
}

function ShowCard({ item }: { item: ShowType }) {
  const genres = getGenre(item.genre_ids, "movie")

  return (
    <>
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
    </>
  )
}
