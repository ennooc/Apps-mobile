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
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleNext = () => {
    if (!email || !name || !surname || !termsAccepted) {
      Alert.alert("Error", "Completa todos los campos y acepta los términos");
      return;
    }
    router.push("/VerificationScreen");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={[styles.title, { color: theme.text }]}>Registro</Text>

      <TextInput
        placeholder="Correo electrónico"
        style={[styles.input, { borderBottomColor: theme.border, color: theme.text }]}
        placeholderTextColor={theme.muted}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Nombre(s)"
        style={[styles.input, { borderBottomColor: theme.border, color: theme.text }]}
        placeholderTextColor={theme.muted}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Apellido(s)"
        style={[styles.input, { borderBottomColor: theme.border, color: theme.text }]}
        placeholderTextColor={theme.muted}
        value={surname}
        onChangeText={setSurname}
      />

      <View style={styles.switchContainer}>
        <Switch
          value={termsAccepted}
          onValueChange={setTermsAccepted}
          trackColor={{ false: "#ccc", true: theme.accent }}
        />
        <Text style={{ color: theme.text, marginLeft: 10 }}>
          Acepto los <Text style={{ color: theme.accent }}>Términos</Text> y <Text style={{ color: theme.accent }}>Privacidad</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: termsAccepted ? theme.primary : "#ccc" }]}
        onPress={handleNext}
        disabled={!termsAccepted || !email || !name || !surname}
      >
        <Text style={[styles.buttonText, { color: theme.primaryText }]}>Siguiente</Text>
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
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
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
