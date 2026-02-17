import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CompletePickup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#060606ff" />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Complete Pickup</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Customer Card */}
        <View style={styles.card}>
          <View style={styles.leftInfo}>
            <Text style={styles.subText}>Order ID: #SLP789123</Text>
            <Text style={styles.title}>Amelia Perera</Text>
            <Text style={styles.subText}>25/A, Galle Road, Colombo 03</Text>
          </View>

          <ImageBackground
            style={styles.mapBox}
            imageStyle={{ borderRadius: 12 }}
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSEnUVXj8ImE9lhzpgOcJae7oebylrsMIsLOxJa2bCgg_vdL94hictPOpE10VzJFJqtukXrkzfojBHejek4BjsIb2UVZwsnTEatGUB9Om8IsrHAmvNpmUslsSIbEL04w6qFPdaBHCGNhvOO3rAO8ZxMbdBoLE55yIGfzOdjWxQ543VWVhXdCEKU1LLzhh3HDUKNvLVPFw4s2OWNp_kvb5g4nk9ltfHKMIBbeXnSw08zDxNHMiFt2C4elXu1TSDoWxinbZDBE0AF8A",
            }}
          />
        </View>

        {/* COD Box */}
        <View style={styles.codBox}>
          <Text style={styles.codTitle}>Cash on Delivery</Text>

          <View style={styles.codAmountRow}>
            <View>
              <Text style={styles.codSub}>Please Collect:</Text>
              <Text style={styles.codAmount}>LKR 1,500.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.scanBtn} onPress={() => router.push("/home/pikup/pikup2/review-order/page")}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
          <Text style={styles.scanText}>Scan Parcel Barcode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.disabledBtn} disabled>
          <Text style={styles.disabledText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  /* Top Bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  topBarTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#000000ff",
  },

  /* Card */
  card: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  leftInfo: {
    flex: 2,
    gap: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a237e",
  },

  subText: {
    fontSize: 14,
    color: "#555",
  },

  mapBox: {
    width: 90,
    height: 90,
    marginLeft: 10,
    borderRadius: 12,
  },

  /* COD Box */
  codBox: {
    backgroundColor: "rgba(0, 123, 255, 0.1)",
    marginHorizontal: 12,
    marginTop: 10,
    padding: 16,
    borderRadius: 16,
  },

  codTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007bff",
    marginBottom: 4,
  },

  codSub: {
    fontSize: 14,
    color: "#343a40",
  },

  codAmountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  codAmount: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
  },

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },

  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#d2232a",
    gap: 8,
  },

  scanText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  disabledBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#bdbdbd",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "700",
  },
});

