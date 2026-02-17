import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Platform,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

let MapView: any = null;
let Marker: any = null;
let Polygon: any = null;

if (Platform.OS !== "web") {
  try {
    const Maps = require("expo-maps");
    MapView = Maps.ExpoMap;
    Marker = Maps.MapMarker;
    Polygon = Maps.MapPolygon;
  } catch (error) {
    console.log("expo-maps not available:", error);
  }
} else {
  try {
    MapView = require("react-leaflet").MapContainer;
    Marker = require("react-leaflet").Marker;
    Polygon = require("react-leaflet").Polygon;
    // CSS is loaded via CDN in index.html - don't import here
  } catch (error) {
    console.log("react-leaflet not available:", error);
  }
}

export default function DriverWithMap() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const dummyDriver = {
    name: "Nimal Perera",
    phone: "0771234567",
    vehicleNumber: "WP KA 1234",
    License: "20010010101010",
    vehicleType: "Van",
    insured: true,
    ownership: "Private",
    latitude: 6.9843,
    longitude: 81.0559,
  };

  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [insured, setInsured] = useState(false);
  const [ownership, setOwnership] = useState("Private");
  const [pickupLocations, setPickupLocations] = useState("");

  const [marker, setMarker] = useState({
    latitude: parseFloat(String(params.latitude || dummyDriver.latitude)),
    longitude: parseFloat(String(params.longitude || dummyDriver.longitude)),
  });

  const dummyDrivers = [
    { name: "Kamal Silva", latitude: 6.9850, longitude: 81.0565 },
    { name: "Sunil Fernando", latitude: 6.9835, longitude: 81.0540 },
    { name: "Navin Perera", latitude: 6.9850, longitude: 81.0565 },
    { name: "Fernando", latitude: 6.9835, longitude: 81.0540 },
  ];

  const pickupCoords = [
    { latitude: 6.9848, longitude: 81.0560, name: "Haliela" },
    { latitude: 6.9855, longitude: 81.0575, name: "Demodara" },
  ];

  const kolabaPolygon = [
    { latitude: 6.9850, longitude: 81.0540 },
    { latitude: 6.9860, longitude: 81.0570 },
    { latitude: 6.9830, longitude: 81.0580 },
    { latitude: 6.9820, longitude: 81.0550 },
  ];

  useEffect(() => {
    setDriverName(dummyDriver.name);
    setDriverPhone(dummyDriver.phone);
    setLicenseNumber(dummyDriver.License);
    setVehicleNumber(dummyDriver.vehicleNumber);
    setVehicleType(dummyDriver.vehicleType);
    setInsured(dummyDriver.insured);
    setOwnership(dummyDriver.ownership);
  }, []);

  const handleNext = () => {
    router.push({
      pathname: "/home/pikup/pikup2/page",
      params: {
        driverName,
        driverPhone,
        licenseNumber,
        vehicleNumber,
        vehicleType,
        insured: insured ? "true" : "false",
        ownership,
        latitude: marker.latitude,
        longitude: marker.longitude,
        pickupLocations,
      },
    });
  };

  const renderMap = () => {
    if (Platform.OS === "web") {
      if (!MapView) {
        return (
          <View style={styles.mapFallback}>
            <MaterialIcons name="error-outline" size={50} color="#C32A2A" />
            <Text style={styles.fallbackText}>Maps not available</Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
              Install: npm install react-leaflet leaflet
            </Text>
          </View>
        );
      }

      const { MapContainer, TileLayer, Marker, Polygon } = require("react-leaflet");
      return (
        <MapContainer
          center={[marker.latitude, marker.longitude]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[marker.latitude, marker.longitude]} />
          {dummyDrivers.map((d, i) => (
            <Marker key={i} position={[d.latitude, d.longitude]} />
          ))}
          {pickupCoords.map((p, i) => (
            <Marker key={`pickup-${i}`} position={[p.latitude, p.longitude]} />
          ))}
          <Polygon
            positions={kolabaPolygon.map((c) => [c.latitude, c.longitude])}
            pathOptions={{ color: "red", fillColor: "rgba(255,0,0,0.3)" }}
          />
        </MapContainer>
      );
    } else if (MapView) {
      return (
        <MapView
          style={{ flex: 1 }}
          initialCamera={{
            center: marker,
            zoom: 14,
          }}
        >
          <Marker
            coordinate={marker}
            draggable
            onDragEnd={(e: any) => setMarker(e.nativeEvent.coordinate)}
            title="Main Driver"
            description="Drag to adjust"
            pinColor="red"
          />
          {dummyDrivers.map((d, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: d.latitude, longitude: d.longitude }}
              title={d.name}
              pinColor="blue"
            />
          ))}
          {pickupCoords.map((p, i) => (
            <Marker
              key={`pickup-${i}`}
              coordinate={{ latitude: p.latitude, longitude: p.longitude }}
              title={p.name}
              pinColor="green"
            />
          ))}
          <Polygon
            coordinates={kolabaPolygon}
            fillColor="rgba(255,0,0,0.3)"
            strokeColor="red"
            strokeWidth={2}
          />
        </MapView>
      );
    } else {
      return (
        <View style={styles.mapFallback}>
          <MaterialIcons name="error-outline" size={50} color="#C32A2A" />
          <Text style={styles.fallbackText}>Maps not available</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#212529" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Driver & Map</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
        <ScrollView style={{ flex: 1, paddingRight: 5 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Driver Information</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={driverName} onChangeText={setDriverName} />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={driverPhone}
            onChangeText={setDriverPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Text style={styles.label}>NIC Number</Text>
          <TextInput
            style={styles.input}
            value={licenseNumber}
            onChangeText={setLicenseNumber}
            placeholder="Enter NIC Number"
          />

          <Text style={styles.label}>Vehicle Number</Text>
          <TextInput style={styles.input} value={vehicleNumber} onChangeText={setVehicleNumber} />

          <Text style={styles.label}>Vehicle Type</Text>
          <TextInput style={styles.input} value={vehicleType} onChangeText={setVehicleType} />

          <Text style={styles.label}>Vehicle Ownership</Text>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <TouchableOpacity
              style={[
                styles.ownershipButton,
                ownership === "Private" && styles.ownershipSelected,
              ]}
              onPress={() => setOwnership("Private")}
            >
              <Text
                style={[
                  styles.ownershipText,
                  ownership === "Private" && styles.ownershipTextSelected,
                ]}
              >
                Private
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ownershipButton,
                ownership === "Post Office" && styles.ownershipSelected,
              ]}
              onPress={() => setOwnership("Post Office")}
            >
              <Text
                style={[
                  styles.ownershipText,
                  ownership === "Post Office" && styles.ownershipTextSelected,
                ]}
              >
                Post Office
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Pickup Locations</Text>
          <TextInput
            style={styles.input}
            value={pickupLocations}
            onChangeText={setPickupLocations}
            placeholder="Badulla,HaliEla,Demodara,Uduwara,Ella"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={styles.label}>Insured</Text>
            <Switch
              value={insured}
              onValueChange={setInsured}
              trackColor={{ true: "#1a4bb6ff", false: "#697bacff" }}
              thumbColor={insured ? "#fff" : "#f4f3f4"}
            />
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Nearby Drivers</Text>
          {dummyDrivers.map((d, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={styles.nearbyDriver}>
                {d.name} - ({d.latitude.toFixed(4)}, {d.longitude.toFixed(4)})
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ flex: 1, marginLeft: 5, borderRadius: 12, overflow: "hidden" }}>
          <Image
            source={require("../../../assets/images/p.jpeg")}
            style={{
              width: 100,
              height: 80,
              borderRadius: 12,
              marginBottom: 10,
            }}
            resizeMode="cover"
          />
          <Text style={{ marginBottom: 10 }}>Pickup Locations...</Text>
          {renderMap()}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a4c7e7ff" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#a4c7e7ff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  topTitle: { fontSize: 20, fontWeight: "700", color: "#111" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, color: "#111" },
  label: { fontSize: 15, color: "#111", fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 15,
  },
  ownershipButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4b4dd8ff",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: "center",
  },
  ownershipSelected: { backgroundColor: "#5f80daff" },
  ownershipText: { color: "#141f88ff", fontWeight: "600" },
  ownershipTextSelected: { color: "#FFF" },
  nearbyDriver: { fontSize: 14, color: "#333" },
  footer: { padding: 20, backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#EEE" },
  nextButton: {
    height: 55,
    borderRadius: 10,
    backgroundColor: "#4464beff",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  mapFallback: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F1F5F9" },
  fallbackText: { fontSize: 18, fontWeight: "600", color: "#374151", marginTop: 12 },
});