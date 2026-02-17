import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <Text style={styles.greeting}>Settings</Text>

        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        {/* Profile Header */}
        <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
          <Image
            source={{
              uri:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuASD5UfYlzO-d7rLju_yHTtP1Z1sRnP9K0u8I0ERyzMGe3UzvNfCA6VXcLW9hBKsyAPXCJ5TRLrZTzlZPxVLl8fM0mAIbwpBGnxv8sT6VD7kP1WksfYLkl_IJUk63g0iMoed1_IUW_PskJ_VnnDV3uxtT7fqqQEnA7pwqZ9Lxkgz6DT4_JIz-QY6xskeS1mG54kHqo8wUjMJReJ1R20rJ8DTbCp31rXe1SPApLT-vGoZSbseeLNYEG5vpen7IwMHqy20yv-hKn3ziE",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />

          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#333" }}>
              Nimal Perera
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              nimal.p@email.com
            </Text>
          </View>
        </View>

        {/* ACCOUNT */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="person" size={22} color="#555" />
            <Text style={styles.rowText}>Edit Personal Information</Text>
            <MaterialIcons name="chevron-right" size={22} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="home" size={22} color="#555" />
            <Text style={styles.rowText}>Manage Saved Addresses</Text>
            <MaterialIcons name="chevron-right" size={22} color="#999" />
          </TouchableOpacity>
        </View>

        {/* PREFERENCES */}
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="language" size={22} color="#555" />
            <Text style={styles.rowText}>Language</Text>
            <MaterialIcons name="chevron-right" size={22} color="#999" />
          </TouchableOpacity>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Push Notifications</Text>
            <Switch thumbColor="#fff" trackColor={{ true: "#B80000" }} value />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>SMS Notifications</Text>
            <Switch thumbColor="#fff" trackColor={{ true: "#B80000" }} value={false} />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Email Notifications</Text>
            <Switch thumbColor="#fff" trackColor={{ true: "#B80000" }} value />
          </View>
        </View>

        {/* SUPPORT */}
        <Text style={styles.sectionTitle}>Support</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="help-outline" size={22} color="#555" />
            <Text style={styles.rowText}>Help & Support</Text>
            <MaterialIcons name="chevron-right" size={22} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="description" size={22} color="#555" />
            <Text style={styles.rowText}>Terms of Service</Text>
            <MaterialIcons name="chevron-right" size={22} color="#999" />
          </TouchableOpacity>
        </View>

        {/* LOG OUT */}
        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialIcons name="logout" size={22} color="#B80000" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },

  greeting: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 12,
    marginLeft: 20,
    color: "#333",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  rowText: { flex: 1, marginLeft: 12, fontSize: 15, color: "#333" },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  toggleText: { fontSize: 15, color: "#333" },

  logoutBtn: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginHorizontal: 20,
    padding: 16,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginLeft: 12,
    color: "#B80000",
    fontSize: 16,
    fontWeight: "700",
  },
});
