"use client";

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = () => {
    const username = email.trim();
    const pwd = password.trim();

    if (username === "prasadi" && pwd === "prasadi123") {
      router.replace("/admin/page");
      return;
    }

    if (username === "driver" && pwd === "driver123") {
      router.replace("/driver/page");
      return;
    }

    if (username && pwd) {
      router.replace("/home/page");
      return;
    }

    Alert.alert("Login Failed", "Invalid username or password!");
  };

  return (
    <LinearGradient
      colors={["#97b9deff", "#1471acff", "#365f94ff"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scroll} 
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv-vuIhrSxmUTckwj2WBVogw2xKQ0i90nVMJFG-ItYvL6CmldxQoPhRJEtP2ubasK3mDutsaWpOBfYPuoJIbW7SLynks7nUV_U9cKg3PnbYuWiqNh8eR_18RW4xMshetqbQWdB_K12x0Y3J0XjVe1yenGZKuFQ-QNog5a71dJM8hSuOBqqHDBVZ-wZRf5bsuPKx6QUtgZFGWiczY-yVT2OogNNTMPiXO71Y9fit5x1-7xlOt59pHAxWuy_0kuL983WazGd2YKfE0o",
              }}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Let&apos;s get you signed in to your account.</Text>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email or username"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showButton}
                >
                  <Text style={styles.showText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            {/* Admin & Driver Buttons */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={styles.adminBtn}
                onPress={() => router.push("/admin/page")}
              >
                <Text style={styles.roleText}>Admin</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.driverBtn}
                onPress={() => router.push("/driver/page")}
              >
                <Text style={styles.roleText}>Driver</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>or continue with</Text>
              <View style={styles.line} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialText}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Sign up */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/signup/page")}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
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
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 15,
    fontWeight: "600" as const,
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
    width: "100%",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
    width: "100%",
    paddingRight: 70,
  },
  showButton: {
    position: "absolute",
    right: 18,
    top: 14,
    zIndex: 1,
  },
  showText: {
    color: "#FFFFFF",
    fontWeight: "700" as const,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 25,
  },
  forgotText: {
    color: "#FFFFFF",
    fontWeight: "600" as const,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  loginBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginText: {
    color: "#4A90E2",
    fontSize: 17,
    fontWeight: "700" as const,
  },
  roleContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    gap: 12,
  },
  adminBtn: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  driverBtn: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  roleText: {
    color: "#FFFFFF",
    fontWeight: "700" as const,
    fontSize: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  orText: {
    marginHorizontal: 10,
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  socialContainer: {
    width: "100%",
    gap: 10,
  },
  socialBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600" as const,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 15,
  },
  signupLink: {
    color: "#FFFFFF",
    fontWeight: "700" as const,
    fontSize: 15,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});