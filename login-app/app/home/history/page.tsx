import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Pickup {
  id: string;
  recipient: string;
  ordered: string;
  status: string;
}

const pickupsData: Pickup[] = [
  { id: "PK123456789LK", recipient: "Galle", ordered: "25 Oct 2024", status: "In Transit" },
  { id: "PK987654321LK", recipient: "Kandy", ordered: "22 Oct 2024", status: "Delivered" },
  { id: "PK445566778LK", recipient: "Colombo", ordered: "20 Oct 2024", status: "Pending Pickup" },
  { id: "PK556677889LK", recipient: "Jaffna", ordered: "18 Oct 2024", status: "Cancelled" },
];

const statusColors: Record<string, string> = {
  "Delivered": "#16A34A",
  "In Transit": "#2563EB",
  "Pending Pickup": "#F59E0B",
  "Cancelled": "#DC2626",
};

export default function MyPickupsScreen(): React.ReactElement {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Ongoing", "Delivered", "Cancelled"];

  const filteredPickups = pickupsData.filter((pickup) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Ongoing")
      return pickup.status === "In Transit" || pickup.status === "Pending Pickup";
    return pickup.status === activeFilter;
  });

  return (
    <View style={styles.container}>
      {/* --- Top Bar with Back Arrow --- */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            // If the router exposes a canGoBack function use it to decide; otherwise fallback to push.
            if ((router as any).canGoBack?.()) {
              router.back();
            } else {
              router.push("/home/page");
            }
          }}
        >
          <MaterialIcons name="arrow-back" size={26} color="#060606ff" />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Complete Pickup</Text>

        {/* Spacer to balance layout */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={22} color="#888" style={{ marginHorizontal: 10 }} />
          <TextInput
            placeholder="Search by tracking # or recipient"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* --- Filter Chips --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.activeFilterChip,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- Pickups List --- */}
        <View style={styles.pickupList}>
          {filteredPickups.map((pickup, i) => (
            <TouchableOpacity key={i} style={styles.pickupCard}>
              <View style={styles.pickupRow}>
                <View style={styles.pickupIcon}>
                  <MaterialIcons name="local-shipping" size={28} color="#333" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pickupId}>{pickup.id}</Text>
                  <Text style={styles.pickupSubText}>To: {pickup.recipient}</Text>
                  <Text style={styles.pickupSubText}>Ordered: {pickup.ordered}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color="#999" />
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColors[pickup.status] + "22" },
                ]}
              >
                <View
                  style={[styles.statusDot, { backgroundColor: statusColors[pickup.status] }]}
                />
                <Text style={[styles.statusText, { color: statusColors[pickup.status] }]}>
                  {pickup.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topBarTitle: { fontSize: 20, fontWeight: "700", color: "#111" },

  scroll: { flex: 1, paddingHorizontal: 20 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal: 5,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#111", paddingVertical: 10 },

  filterContainer: { flexDirection: "row", marginVertical: 14 },
  filterChip: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: "#FFF",
  },
  activeFilterChip: { backgroundColor: "#B80000", borderColor: "#B80000" },
  filterText: { fontSize: 13, color: "#333", fontWeight: "500" },
  activeFilterText: { color: "#FFF" },

  pickupList: { paddingBottom: 20 },
  pickupCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  pickupRow: { flexDirection: "row", alignItems: "center" },
  pickupIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  pickupId: { fontSize: 15, fontWeight: "600", color: "#111" },
  pickupSubText: { fontSize: 13, color: "#777" },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 13, fontWeight: "600" },
});
