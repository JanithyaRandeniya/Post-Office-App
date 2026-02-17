import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ReviewOrderScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
       <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#343A40" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Review Your Order</Text>
        <View style={{ width: 26 }} /> {/* Spacer */}
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Parcel Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="inventory-2" size={24} color="#092b99ff" />
              <Text style={styles.cardHeaderText}>Parcel Information</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Parcel Type</Text>
              <Text style={styles.value}>Package</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>2.5 kg</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Dimensions</Text>
              <Text style={styles.value}>30 x 20 x 10 cm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Declared Value</Text>
              <Text style={styles.value}>LKR 5,000</Text>
            </View>
          </View>
        </View>

        {/* Pickup & Delivery Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="pin-drop" size={24} color="#092b99ff" />
              <Text style={styles.cardHeaderText}>Pickup & Delivery</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            {/* FROM */}
            <View style={styles.addressRow}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="arrow-upward" size={18} color="#960018" />
              </View>
              <View>
                <Text style={styles.addressLabel}>FROM</Text>
                <Text style={styles.addressName}>Nimal Perera</Text>
                <Text style={styles.addressDetail}>123 Galle Road, Colombo 03, Sri Lanka</Text>
              </View>
            </View>
            {/* TO */}
            <View style={styles.addressRow}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="arrow-downward" size={18} color="#960018" />
              </View>
              <View>
                <Text style={styles.addressLabel}>TO</Text>
                <Text style={styles.addressName}>Sunil Fernando</Text>
                <Text style={styles.addressDetail}>45 Kandy Road, Kandy, Sri Lanka</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pickup Slot Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="calendar-month" size={24} color="#092b99ff" />
              <Text style={styles.cardHeaderText}>Pickup Slot</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>October 28, 2024</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>10:00 AM - 12:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Cost Breakdown Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="receipt-long" size={24} color="#092b99ff" />
            <Text style={[styles.cardHeaderText, { marginLeft: 8 }]}>Cost Breakdown</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Base Fare</Text>
              <Text style={styles.value}>LKR 350.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Insurance Fee</Text>
              <Text style={styles.value}>LKR 50.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Taxes & Surcharges</Text>
              <Text style={styles.value}>LKR 25.00</Text>
            </View>
          </View>
          <View style={[styles.row, { justifyContent: "space-between", marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>LKR 425.00</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.proceedBtn} onPress={() => router.push("/home/pikup/pikup2/payment/page")}>
          <Text style={styles.proceedText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a4c7e7ff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#c7d7e6ff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  topBarTitle: { fontSize: 18, fontWeight: "700", color: "#343A40" },

  card: {
    backgroundColor: "#d9e4ebff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    paddingTop: 12,
    marginTop: 20,
    marginHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardHeaderText: { fontSize: 16, fontWeight: "700", color: "#343A40" },
  editText: { fontSize: 14, fontWeight: "500", color: "#1034d6ff" },
  cardContent: { paddingTop: 4 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  label: { fontSize: 14, color: "#6c757d" },
  value: { fontSize: 14, fontWeight: "500", color: "#343A40" },

  addressRow: { flexDirection: "row", marginBottom: 12, gap: 8 },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#8da7c4ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  addressLabel: { fontSize: 10, fontWeight: "700", color: "#6c757d", letterSpacing: 1 },
  addressName: { fontSize: 14, fontWeight: "500", color: "#343A40" },
  addressDetail: { fontSize: 12, color: "#6c757d" },

  totalLabel: { fontSize: 16, fontWeight: "700", color: "#343A40" },
  totalValue: { fontSize: 16, fontWeight: "700", color: "#960018" },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderTopWidth: 1,
    borderColor: "#CED4DA",
  },
  proceedBtn: {
    backgroundColor: "#4464beff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  proceedText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
