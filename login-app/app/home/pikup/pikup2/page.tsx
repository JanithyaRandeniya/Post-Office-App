import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

// Platform-specific imports
let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== "web") {
  try {
    const Maps = require("expo-maps");
    MapView = Maps.ExpoMap;
    Marker = Maps.MapMarker;
  } catch (error) {
    console.log("expo-maps not available:", error);
  }
}

export default function PickupAddress() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Get parcel/order info from route

  const initialPostal =
    Array.isArray(params.postalCode) ? params.postalCode[0] : params.postalCode || "";
  const [postalCode, setPostalCode] = useState<string>(initialPostal);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState({
    latitude: parseFloat(String(params.latitude || "")) || 6.9271,
    longitude: parseFloat(String(params.longitude || "")) || 79.8612,
  });

  const searchLocation = async () => {
    const code = String(postalCode || "").trim();
    if (!code) {
      Alert.alert("Error", "Please enter a postal code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(code)}&country=Sri+Lanka&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMarker({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        Alert.alert("Not Found", "No location found for this postal code");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to search location");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill marker if postal code exists
  useEffect(() => {
    if (postalCode && !params.latitude) {
      searchLocation();
    }
  }, [postalCode, params.latitude]);

  const handleConfirm = () => {
    router.push({
      pathname: "/home/pikup/pikup2/review-order/page",
      params: {
        postalCode,
        latitude: marker.latitude,
        longitude: marker.longitude,
      },
    });
  };

  const renderMap = () => {
    if (Platform.OS === "web") {
      return (
        <iframe
          title="Pickup Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            marker.longitude - 0.01
          },${marker.latitude - 0.01},${
            marker.longitude + 0.01
          },${marker.latitude + 0.01}&layer=mapnik&marker=${
            marker.latitude
          },${marker.longitude}`}
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      );
    } else if (MapView) {
      return (
        <MapView
          style={{ flex: 1 }}
          initialCamera={{
            center: marker,
            zoom: 14,
            pitch: 0,
            bearing: 0,
          }}
        >
          <Marker
            coordinate={marker}
            draggable
            onDragEnd={(e: any) => setMarker(e.nativeEvent.coordinate)}
            title="Pickup Location"
            description="Drag to adjust location"
          />
        </MapView>
      );
    } else {
      return (
        <View style={styles.mapFallback}>
          <MaterialIcons name="error-outline" size={50} color="#013391ff" />
          <Text style={styles.fallbackText}>Maps not available</Text>
          <Text style={styles.fallbackSubtext}>
            Please install expo-maps package and configure API keys
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Pickup Address</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter postal code (e.g., 10000)"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="number-pad"
          maxLength={5}
        />
        <TouchableOpacity onPress={searchLocation} style={styles.searchButton} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#C32A2A" /> :
          <MaterialIcons name="search" size={24} color="#C32A2A" />}
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>{renderMap()}</View>

      <View style={styles.locationInfo}>
        <MaterialIcons name="location-pin" size={20} color="#cf0f0fff" />
        <Text style={styles.locationText}>
          Latitude: {marker.latitude.toFixed(4)}, Longitude: {marker.longitude.toFixed(4)}
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Pickup Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a4c7e7ff" },
  topBar: { flexDirection: "row", alignItems: "center", paddingTop: 50, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: "#b7cce0ff", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  backButton: { padding: 4 },
  title: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#333" },
  placeholder: { width: 28 },
  searchContainer: { flexDirection: "row", alignItems: "center", margin: 20, backgroundColor: "#FFF", borderRadius: 12, paddingHorizontal: 16, height: 56, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5 },
  searchInput: { flex: 1, fontSize: 16, color: "#333", paddingVertical: 8 },
  searchButton: { padding: 8 },
  mapContainer: { flex: 1, marginHorizontal: 20, borderRadius: 12, overflow: "hidden", backgroundColor: "#E2E8F0" },
  mapFallback: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F1F5F9" },
  fallbackText: { fontSize: 18, fontWeight: "600", color: "#374151", marginTop: 12 },
  fallbackSubtext: { fontSize: 14, color: "#6B7280", textAlign: "center", marginTop: 8, paddingHorizontal: 20 },
  locationInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 16, backgroundColor: "#d0d9ecff", marginHorizontal: 20, marginTop: 12, borderRadius: 8 },
  locationText: { fontSize: 14, color: "#374151", marginLeft: 8 },
  bottomBar: { padding: 20, backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#E5E7EB" },
  confirmBtn: { backgroundColor: "#4b4dd8ff", paddingVertical: 16, borderRadius: 12, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5 },
  confirmText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
});
