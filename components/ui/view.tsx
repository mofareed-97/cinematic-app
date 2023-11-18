import React from "react"
import { View, ViewProps } from "react-native"

import { cn } from "@/lib/utils"

export default function StyledView({ className, ...props }: ViewProps) {
  return <View className={cn("bg-background", className)} {...props} />
}
