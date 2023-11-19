import React from "react"
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native"
import { ShowType } from "@/types"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { cn, IMAGE_URL } from "@/lib/utils"
import useUpcoming from "@/hooks/useUpcoming"

import Skeleton from "../ui/skeleton"
import StyledText from "../ui/text"
import StyledView from "../ui/view"

export default function Carousel() {
  const { data, isLoading } = useUpcoming()

  return (
    <StyledView className="min-h-[200px] pb-4 pt-8">
      {/* <StyledText></StyledText> */}

      {isLoading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "mx-3 h-52 w-[300px] overflow-hidden rounded-lg bg-input opacity-60",
                index === 0 ? "ml-6" : ""
              )}
            />
          ))}
        </ScrollView>
      ) : null}
      {data ? (
        <FlashList
          data={data}
          renderItem={({ item, index }) => {
            return <CarouselCard item={item} index={index} />
          }}
          horizontal
          estimatedItemSize={20}
          estimatedListSize={{
            height: 210,
            width: Dimensions.get("screen").width,
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : null}
    </StyledView>
  )
}

function CarouselCard({ item, index }: { item: ShowType; index: number }) {
  return (
    <View
      className={cn(
        "relative mr-10 overflow-hidden rounded-2xl",
        index === 0 ? "ml-6" : ""
      )}
    >
      <LinearGradient
        colors={["transparent", "rgba(23, 23, 23, 0.8)", "rgba(23, 23, 23, 1)"]}
        style={{
          width: "100%",
          height: 150,
          zIndex: 10,
          opacity: 0.7,
          position: "absolute",
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Image
        source={{ uri: IMAGE_URL + item.backdrop_path }}
        style={{
          width: 300,
          height: 208,
        }}
      />

      <View className="absolute bottom-0 z-20 px-4 py-4">
        <StyledText numberOfLines={2} className="text-lg font-bold">
          {item.title}
        </StyledText>
        {item.release_date ? (
          <StyledText className="mt-1 opacity-70">
            On{" "}
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(item.release_date))}
          </StyledText>
        ) : null}
      </View>
    </View>
  )
}
