import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const { width } = Dimensions.get("window");

const PostOfficePage: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* MAIN CARD */}
        <View style={styles.card}>

          {/* TITLE */}
          <Text style={styles.title}>Post Office{"\n"}Mobile App</Text>
          <Text style={styles.subtitle}>
            Fast, Secure & Reliable Postal Services
          </Text>

          <View style={styles.divider} />

          {/* IMAGE + FLOATING ICONS */}
          <View style={styles.imageSection}>
            <Image
              source={require("../../assets/images/new.png")}
              style={styles.image}
              resizeMode="contain"
            />

            {/* FLOATING ICONS */}
            <View style={[styles.floatingIcon, { top: 10, right: 10 }]}>
              <Text style={styles.icon}>✉️</Text>
              <Text style={styles.iconLabel}>Mail</Text>
            </View>

            <View style={[styles.floatingIcon, { top: 40, left: 10 }]}>
              <Text style={styles.icon}>📍</Text>
              <Text style={styles.iconLabel}>Tracking</Text>
            </View>

            <View style={[styles.floatingIcon, { bottom: 10, left: 20 }]}>
              <Text style={styles.icon}>📦</Text>
              <Text style={styles.iconLabel}>Parcel</Text>
            </View>

            <View style={[styles.floatingIcon, { bottom: 40, right: 20 }]}>
              <Text style={styles.icon}>🚚</Text>
              <Text style={styles.iconLabel}>Delivery</Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.description}>
            Track parcels, send mail, find nearby post offices and manage
            deliveries anytime, anywhere with our official Post Office
            mobile application.
          </Text>

          {/* BUTTONS */}
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/login/page")}>
            <Text style={styles.primaryText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/signup/page")}>
            <Text style={styles.secondaryText}>Sign Up</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.footer}>All rights reserved</Text>
      </View>
    </SafeAreaView>
  );
};

export default PostOfficePage;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#8FA7D8",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: width * 0.9,
    backgroundColor: "#D9ECFF",
    borderRadius: 30,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1F2B6C",
  },

  subtitle: {
    fontSize: 14,
    color: "#5E6FAE",
    marginTop: 6,
  },

  divider: {
    height: 3,
    width: 50,
    backgroundColor: "#4F6CF7",
    borderRadius: 2,
    marginVertical: 14,
  },

  imageSection: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 200,
  },

  floatingIcon: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  icon: {
    fontSize: 20,
  },

  iconLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#1F2B6C",
  },

  description: {
    fontSize: 14,
    color: "#3F4C7A",
    lineHeight: 20,
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: "#4F6CF7",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: "#4F6CF7",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },

  secondaryText: {
    color: "#4F6CF7",
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    marginTop: 10,
    fontSize: 12,
    color: "#DDE5FF",
  },
});
