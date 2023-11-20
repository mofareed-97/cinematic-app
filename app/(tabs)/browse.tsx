import React, { useState } from "react"
import { SafeAreaView, TextInput } from "react-native"

import StyledText from "@/components/ui/text"
import StyledView from "@/components/ui/view"
import colors from "@/components/colors"
import GenreList from "@/components/genre-list"

export default function BrowsePage() {
  const [genreId, setGenreId] = useState(28)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.tintColor }}>
      <StyledView className="py-4">
        <GenreList genreId={genreId} setGenreId={setGenreId} />
      </StyledView>
    </SafeAreaView>
  )
}
