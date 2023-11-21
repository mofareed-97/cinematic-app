import React, { useLayoutEffect } from "react"
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native"
import { ShowType } from "@/types"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"

import { cn, IMAGE_URL, toHoursAndMinutes } from "@/lib/utils"
import { useCasts, useShowDetails } from "@/hooks/useShows"
import StyledText from "@/components/ui/text"
import StyledView from "@/components/ui/view"
import { IconLoading } from "@/components/iconc"

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

      headerRight: () =>
        data ? (
          <Pressable className="h-12 w-12 items-center justify-center pr-[1px]">
            <Ionicons name="heart-outline" color={"white"} size={28} />
          </Pressable>
        ) : null,
    })
  }, [])

  if (isLoading) {
    return (
      <StyledView className="flex-1 items-center justify-center">
        <IconLoading className="animate-spin text-white" />
      </StyledView>
    )
  }

  if (!data && !isLoading) {
    return (
      <StyledView className="flex-1 items-center justify-center">
        <StyledText>Failed to find the movie</StyledText>
      </StyledView>
    )
  }

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

        <StyledView className="relative z-10">
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
          <StyledView className="px-6">
            <StyledView className="mb-3 flex-row items-center gap-4">
              <StyledView className="flex-row items-center gap-2">
                <Ionicons name="star" color={"orange"} size={18} />
                <StyledText className="">
                  {data?.vote_average.toFixed(1)}
                </StyledText>
              </StyledView>
              <StyledText>•</StyledText>
              <StyledText>
                {data?.release_date
                  ? new Date(data?.release_date).getFullYear()
                  : null}
              </StyledText>
              {data?.runtime ? (
                <>
                  <StyledText>•</StyledText>
                  <StyledText>{toHoursAndMinutes(data.runtime)} </StyledText>
                </>
              ) : null}
            </StyledView>
            <StyledText className="text-3xl font-bold">
              {data?.title}
            </StyledText>
            {data?.tagline ? (
              <StyledText className="mt-4 font-bold italic text-muted-foreground">
                “{data?.tagline}”
              </StyledText>
            ) : null}

            <StyledView className="my-6 flex-row items-center gap-3">
              {data?.genres.splice(0, 3).map((el) => (
                <StyledView
                  key={el.id}
                  className="rounded-full bg-input px-4 py-2"
                >
                  <StyledText>{el.name}</StyledText>
                </StyledView>
              ))}
            </StyledView>

            <StyledText className="font-medium leading-6 text-muted-foreground">
              {data?.overview}
            </StyledText>
          </StyledView>

          <Casts id={data!.id.toString()} media_type={media_type} />
        </StyledView>
      </ScrollView>
    </StyledView>
  )
}

function Casts({
  id,
  media_type = "movie",
}: {
  id: string
  media_type?: ShowType["media_type"]
}) {
  const { data, isLoading } = useCasts({ id, media_type })
  return (
    <StyledView className="my-6">
      <StyledText className="px-6 text-xl font-bold">Cast</StyledText>
      <StyledView className="my-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data
            ? data?.map((cast, index) => {
                return (
                  <StyledView
                    key={cast.id}
                    className={cn(
                      "mr-4 items-center",
                      index === 0 ? "ml-6" : ""
                    )}
                  >
                    <Image
                      source={{ uri: IMAGE_URL + cast.profile_path }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                      }}
                    />
                    <StyledText className="mt-1 text-xs">
                      {cast.name.length > 12
                        ? cast.name.substring(0, 12) + "..."
                        : cast.name}
                    </StyledText>
                  </StyledView>
                )
              })
            : null}
        </ScrollView>
      </StyledView>
    </StyledView>
  )
}
