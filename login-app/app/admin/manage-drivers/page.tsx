"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";

type DriverStatus = "pending" | "accepted";

interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  status: DriverStatus;
}

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: "Kamal Perera", phone: "0711234567", vehicle: "Van", status: "pending" },
    { id: 2, name: "Nimal Silva", phone: "0729876543", vehicle: "Truck", status: "accepted" },
    { id: 3, name: "Sunil Fernando", phone: "0774567890", vehicle: "Car", status: "pending" },
    { id: 4, name: "Nimal Perera", phone: "0711234567", vehicle: "Van", status: "pending" },
    { id: 5, name: "Ranjith Silva", phone: "0729876543", vehicle: "Truck", status: "accepted" },
    { id: 6, name: "Anil Fernando", phone: "0774567890", vehicle: "Car", status: "pending" },
    { id: 7, name: "Nimal Perera", phone: "0711234567", vehicle: "Van", status: "pending" },
    { id: 8, name: "Ranjith Silva", phone: "0729876543", vehicle: "Truck", status: "accepted" },
    { id: 9, name: "Anil Fernando", phone: "0774567890", vehicle: "Car", status: "pending" },
  ]);

  const updateStatus = (id: number, status: DriverStatus) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const deleteDriver = (id: number) => {
    Alert.alert("Delete Driver", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setDrivers((prev) => prev.filter((d) => d.id !== id)),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          
        </TouchableOpacity>
        <Text style={styles.title}>Manage Drivers</Text>
      </View>

      {/* Table Header */}
      <View style={[styles.row, styles.tableHeader]}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Vehicle</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>

      {/* Table Rows */}
      {drivers.map((driver) => (
        <View key={driver.id} style={styles.row}>
          <Text style={styles.cell}>{driver.name}</Text>
          <Text style={styles.cell}>{driver.vehicle}</Text>

          <Text
            style={[
              styles.status,
              driver.status === "accepted"
                ? styles.accepted
                : styles.pending,
            ]}
          >
            {driver.status.toUpperCase()}
          </Text>

          <View style={styles.actionCol}>
            {driver.status === "pending" && (
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => updateStatus(driver.id, "accepted")}
              >
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteDriver(driver.id)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ManageDrivers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#b0c4e5ff",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
   textAlign: "center",
   flex: 1,
  },

  tableHeader: {
    backgroundColor: "#3698d1ff",
    paddingVertical: 20,
    borderRadius: 6,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 6,
    borderRadius: 8,
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },

  status: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 12,
  },

  accepted: {
    color: "green",
  },
  pending: {
    color: "orange",
  },

  actionCol: {
    flex: 1,
    gap: 6,
    alignItems: "center",
  },

  acceptBtn: {
    backgroundColor: "#205fd3ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
