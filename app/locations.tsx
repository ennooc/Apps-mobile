import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Stack } from "expo-router";

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export default function LocationsScreen() {
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem("locations");
        if (data) setLocations(JSON.parse(data));
      } catch (err) {
        Alert.alert("Error", "No se pudieron cargar las ubicaciones.");
      }
    })();
  }, []);

  const handleClearAll = async () => {
    Alert.alert("Confirmar", "¿Eliminar todas las ubicaciones?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("locations");
          setLocations([]);
        },
      },
    ]);
  };

  const handleOpenMaps = (lat: number, lng: number) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}`,
    });
    if (url) Linking.openURL(url);
  };

  const handleExportCSV = async () => {
    const csv = locations
      .map(
        (l) =>
          `${l.latitude},${l.longitude},${new Date(l.timestamp).toISOString()}`
      )
      .join("\n");

    const path = FileSystem.documentDirectory + "locations.csv";
    await FileSystem.writeAsStringAsync(path, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(path);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Ubicaciones" }} />
      <View style={styles.inner}>
        <Text style={styles.title}>Ubicaciones guardadas</Text>
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                />
              </MapView>
              <Text style={styles.coord}>
                Latitud: {item.latitude.toFixed(5)}
              </Text>
              <Text style={styles.coord}>
                Longitud: {item.longitude.toFixed(5)}
              </Text>
              <Text style={styles.time}>
                Fecha: {new Date(item.timestamp).toLocaleString()}
              </Text>
              <TouchableOpacity
                onPress={() => handleOpenMaps(item.latitude, item.longitude)}
              >
                <Text style={styles.link}>Ver en mapa</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text>No hay ubicaciones aún.</Text>}
        />
        {locations.length > 0 && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.softButton, styles.redButton]}
              onPress={handleClearAll}
            >
              <Text style={styles.redText}>Eliminar todo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.softButton, styles.blueButton]}
              onPress={handleExportCSV}
            >
              <Text style={styles.blueText}>Exportar CSV</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
  },
  map: {
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  coord: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  link: {
    marginTop: 6,
    color: "#007bff",
    fontWeight: "bold",
  },
  actions: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 10,
    left: 20,
    right: 20,
  },
  softButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  redButton: {
    backgroundColor: "#ffe5e5",
  },
  blueButton: {
    backgroundColor: "#e6f0ff",
  },
  redText: {
    color: "#cc0000",
    fontWeight: "600",
  },
  blueText: {
    color: "#0057d9",
    fontWeight: "600",
  },

  clearText: {
    color: "#fff",
    fontWeight: "600",
  },
  exportText: {
    color: "#fff",
    fontWeight: "600",
  },
});
