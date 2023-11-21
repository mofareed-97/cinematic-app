import React, { useEffect, useState } from "react"
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"

import { useDebounce } from "@/hooks/useDebounce"
import { useSearch } from "@/hooks/useShows"
import StyledText from "@/components/ui/text"
import StyledView from "@/components/ui/view"
import colors from "@/components/colors"
import GenreList from "@/components/genre-list"
import { ShowCard } from "@/components/show-card"

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("")
  const debouncedValue = useDebounce(searchValue, 500)
  const { data, isLoading, refetch } = useSearch(debouncedValue)

  useEffect(() => {
    if (debouncedValue) refetch()
  }, [debouncedValue])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.tintColor }}>
      <StyledView className="flex-1 py-4">
        <StyledView className="relative mx-4 rounded-full border border-muted-foreground">
          <TextInput
            value={searchValue}
            onChangeText={(val) => setSearchValue(val)}
            className="p-4 pl-14 text-white placeholder:text-muted-foreground"
            placeholder="Search"
          />
          <Ionicons
            name="search"
            color={"gray"}
            className="absolute top-1/2 -translate-y-1/2 pl-4"
            size={20}
          />
        </StyledView>

        {data ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <StyledView className="my-10 flex-row flex-wrap justify-center">
              {data.map((item, index) => {
                if (!item.backdrop_path) return
                return (
                  <StyledView key={item.id} className="mb-6">
                    <ShowCard item={item} index={index} isVertical />
                  </StyledView>
                )
              })}
            </StyledView>
          </ScrollView>
        ) : null}
        {/* {data ? (
          <FlashList
            data={data}
            renderItem={({ item, index }) => {
              return <ShowCard item={item} index={index} />
            }}
            estimatedItemSize={120}
            estimatedListSize={{
              height: 250,
              width: Dimensions.get("screen").width,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null} */}
      </StyledView>
    </SafeAreaView>
  )
}
