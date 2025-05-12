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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";

export default function PhoneLoginScreen() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleContinue = async () => {
    if (phone.length < 10) {
      Alert.alert("Error", "Ingresa un número válido");
      return;
    }
    if (!consent) {
      Alert.alert("Aviso", "Debes aceptar los términos y condiciones.");
      return;
    }
    await AsyncStorage.setItem("user", JSON.stringify({ phone }));
    router.push("/RegisterScreen");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Image
          source={require("../assets/images/icono_Logo.png")}
          style={styles.logoImage}
        />

        <Text style={[styles.logo, { color: theme.logo }]}>Smart Park</Text>
        <Text style={[styles.heading, { color: theme.text }]}>
          Ingresa tu número de teléfono
        </Text>
        <Text style={[styles.subtext, { color: theme.muted }]}>
          Te enviaremos un código de acceso
        </Text>

        <TextInput
          placeholder="Número de teléfono"
          style={[
            styles.input,
            { borderBottomColor: theme.border, color: theme.text },
          ]}
          placeholderTextColor={theme.muted}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <View style={styles.termsRow}>
          <Switch value={consent} onValueChange={setConsent} />
          <Text style={[styles.termsText, { color: theme.text }]}>
            {" "}
            Acepto los
            <Text style={{ color: theme.accent }}> Términos </Text>y{" "}
            <Text style={{ color: theme.accent }}>Privacidad</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.whatsappButton,
            { backgroundColor: theme.logo, borderColor: theme.logo },
          ]}
          onPress={handleContinue}
        >
          <FontAwesome
            name="whatsapp"
            size={18}
            color={theme.background}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.buttonText, { color: theme.background }]}>
            Continuar con WhatsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smsButton, { borderColor: theme.logo }]}
          onPress={handleContinue}
        >
          <Text style={[styles.buttonText, { color: theme.logo }]}>
            Continuar con SMS
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  inner: {
    width: "100%",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  subtext: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 24,
  },
  input: {
    borderBottomWidth: 1.5,
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  termsText: {
    fontSize: 13,
    marginLeft: 10,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  smsButton: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  logoImage: {
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
  },  
});
