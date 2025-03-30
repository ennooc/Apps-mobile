import { Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 40 : 20,
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => {
        const isStar = i === 0;
        const content = isStar ? "*" : "0".repeat(i * 2 - 1);
        return (
          <ThemedText
            key={i}
            style={{
              fontFamily: "SpaceMono",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {content}
          </ThemedText>
        );
      })}
    </ThemedView>
  );
}
