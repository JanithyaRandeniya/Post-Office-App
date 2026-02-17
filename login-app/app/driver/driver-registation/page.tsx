"use client";

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface Driver {
  id: number;
  driverName: string;
  driverPhone: string;
  nicNumber: string;
  vehicleNumber: string;
  vehicleType: string;
}

const API_URL = "http://localhost:3000/drivers";

export default function DriverRegistration(): React.ReactElement {
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  
  const router = useRouter();

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error("Fetch error", err);
      Alert.alert("Error", "Failed to fetch drivers");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Submit handler
  const handleSubmit = async () => {
    if (!driverName || !driverPhone || !nicNumber || !vehicleNumber || !vehicleType) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const payload = {
      driverName,
      driverPhone,
      nicNumber,
      vehicleNumber,
      vehicleType,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register driver");

      Alert.alert("Success", "Driver Registered Successfully!");

      // Clear form
      setDriverName("");
      setDriverPhone("");
      setNicNumber("");
      setVehicleNumber("");
      setVehicleType("");

      // Refresh list
      fetchDrivers();
    } catch (err) {
      Alert.alert("Error", "Backend error");
      console.error(err);
    }
  };

  const renderDriverItem = ({ item }: { item: Driver }) => (
    <View style={styles.driverItem}>
      <Text style={styles.driverText}>
        {item.driverName} | {item.driverPhone} | {item.vehicleType}
      </Text>
      <Text style={styles.driverSubText}>
        Vehicle: {item.vehicleNumber} | NIC: {item.nicNumber}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#97b9deff", "#1471acff", "#365f94ff"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            
          </TouchableOpacity>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Driver Registration</Text>
            <Text style={styles.subtitle}>Register new drivers for the system</Text>

            {/* Form Inputs */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Driver Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter driver name"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={driverName}
                onChangeText={setDriverName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={driverPhone}
                onChangeText={setDriverPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>NIC Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter NIC number"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={nicNumber}
                onChangeText={setNicNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter vehicle number"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter vehicle type (Car, Van, Truck, etc.)"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={vehicleType}
                onChangeText={setVehicleType}
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
              <Text style={styles.registerButtonText}>Register Driver</Text>
            </TouchableOpacity>

            {/* Separator */}
            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>Registered Drivers</Text>
              <View style={styles.line} />
            </View>

            {/* Drivers List */}
            <View style={styles.listContainer}>
              {drivers.length === 0 ? (
                <Text style={styles.emptyText}>No drivers registered yet</Text>
              ) : (
                <FlatList
                  data={drivers}
                  renderItem={renderDriverItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                  style={styles.list}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 25,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },
  registerButton: {
    backgroundColor: "#262db8ff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    marginTop: 10,
  },
  emptyText: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: 16,
    padding: 20,
  },
  driverItem: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  driverText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  driverSubText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  list: {
    marginBottom: 20,
  },
});