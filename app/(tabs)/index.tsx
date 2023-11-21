import React from "react"
import { SafeAreaView, ScrollView } from "react-native"
import { Image } from "expo-image"

import { useShowsList } from "@/hooks/useShows"
import StyledText from "@/components/ui/text"
import StyledView from "@/components/ui/view"
import colors from "@/components/colors"
import Carousel from "@/components/home/carousel"
import ShowList from "@/components/home/show-list"

export default function HomePage() {
  const [trendShow, actionsShow, comedyShow] = useShowsList()

  return (
    <SafeAreaView style={{ backgroundColor: colors.tintColor, flex: 1 }}>
      <StyledView className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* <StyledText className="">Home Page</StyledText> */}
          <StyledView className="mb-4 flex-row gap-4 px-6">
            <Image
              source={{
                uri: "https://64.media.tumblr.com/f62a7f0ac3354825b00c51b164d03404/bd9fd777d224e7d6-67/s640x960/3880c033c1ca7b035a43b1d25fda7ff1cc29fbe0.pnj",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            />
            <StyledView className="gap-1">
              <StyledText className="text-xl font-bold">Hello, Zoro</StyledText>
              <StyledText className="text-muted-foreground">
                Let's stream your favorite movie
              </StyledText>
            </StyledView>
          </StyledView>
          <Carousel />
          <StyledView style={{}}>
            <ShowList
              data={trendShow.data!}
              isLoading={trendShow.isLoading}
              title="Trending"
            />
            <ShowList
              data={actionsShow.data!}
              isLoading={actionsShow.isLoading}
              title="Actions"
            />
            <ShowList
              data={comedyShow.data!}
              isLoading={comedyShow.isLoading}
              title="Comedy"
            />
          </StyledView>
        </ScrollView>
      </StyledView>
    </SafeAreaView>
  )
}
