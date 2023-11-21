import { Pressable, View } from "react-native"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import { ShowType } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

import { cn, getGenre, IMAGE_URL } from "@/lib/utils"

import StyledText from "./ui/text"
import StyledView from "./ui/view"

interface ShowCardProps {
  item: ShowType
  index: number
  isVertical?: boolean
}
export function ShowCard({ item, index, isVertical = false }: ShowCardProps) {
  const media_type = item.media_type === "tv" ? "tv" : "movie"
  const genres = getGenre(item.genre_ids, media_type)

  const router = useRouter()

  return (
    <Pressable
      className={cn(
        "relative mx-3 overflow-hidden rounded-lg",
        index === 0 && !isVertical ? "ml-6" : ""
        // isVertical ? "w-full" : "w-40"
      )}
      style={{ width: wp(44), height: wp(65) }}
      // onPress={() => router.push("/details/133", params:{ media_type }})}
      onPress={() =>
        router.push({ pathname: `/details/${item.id}`, params: { media_type } })
      }
    >
      <Image
        source={{ uri: IMAGE_URL + item.poster_path }}
        style={{
          width: wp(44),
          height: wp(65),
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

      <LinearGradient
        colors={[
          "transparent",
          // "rgba(23, 23, 23, 0.8)",
          "hsl(222.2, 84%, 4.9%)",
          "hsl(222.2, 84%, 4.9%)",
        ]}
        style={{
          width: "100%",
          height: 60,
          zIndex: 10,
          opacity: 0.8,
          position: "absolute",
          bottom: 0,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <StyledView className="absolute bottom-0  left-0 z-10 w-full bg-transparent px-3 py-2">
        <StyledText numberOfLines={1}>
          {item.title || item.original_title || item.name}
        </StyledText>
        <View className="flex-row items-center gap-1">
          {genres.map((el, i) => (
            <StyledText key={el.id} className="text-xs text-muted-foreground">
              {el.name} {i === 0 ? "•" : ""}
            </StyledText>
          ))}
        </View>
      </StyledView>
    </Pressable>
  )
}
