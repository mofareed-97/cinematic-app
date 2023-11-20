import { Pressable, useColorScheme } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Tabs } from "expo-router"

import colors from "@/components/colors"
import { IconSparkles } from "@/components/iconc"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={25} style={{ marginBottom: 0 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          backgroundColor: colors.tintColor,
          borderTopWidth: 0,
          height: 100,
        },
        // tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          // title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="ai"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Pressable className="-top-5 items-center justify-center rounded-full border border-muted-foreground p-4">
              <IconSparkles fill={color} className="h-10 w-10" />
            </Pressable>
          ),
        }}
      /> */}
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
