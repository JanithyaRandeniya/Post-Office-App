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

const TrackParcel: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#4A4A4A" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Track Parcel</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Parcel Details */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.subText}>Tracking Number</Text>
              <Text style={styles.title}>SLP123456789LK</Text>
            </View>

            <TouchableOpacity>
              <MaterialIcons name="content-copy" size={24} color="#4A4A4A" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.subText}>Estimated Delivery</Text>
              <Text style={styles.title}>25 October 2024</Text>
            </View>
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.card}>
          <View style={styles.progressRow}>
            {/* Scheduled */}
            <View style={styles.progressItem}>
              <View style={styles.progressDone}>
                <MaterialIcons name="check" size={20} color="#fff" />
              </View>
              <Text style={styles.progressTextActive}>Scheduled</Text>
            </View>

            <View style={styles.lineActive} />

            {/* Picked Up */}
            <View style={styles.progressItem}>
              <View style={styles.progressDone}>
                <MaterialIcons name="check" size={20} color="#fff" />
              </View>
              <Text style={styles.progressTextActive}>Picked Up</Text>
            </View>

            <View style={styles.lineActive} />

            {/* In Transit */}
            <View style={styles.progressItem}>
              <View style={styles.progressCurrent}>
                <MaterialIcons
                  name="local-shipping"
                  size={20}
                  color="#fff"
                />
              </View>
              <Text style={styles.progressTextActive}>In Transit</Text>
            </View>

            <View style={styles.lineInactive} />

            {/* Out for Delivery */}
            <View style={styles.progressItem}>
              <View style={styles.progressInactive}>
                <MaterialIcons name="inventory" size={20} color="#4A4A4A" />
              </View>
              <Text style={styles.progressTextInactive}>
                Out for Delivery
              </Text>
            </View>
          </View>
        </View>

        {/* Map */}
        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlzWRrr13lVrtwmCPp18TTodHf63i9UfReEFu6-pNRt6PBGDOo8vSMeX4nXQUxnncnWT4eIB3SKIauO30oW1Q9EinDlp3jVXXMDj79YBRKZOXkf3aNbBdKVbAe5xad25hi8QMjT5cVgUaq5W-aIYYDfbCdefgAQ2SNC6to6SkSr6KFyYA2ygGopNMDRZ9bD8waYyAprzLHZTnPF42OPL5l-tZPkGRkscsDEWO4Ji5tQjHe11fweDvWIMYGnsnLoRzaPuaRrapS010",
          }}
          style={styles.map}
          imageStyle={{ borderRadius: 12 }}
        />

        {/* Tracking History */}
        <Text style={styles.sectionHeader}>Tracking History</Text>

        <View style={styles.historyList}>
          {/* In Transit */}
          <View style={styles.historyRow}>
            <View style={styles.historyIconActive}>
              <MaterialIcons
                name="local-shipping"
                size={22}
                color="#C31B39"
              />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.title}>In Transit</Text>
              <Text style={styles.subText}>
                Departed from Colombo Hub
              </Text>
              <Text style={styles.timeText}>
                24 October 2024, 11:30 AM
              </Text>
            </View>
          </View>

          {/* Picked Up */}
          <View style={styles.historyRow}>
            <View style={styles.historyIcon}>
              <MaterialIcons
                name="inventory-2"
                size={22}
                color="#4A4A4A"
              />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.title}>Parcel Picked Up</Text>
              <Text style={styles.subText}>
                Courier has picked up the parcel
              </Text>
              <Text style={styles.timeText}>
                24 October 2024, 09:15 AM
              </Text>
            </View>
          </View>

          {/* Scheduled */}
          <View style={styles.historyRow}>
            <View style={styles.historyIcon}>
              <MaterialIcons name="schedule" size={22} color="#4A4A4A" />
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.title}>Pickup Scheduled</Text>
              <Text style={styles.subText}>
                Sender has scheduled a pickup
              </Text>
              <Text style={styles.timeText}>
                23 October 2024, 04:45 PM
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.supportButton}>
          <MaterialIcons name="support-agent" size={22} color="#fff" />
          <Text style={styles.supportText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrackParcel;
  
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7F8" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F6F7F8",
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
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#0d141b",
    marginRight: 40,
  },

  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 15, fontWeight: "600", color: "#0d141b" },
  subText: { fontSize: 13, color: "#4A4A4A" },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },

  /* Progress Tracker */
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressItem: { alignItems: "center" },

  progressDone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C31B39",
    justifyContent: "center",
    alignItems: "center",
  },

  progressCurrent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C31B39",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(195,27,57,0.2)",
  },

  progressInactive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  progressTextActive: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "600",
    color: "#C31B39",
  },

  progressTextInactive: {
    marginTop: 4,
    fontSize: 10,
    color: "#4A4A4A",
  },

  lineActive: {
    flex: 1,
    height: 2,
    backgroundColor: "#C31B39",
  },

  lineInactive: {
    flex: 1,
    height: 2,
    backgroundColor: "#CBD5E1",
  },

  /* Map */
  map: {
    width: "100%",
    height: 250,
    marginTop: 10,
    borderRadius: 12,
  },

  /* Tracking History */
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d141b",
    marginHorizontal: 16,
    marginTop: 16,
  },

  historyList: {
    marginHorizontal: 16,
    marginTop: 10,
  },

  historyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  historyIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(195,27,57,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  historyContent: {
    flex: 1,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    paddingBottom: 12,
  },

  timeText: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

  /* Footer Button */
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#F6F7F8",
  },

  supportButton: {
    flexDirection: "row",
    backgroundColor: "#C31B39",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  supportText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
