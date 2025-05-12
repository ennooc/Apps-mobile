import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";

export default function MenuScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const logout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["user", "hasSeenIntro"]);
          router.replace("/OnboardingScreen");
        },
      },
    ]);
  };
  

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Menú</Text>

      <TouchableOpacity
        style={[styles.outlineBtn, { borderColor: theme.accent }]}
        onPress={() => router.push("/locations")}
      >
        <FontAwesome name="map-marker" size={16} color={theme.accent} style={styles.icon} />
        <Text style={[styles.outlineText, { color: theme.accent }]}>Ver ubicaciones guardadas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.outlineBtn, { borderColor: theme.danger }]}
        onPress={logout}
      >
        <FontAwesome name="sign-out" size={16} color={theme.danger} style={styles.icon} />
        <Text style={[styles.outlineText, { color: theme.danger }]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
  },
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  outlineText: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 10,
  },
});
