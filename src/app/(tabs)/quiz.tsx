import { StyleSheet } from "react-native";

import { Fonts } from "@/shared/constants/theme";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import ParallaxScrollView from "@/shared/ui/parallax-scroll-view";
import { ThemedText } from "@/shared/ui/themed-text";
import { ThemedView } from "@/shared/ui/themed-view";

export default function QuizScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="questionmark.circle.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          퀴즈
        </ThemedText>
      </ThemedView>
      <ThemedText>퀴즈 기능이 곧 추가될 예정입니다.</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
