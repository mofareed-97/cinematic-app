import React from "react"
import { Dimensions, Pressable, ScrollView, View } from "react-native"
import { ShowType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { cn, getGenre, IMAGE_URL } from "@/lib/utils"

import Skeleton from "../ui/skeleton"
import StyledText from "../ui/text"
import StyledView from "../ui/view"

interface IProps {
  data: ShowType[]
  isLoading: boolean
  title: string
}
export default function ShowList({ data, isLoading, title }: IProps) {
  return (
    <StyledView className="my-1 py-3">
      <StyledText className="mb-6 px-6 text-2xl font-bold text-muted-foreground">
        {title}
      </StyledText>
      <View style={{ flex: 1 }}>
        {data ? (
          <FlashList
            data={data}
            renderItem={({ item, index }) => (
              <ShowCard item={item} index={index} />
            )}
            horizontal
            estimatedItemSize={120}
            estimatedListSize={{
              height: 250,
              width: Dimensions.get("screen").width,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}

        {isLoading ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className={cn(
                  "mx-3 h-64 w-44 overflow-hidden rounded-lg bg-input opacity-60",
                  index === 0 ? "ml-6" : ""
                )}
              />
            ))}
          </ScrollView>
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
        "relative mx-3 w-44 overflow-hidden rounded-lg",
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
