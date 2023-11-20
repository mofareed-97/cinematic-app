import React from "react"
import { Dimensions, Pressable, ScrollView, View } from "react-native"
import { ShowType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { cn, getGenre, IMAGE_URL } from "@/lib/utils"

import { ShowCard } from "../show-card"
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
