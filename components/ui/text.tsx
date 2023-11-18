import React from "react"
import { Text, TextProps } from "react-native"

import { cn } from "@/lib/utils"

export default function StyledText({ className, ...props }: TextProps) {
  return <Text className={cn("text-foreground", className)} {...props} />
}
