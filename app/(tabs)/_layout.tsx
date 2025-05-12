import { Stack, Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { MapPin, Menu, QrCode  } from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        router.replace("/LoginScreen");
      } else {
        setCheckingSession(false);
      }
    };
    checkAuth();
  }, []);

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.accent,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: theme.surface,
              borderTopColor: theme.border,
            },
            default: {
              backgroundColor: theme.surface,
              borderTopColor: theme.border,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menú",
            tabBarIcon: ({ color }) => <Menu size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Ubicaciones",
            tabBarIcon: ({ color }) => <MapPin size={24} color={color} />,
          }}
        />
        x
        <Tabs.Screen
          name="explore"
          options={{
            title: "Scan",
            tabBarIcon: ({ color }) => <QrCode size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
