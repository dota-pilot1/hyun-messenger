import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/shared/constants/theme";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";
import { HapticTab } from "@/shared/ui/haptic-tab";
import { IconSymbol } from "@/shared/ui/icon-symbol";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "퀴즈",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="questionmark.circle.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
