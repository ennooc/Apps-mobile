import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export const ActionButton = ({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Feather name={icon} size={20} color="#222" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007aff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    marginRight: 8,
  },
});
