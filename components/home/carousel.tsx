import React from "react"
import { FlatList, Text, View } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"

import { cn, IMAGE_URL } from "@/lib/utils"
import useUpcoming from "@/hooks/useUpcoming"

import StyledText from "../ui/text"
import StyledView from "../ui/view"

export default function Carousel() {
  const { data } = useUpcoming()

  return (
    <StyledView>
      {/* <StyledText></StyledText> */}

      <View className="py-10">
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                className={cn(
                  "relative mr-10 overflow-hidden rounded-2xl",
                  index === 0 ? "ml-6" : ""
                )}
              >
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(23, 23, 23, 0.8)",
                    "rgba(23, 23, 23, 1)",
                  ]}
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
                    height: 200,
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
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </StyledView>
  )
}
