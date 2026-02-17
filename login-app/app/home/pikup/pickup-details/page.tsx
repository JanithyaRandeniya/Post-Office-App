import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PickupDetails: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Pickup Details</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Map */}
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSEnUVXj8ImE9lhzpgOcJae7oebylrsMIsLOxJa2bCgg_vdL94hictPOpE10VzJFJqtukXrkzfojBHejek4BjsIb2UVZwsnTEatGUB9Om8IsrHAmvNpmUslsSIbEL04w6qFPdaBHCGNhvOO3rAO8ZxMbdBoLE55yIGfzOdjWxQ543VWVhXdCEKU1LLzhh3HDUKNvLVPFw4s2OWNp_kvb5g4nk9ltfHKMIBbeXnSw08zDxNHMiFt2C4elXu1TSDoWxinbZDBE0AF8A",
          }}
          style={styles.mapImage}
        />

        {/* Customer Details */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Customer Details</Text>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="person" size={24} color="#2D3748" />
            </View>
            <Text style={styles.text}>Chandana Perera</Text>
          </View>

          <View style={[styles.row, { justifyContent: "space-between", marginTop: 12 }]}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="location-pin" size={24} color="#2D3748" />
              </View>
              <View>
                <Text style={styles.text}>456 Galle Road</Text>
                <Text style={styles.subText}>Colombo 03, 00300</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.iconCircle}>
              <MaterialIcons name="content-copy" size={20} color="#2D3748" />
            </TouchableOpacity>
          </View>

          <View style={[styles.row, { justifyContent: "space-between", marginTop: 12 }]}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="call" size={24} color="#2D3748" />
              </View>
              <Text style={styles.text}>+94 77 123 4567</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Parcel Details */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Parcel Details</Text>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="inventory-2" size={24} color="#2D3748" />
            </View>
            <Text style={styles.text}>Medium Box, 2kg</Text>
          </View>

          <View style={[styles.row, { marginTop: 12 }]}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="sticky-note-2" size={24} color="#2D3748" />
            </View>
            <View>
              <Text style={styles.subText}>Special Instructions</Text>
              <Text style={styles.text}>Please ring the bell twice.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.arrivedBtn} onPress={() => router.push("/home/pikup/pickup-details/complete-pickup/page")} > 

          <Text style={styles.arrivedText}>Arrived</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigateBtn} onPress={() => router.push("/home/pikup/pickup-details/track-parcel/page")}>
          <Text style={styles.navigateText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickupDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FAFC" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F7FAFC",
  },
  topBarTitle: { fontSize: 18, fontWeight: "700", color: "#2D3748" },
  mapImage: { width: "100%", height: 200, borderRadius: 12, marginTop: 12 },
  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sectionHeader: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#2D3748" },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 14, color: "#2D3748", fontWeight: "500" },
  subText: { fontSize: 12, color: "#6B7280" },
  callBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  callText: { color: "#D2232A", fontWeight: "700" },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  arrivedBtn: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#D2232A",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  arrivedText: { color: "#D2232A", fontWeight: "700", fontSize: 16 },
  navigateBtn: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#D2232A",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  navigateText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
