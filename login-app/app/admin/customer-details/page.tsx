"use client";

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  totalAmount: string;
  status: "Pending" | "Completed";
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: Order[];
}

const dummyCustomers: Customer[] = [
  {
    id: 1,
    name: "Kamal Perera",
    email: "kamal@example.com",
    phone: "0711234567",
    orders: [
      { id: 1, orderNumber: "ORD001", date: "2025-12-01", totalAmount: "$25.50", status: "Completed" },
      { id: 2, orderNumber: "ORD005", date: "2025-12-05", totalAmount: "$10.00", status: "Pending" },
    ],
  },
  {
    id: 2,
    name: "Nimal Silva",
    email: "nimal@example.com",
    phone: "0729876543",
    orders: [
      { id: 3, orderNumber: "ORD002", date: "2025-12-02", totalAmount: "$50.00", status: "Completed" },
    ],
  },
  {
    id: 3,
    name: "Sunil Fernando",
    email: "sunil@example.com",
    phone: "0774567890",
    orders: [],
  },
];

const CustomerDetailsPage = () => {
  const [customers] = useState<Customer[]>(dummyCustomers);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Customer Details</Text>

      {customers.map((customer) => (
        <View key={customer.id} style={styles.card}>
          <Text style={styles.customerName}>{customer.name}</Text>
          <Text style={styles.customerInfo}>Email: {customer.email}</Text>
          <Text style={styles.customerInfo}>Phone: {customer.phone}</Text>

          <Text style={styles.ordersTitle}>Orders:</Text>
          {customer.orders.length === 0 ? (
            <Text style={styles.noOrders}>No orders placed yet.</Text>
          ) : (
            customer.orders.map((order) => (
              <View key={order.id} style={styles.orderRow}>
                <Text style={styles.orderText}>#{order.orderNumber}</Text>
                <Text style={styles.orderText}>{order.date}</Text>
                <Text style={styles.orderText}>{order.totalAmount}</Text>
                <Text
                  style={[
                    styles.orderStatus,
                    order.status === "Pending" ? styles.pending : styles.completed,
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default CustomerDetailsPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#f2f2f2" },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 15 },
  card: {
    backgroundColor: "#ebe49bff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  customerName: { fontSize: 18, fontWeight: "700", marginBottom: 5 },
  customerInfo: { fontSize: 14, color: "#333", marginBottom: 3 },
  ordersTitle: { fontSize: 16, fontWeight: "600", marginTop: 10, marginBottom: 5 },
  noOrders: { fontSize: 14, fontStyle: "italic", color: "#666" },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#fe0000ff",
  },
  orderText: { fontSize: 13, flex: 1, textAlign: "center" },
  orderStatus: { flex: 1, textAlign: "center", fontWeight: "700" },
  pending: { color: "red" },
  completed: { color: "#22ca3eff" }, 
});
