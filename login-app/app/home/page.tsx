import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen(): React.ReactElement {
  const parcels = [
    { id: "EE123456789LK", to: "Kandy", status: "In Transit", color: "#2563EB" },
    { id: "CE987654321LK", to: "Galle", status: "Delivered", color: "#16A34A" },
    { id: "PK554433221LK", to: "Jaffna", status: "Pending", color: "#D97706" },
  ];

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Home");

  const bottomNav = [
    { icon: "home", label: "Home", route: "/home/page" },
    { icon: "history", label: "History", route: "/home/history/page" },
    { icon: "support-agent", label: "Support", route: "/home/support/page" },
    { icon: "person", label: "Profile", route: "/home/profile/page" },
  ];

  return (
    <View style={styles.container}>

      {/* --- Top Bar --- */}
      <View style={styles.topBar}>

        {/* Profile Image */}
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCFwpOGECfSPzjLe3q82IrN02LmSP1kberfIEwpolustVbYCVxnRWbSfyyi3N2degElOgfKZEWqXyimjNKlTSfxejVX-AMUCM0N3mE7FDfRF_DPZDqhh1obXt4Hr2q3Ru0r9z96rvaKndmV-NEHVGCLxBcLSz2ProwOlTGa7mjWfQEzMhBNXATN_bc6c0o0b31l2MsndDck7qFBy-Qhpn21KXuxVJb0xpLyV2PBppKfqxEsU98bKCzotMFMtfK2cwSytUmgnuZEAo"
          }}
          style={styles.logoBox}
          resizeMode="cover"
        />

        {/* Greeting */}
        <Text style={styles.greeting}>Hello, Nimal 👋</Text>

        {/* Notification Button */}
        <TouchableOpacity style={styles.notifyBtn}>
          <MaterialIcons name="notifications" size={24} color="#1450aaff" />
        </TouchableOpacity>
      </View>

      {/* --- Search Bar --- */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={22} color="#888" />
        <TextInput
          placeholder="Enter Tracking Number"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* --- CTA Button --- */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => router.push("/home/pikup/page")}
      >
        <MaterialIcons name="add-box" size={24} color="#FFF" />
        <Text style={styles.ctaText}>Schedule a New Pickup</Text>
      </TouchableOpacity>

      {/* --- Section Header --- */}
      <Text style={styles.sectionTitle}>Recent Parcels</Text>

      {/* --- Parcel List --- */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 100 }}>
        {parcels.map((p, index) => (
          <TouchableOpacity key={index} style={styles.parcelCard}>
            <View style={styles.parcelLeft}>
              <View
                style={[
                  styles.parcelIcon,
                  { backgroundColor: `${p.color}20` },
                ]}
              >
                <MaterialIcons
                  name={
                    p.status === "Delivered"
                      ? "task-alt"
                      : p.status === "Pending"
                      ? "pending"
                      : "local-shipping"
                  }
                  size={26}
                  color={p.color}
                />
              </View>
              <View>
                <Text style={styles.parcelId}>{p.id}</Text>
                <Text style={styles.parcelTo}>To: {p.to}</Text>
              </View>
            </View>
            <View style={styles.parcelRight}>
              <Text style={[styles.parcelStatus, { color: p.color }]}>{p.status}</Text>
              <MaterialIcons name="chevron-right" size={22} color="#888" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- Bottom Navigation --- */}
      <View style={styles.bottomNav}>
        {bottomNav.map((n, i) => (
          <TouchableOpacity
            key={i}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(n.label);
              router.push(n.route);
            }}
          >
            <MaterialIcons
              name={n.icon}
              size={24}
              color={activeTab === n.label ? "#4a8cb8ff" : "#888"}
            />
            <Text
              style={[
                styles.navLabel,
                activeTab === n.label && { color: "#4a8cb8ff", fontWeight: "700" },
              ]}
            >
              {n.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a4c7e7ff" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#c6d8ecff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  /* Updated profile image style */
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
  },

  greeting: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
  },

  notifyBtn: {
    backgroundColor: "#FFF0F0",
    padding: 6,
    borderRadius: 30,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "#000000ff" },

  ctaButton: {
    backgroundColor: "#2c86eeff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: "#031524ff",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  ctaText: { color: "#FFF", fontWeight: "700", fontSize: 16, marginLeft: 8 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 25,
    marginLeft: 20,
  },

  scroll: { flex: 1, marginTop: 10, paddingHorizontal: 20 },

  parcelCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  parcelLeft: { flexDirection: "row", alignItems: "center" },
  parcelIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  parcelId: { fontSize: 15, fontWeight: "600", color: "#222" },
  parcelTo: { fontSize: 13, color: "#666" },
  parcelRight: { flexDirection: "row", alignItems: "center" },
  parcelStatus: { fontSize: 13, fontWeight: "600", marginRight: 4 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#f2f5f7ff",
    borderTopWidth: 1,
    borderColor: "#EEE",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 12, color: "#888", marginTop: 4 },
});
