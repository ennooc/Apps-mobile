import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Slide = ({ title, subtitle, image }: { title: string; subtitle: string; image: any }) => (
  <View style={styles.slide}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

export default function OnboardingScreen() {
  const router = useRouter();

  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    router.replace("/LoginScreen");
  };

  return (
    <Onboarding
      onDone={finishOnboarding}
      onSkip={finishOnboarding}
      nextLabel="Siguiente"
      skipLabel="Saltar"
      pages={[
        {
          backgroundColor: "#fff",
          image: <Slide
            image={require("../assets/images/pass_1.jpg")}
            title="Bienvenido a GoTicket"
            subtitle="Paga parquímetros desde tu celular, sin efectivo ni tickets."
          />, title: "", subtitle: ""
        },
        {
          backgroundColor: "#fff",
          image: <Slide
            image={require("../assets/images/pass_2.jpg")}
            title="Pago fácil"
            subtitle="Agrega saldo, escanea el QR y paga en segundos."
          />, title: "", subtitle: ""
        },
        {
          backgroundColor: "#fff",
          image: <Slide
            image={require("../assets/images/pass_3.jpg")}
            title="Rápido y sin contacto"
            subtitle="Olvídate del ticket, tu teléfono es tu comprobante."
          />, title: "", subtitle: ""
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width: width * 0.9,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
