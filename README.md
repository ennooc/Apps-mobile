# 🌐 Location Tracker & 🎄 ASCII Tree App

App móvil hecha con **React Native + Expo**, que incluye dos ejercicios:

- 📍 **Tracking de ubicación**: guarda, visualiza, exporta y abre ubicaciones geográficas.
- 🎄 **Árbol de Navidad ASCII**: imprime en pantalla un árbol con alineación precisa, usando el código más corto posible.

---

## ✨ Características

### 📍 Location Tracker
- Guarda la ubicación GPS actual (lat, lng, timestamp).
- Muestra mapa en vivo con ubicación actual.
- Lista de ubicaciones previas con mini mapas.
- Botones animados con feedback visual.
- Exporta historial como archivo `.csv`.
- Abre coordenadas en Google Maps o Apple Maps.

### 🎄 Árbol de Navidad
- Usa caracteres `*` y `0` para formar un árbol.
- Centrado visualmente en la pantalla.
- Compatible en iOS y Android.
- Tipografía monoespaciada para alineación perfecta.

---

## 🚀 Tecnologías usadas

- `expo-location`: acceso a GPS.
- `react-native-maps`: render de mapas y marcadores.
- `expo-router`: navegación entre pantallas.
- `AsyncStorage`: persistencia local.
- `expo-file-system` + `expo-sharing`: exportar CSV.
- `expo-linking`: abrir coordenadas en apps externas.
- `react-native-reanimated`: animaciones.
- `SpaceMono`: fuente monospace para el árbol.

---

## 📁 Estructura

```
app/
 ├── index.tsx         # Mapa actual y botones
 ├── locations.tsx     # Historial de ubicaciones
 ├── explore.tsx       # Árbol navideño en ASCII
components/
 ├── ActionButton.tsx  # Botón animado reutilizable
```

---

## 🥪 Cómo correr el proyecto

```bash
npm install
npx expo start
```

🔐 Requiere permisos de ubicación.

---

## ✅ Autor

Creado por **Enoc Aguilar** como parte de un reto técnico móvil con geolocalización y lógica visual.

---

## 📲 Demo

Disponible para pruebas en **Expo Go** o como build con **EAS**.
