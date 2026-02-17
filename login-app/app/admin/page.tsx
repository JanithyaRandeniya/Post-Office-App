import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


const AdminProfile = ({
  fullName,
  role = "Admin",
  profilePic, 
}: {
  fullName: string;
  role?: string;
  profilePic?: any; 
}) => {
  return (
    <View style={styles.profileContainer}>
      {profilePic ? (
        <Image source={profilePic} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{fullName[0]}</Text>
        </View>
      )}
      <View>
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
    </View>
  );
};


const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push("/home/page")}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/admin/page")}>
          <Text style={styles.buttonText}>Dashbord</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/home/page")}>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/home/page")}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const AdminDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <AdminProfile 
        fullName="Prasadi Nisansala" 
        profilePic={require("../../assets/images/profile.webp")}
      />
      <View style={styles.buttonsContainer}>
      <Text style={styles.header}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/driver/driver-registation/page")}>
          <Text style={styles.buttonText}>Driver Registation</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => router.push("/admin/driver-details/page")}>
          <Text style={styles.buttonText}>Driver Details</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => router.push("/admin/all-parcel-details/page")}>
          <Text style={styles.buttonText}>Customer Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/admin/all-parcel-details/page")}>
          <Text style={styles.buttonText}>Parcel Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/admin/manage-drivers/page")}>
          <Text style={styles.buttonText}>Manage Drivers</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0c4e5ff",
    padding: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#8496e1ff",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  navItem: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3b6886ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  profileRole: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 15,
  },
  button: {
    backgroundColor: "#e4e9eeff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
  },
  scanText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default AdminDashboard;
