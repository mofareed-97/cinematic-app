import React from "react"
import { SafeAreaView } from "react-native"

import StyledText from "@/components/ui/text"
import StyledView from "@/components/ui/view"
import colors from "@/components/colors"
import Carousel from "@/components/home/carousel"
import List from "@/components/home/list"

export default function HomePage() {
  return (
    <SafeAreaView style={{ backgroundColor: colors.tintColor, flex: 1 }}>
      <StyledView className="flex-1">
        {/* <StyledText className="">Home Page</StyledText> */}
        <Carousel />
        <List />
      </StyledView>
    </SafeAreaView>
  )
}
