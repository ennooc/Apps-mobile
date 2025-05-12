import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function VerificationScreen() {
  const [code, setCode] = useState("");
  const fakeCode = "123456";
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleVerify = async () => {
    if (code === fakeCode) {
      await AsyncStorage.setItem("user", JSON.stringify({ verified: true }));
      await AsyncStorage.setItem("hasCompletedInfo", "true");
      router.replace("/AdditionalInfoScreen");
    } else {
      Alert.alert("Código incorrecto", "Intenta nuevamente");
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={[styles.title, { color: theme.text }]}>Verifica tu número</Text>

      <TextInput
        placeholder="Ingresa el código"
        style={[styles.input, { borderBottomColor: theme.border, color: theme.text }]}
        placeholderTextColor={theme.muted}
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleVerify}
      >
        <Text style={[styles.buttonText, { color: theme.primaryText }]}>Verificar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 24,
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