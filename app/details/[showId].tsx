import React, { useLayoutEffect } from "react"
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"

import { IMAGE_URL } from "@/lib/utils"
import { useShowDetails } from "@/hooks/useShows"
import StyledText from "@/components/ui/text"
import StyledView from "@/components/ui/view"

export default function ShowDetailsPage() {
  const { showId, media_type } = useLocalSearchParams<{
    showId: string
    media_type: "tv" | "movie"
  }>()
  const { data, isLoading } = useShowDetails({ id: showId, media_type })
  const navigation = useNavigation()
  const router = useRouter()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerLeft: () => (
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center  pr-[1px]"
        >
          <Ionicons name="chevron-back" color={"white"} size={28} />
        </Pressable>
      ),

      headerRight: () => (
        <Pressable className="h-12 w-12 items-center justify-center pr-[1px]">
          <Ionicons name="heart-outline" color={"white"} size={28} />
        </Pressable>
      ),
    })
  }, [])

  return (
    <StyledView className="flex-1">
      <ScrollView className="">
        <LinearGradient
          colors={[
            // "rgba(23, 23, 23, 0.8)",
            "hsl(222.2, 84%, 4.9%)",
            "hsl(222.2, 84%, 4.9%)",
            "transparent",
          ]}
          style={{
            width: "100%",
            height: 200,
            zIndex: 10,
            opacity: 0.5,
            position: "absolute",
            top: 0,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <StyledView className="relative">
          <Image
            source={{ uri: IMAGE_URL + data?.backdrop_path }}
            style={{
              width: "100%",
              height: 400,
              borderBottomWidth: 2,
            }}
            className=""
          />
          <LinearGradient
            colors={[
              "transparent",
              "hsl(222.2, 84%, 0%)",
              "hsl(222.2, 84%, 0%)",
            ]}
            style={{
              width: Dimensions.get("window").width,
              height: 50,
              position: "absolute",
              bottom: 0,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            // className="absolute bottom-0"
          />
        </StyledView>

        <StyledView className="relative z-10 px-6">
          <LinearGradient
            colors={[
              "hsl(222.2, 84%, 0%)",
              "hsl(222.2, 84%, 0%)",
              "transparent",
            ]}
            style={{
              width: Dimensions.get("window").width,
              height: 100,
              position: "absolute",
              top: 0,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            // className="absolute bottom-0"
          />
          <StyledText className="mb-8 text-center text-2xl font-bold">
            {data?.title}
          </StyledText>

          <StyledText className="mb-2 text-lg font-medium">
            Story Line
          </StyledText>
          <StyledText className="font-medium leading-6 text-muted-foreground">
            {data?.overview}
          </StyledText>
        </StyledView>
      </ScrollView>
    </StyledView>
  )
}
