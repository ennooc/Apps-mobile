import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Animated,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

const ActionButton = ({
  icon,
  label,
  onPress,
  animateIcon,
  color = "#222",
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
  animateIcon?: boolean;
  color?: string;
}) => {
  const scale = useState(new Animated.Value(1))[0];
  const iconY = useState(new Animated.Value(0))[0];
  const iconRotate = useState(new Animated.Value(0))[0];
  const [iconColor, setIconColor] = useState(color);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();

    if (animateIcon) {
      const jumpColor = icon === "map-pin" ? "red" : "#007aff";
      setIconColor(jumpColor);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(iconY, {
            toValue: -10,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(iconY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(iconRotate, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(iconRotate, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setTimeout(() => setIconColor(color), 500);
      });
    }
  };

  const rotate = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ flex: 1 }}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Animated.View
          style={{ transform: [{ translateY: iconY }, { rotate }] }}
        >
          <Feather
            name={icon}
            size={20}
            color={iconColor}
            style={styles.icon}
          />
        </Animated.View>
        <Animated.Text style={styles.label}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se puede acceder a la ubicación.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleSaveLocation = async () => {
    if (!location) return;

    const newEntry: LocationData = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: Date.now(),
    };

    try {
      const existing = await AsyncStorage.getItem("locations");
      const locations: LocationData[] = existing ? JSON.parse(existing) : [];
      locations.push(newEntry);
      await AsyncStorage.setItem("locations", JSON.stringify(locations));
      Alert.alert("Guardado", "Ubicación guardada exitosamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la ubicación.");
    }
  };

  const updateLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado");
      return;
    }

    const updatedLocation = await Location.getCurrentPositionAsync({});
    setLocation(updatedLocation);
  };

  if (!location) return null;

  const region: Region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Tu ubicación actual" />
      </MapView>
      <View style={styles.buttonContainerLeft}>
        <ActionButton
          icon="map-pin"
          label="Ubicación actual"
          onPress={handleSaveLocation}
          animateIcon
        />
      </View>
      <View style={styles.buttonContainerRight}>
        <ActionButton
          icon="refresh-ccw"
          label="Actualizar"
          onPress={updateLocation}
          animateIcon
        />
      </View>
      <View style={styles.buttonContainerTopRight}>
        <ActionButton
          icon="list"
          label="Ver ubicaciones"
          onPress={() => {
            router.push({
              pathname: "/locations",
              params: {
                latitude: location.coords.latitude.toString(),
                longitude: location.coords.longitude.toString(),
                timestamp: location.timestamp.toString(),
              },
            });
          }}
          animateIcon
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainerLeft: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 100 : 40,
    left: 20,
    zIndex: 9999,
  },
  buttonContainerRight: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 100 : 40,
    right: 20,
    zIndex: 9999,
  },
  buttonContainerTopRight: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 30,
    right: 20,
    zIndex: 9999,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  label: {
    color: "#222",
    fontSize: 15,
    fontWeight: "500",
  },
  icon: {
    marginRight: 8,
  },
});
