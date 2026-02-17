"use client";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

interface Driver {
  id: number;
  driverName: string;
  driverPhone: string;
  nicNumber: string;
  vehicleNumber: string;
  vehicleType: string;
}

const API_URL = "http://localhost:3000/drivers";

const RegisteredDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return (
      <ImageBackground
        source={require("../../../assets/images/map.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading drivers...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/map.png")} // Using your local image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Header with Back Button */}
        
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
          </TouchableOpacity>

          {/* Header Logo/Image */}

        


        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registered Drivers</Text>
            <Text style={styles.subtitle}>View all registered drivers in the system</Text>           
          </View>

          {/* Drivers List Container */}
          <View style={styles.driversContainer}>
            {drivers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={require("../../../assets/images/map.png")} // Use local empty icon
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>No drivers registered yet</Text>
                <Text style={styles.emptySubText}>Register new drivers to see them here</Text>
              </View>
            ) : (
              drivers.map((driver) => (
                <View key={driver.id} style={styles.driverCard}>
                  {/* Driver Avatar */}
                  <View style={styles.driverAvatarContainer}>

                  </View>
                  
                  <View style={styles.driverInfoContainer}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.driverName}>{driver.driverName}</Text>
                      <View style={styles.vehicleTypeBadge}>
                        <Text style={styles.vehicleType}>{driver.vehicleType}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.driverInfo}>
                      <View style={styles.infoRow}>

                        <Text style={styles.infoLabel}>Phone:</Text>
                        <Text style={styles.infoValue}>{driver.driverPhone}</Text>
                      </View>
                      
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>NIC:</Text>
                        <Text style={styles.infoValue}>{driver.nicNumber}</Text>
                      </View>
                      
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Vehicle:</Text>
                        <Text style={styles.infoValue}>{driver.vehicleNumber}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
          
          {/* Footer Image */}
          <View style={styles.footerContainer}>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better text readability
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(77, 105, 183, 0.9)', // Semi-transparent header
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#FFFFFF',
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerLogoContainer: {
    alignItems: 'center',
  },
  headerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 20,
  },
  titleImage: {
    width: 80,
    height: 80,
    tintColor: '#FFFFFF',
  },
  driversContainer: {
    width: "100%",
    maxWidth: 800,
  },
  emptyContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
  },
  emptyImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    textAlign: "center",
  },
  driverCard: {
    backgroundColor: "rgba(107, 144, 238, 0.85)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  driverAvatarContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    tintColor: '#FFFFFF',
  },
  driverInfoContainer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  driverName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
  },
  vehicleTypeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  vehicleType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  driverInfo: {
    gap: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#FFFFFF',
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    width: 60,
    marginRight: 10,
  },
  infoValue: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.95)",
    flex: 1,
    fontWeight: '500',
  },
  footerContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
  },
  footerImage: {
    width: 100,
    height: 100,
    opacity: 0.7,
  },
});

export default RegisteredDrivers;