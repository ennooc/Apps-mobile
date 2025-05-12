// file: app/explore.tsx
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as Camera from "expo-camera";
import { CameraView } from "expo-camera";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useCameraPermissions } from "expo-camera";

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const colorScheme = useColorScheme();
  const [permission, requestPermission] = useCameraPermissions()
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        const permissionResponse = await requestPermission();
        setHasPermission(permissionResponse.granted);
      } else {
        setHasPermission(true);
      }
    })();
  }, [permission]);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    setScannedData(data);
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>        
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{ color: theme.text, marginTop: 10 }}>Solicitando permiso de cámara...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>        
        <Text style={{ color: theme.danger }}>No se permitió el acceso a la cámara</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>      
      {!scanned && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          style={StyleSheet.absoluteFillObject}
          facing="back"
        />
      )}

      {scanned && (
        <View style={[styles.overlay, { backgroundColor: theme.surface, borderColor: theme.border }]}>          
          <Text style={[styles.text, { color: theme.text }]}>Escaneado:</Text>
          <Text style={[styles.text, { color: theme.accent }]}>{scannedData}</Text>
          <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => setScanned(false)}>
            <Text style={[styles.buttonText, { color: theme.primaryText }]}>Escanear otro</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 80,
    padding: 16,
    borderRadius: 12,
    width: "90%",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "SpaceMono",
  },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});