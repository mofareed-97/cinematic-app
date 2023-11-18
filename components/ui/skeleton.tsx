import React from "react"
import { Text, View } from "react-native"
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"

import { cn } from "@/lib/utils"

export default function Skeleton({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("animate-pulse rounded-md bg-input", className)}
      {...props}
    />
  )
}
