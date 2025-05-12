import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [checkingSession, setCheckingSession] = useState(true);
  const [initialRoute, setInitialRoute] = useState<
    "OnboardingScreen" | "LoginScreen" | "RegisterScreen" | "AdditionalInfoScreen" | "(tabs)"
  >();

  useEffect(() => {
    const checkState = async () => {
      const seenIntro = await AsyncStorage.getItem("hasSeenIntro");
      const user = await AsyncStorage.getItem("user");
      const hasRegistered = await AsyncStorage.getItem("hasRegistered");
      const hasCompletedInfo = await AsyncStorage.getItem("hasCompletedInfo");
  
      if (!seenIntro) {
        setInitialRoute("OnboardingScreen");
      } else if (!user) {
        setInitialRoute("LoginScreen");
      } else if (!hasRegistered) {
        setInitialRoute("RegisterScreen");
      } else if (!hasCompletedInfo) {
        setInitialRoute("AdditionalInfoScreen");
      } else {
        setInitialRoute("(tabs)");
      }
  
      setCheckingSession(false);
    };
  
    if (loaded) checkState();
  }, [loaded]);
  
    

  useEffect(() => {
    if (loaded && !checkingSession) {
      SplashScreen.hideAsync();
    }
  }, [loaded, checkingSession]);

  if (!loaded || checkingSession || !initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="OnboardingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" options={{ title: "Inicio de sesión" }} />
        <Stack.Screen name="RegisterScreen" options={{ title: "Registro" }} />
        <Stack.Screen name="AdditionalInfoScreen" options={{ title: "Información adicional" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="locations" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
