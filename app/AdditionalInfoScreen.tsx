import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function AdditionalInfoScreen() {
  const [hasPayment, setHasPayment] = useState(false);
  const [hasVehicle, setHasVehicle] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasCompletedInfo", "true");
    router.replace("/(tabs)");
  };

  const isActive = hasPayment || hasVehicle;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Bienvenido</Text>
      <Text style={[styles.description, { color: theme.text }]}>
        Para operar correctamente, por favor:
      </Text>

      <TouchableOpacity
        style={[styles.card, { borderColor: theme.border }]}
        onPress={() => setHasPayment(true)}
      >
        <FontAwesome name="credit-card" size={18} color={theme.text} />
        <Text style={[styles.cardText, { color: theme.text }]}>
          Agregar método de pago
        </Text>
        <FontAwesome name="chevron-right" size={16} color={theme.muted} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { borderColor: theme.border }]}
        onPress={() => setHasVehicle(true)}
      >
        <FontAwesome name="car" size={18} color={theme.text} />
        <Text style={[styles.cardText, { color: theme.text }]}>
          Agregar vehículo
        </Text>
        <FontAwesome name="chevron-right" size={16} color={theme.muted} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleContinue}>
        <Text style={[styles.skip, { color: theme.accent }]}>No por ahora</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isActive ? theme.primary : "#ccc",
          },
        ]}
        onPress={handleContinue}
        disabled={!isActive}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isActive ? theme.primaryText : "#888" },
          ]}
        >
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    marginBottom: 36,
    fontSize: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  skip: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
