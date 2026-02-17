import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen(): React.ReactElement {
  const [fullName, setFullName] = useState<string>("");
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleCreateAccount = (): void => {
    // Add validation logic here
    console.log("Creating account...");
    router.push("/home/page");
  };

  const handleSendOtp = (): void => {
    // Add OTP sending logic here
    console.log("Sending OTP...");
  };

  const handleLogin = (): void => {
    router.push("/login/page");
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
      
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzgWJKUAbAVGKcCxQYQHGZoP8Ak27JBJ9MWjNcR-54CuUnsb1Lq53k0iincT4vjj3IUWMMMdbpYqCud3PiZYXZrHcWyiUuQDVV0iJAgWhHVuTIDfm3XuPPRGQZPdepN1KVASpRVACDND95Gep_D9IaMTVz_fjqFLEtr5M1nssz4-L-bU-mWXU7vXefvm-eyR1tLMCqTSIpFnyqRMUVx0E4aEtw9PpzH0GyPJolouRvvUjzguWsMF8Q4RC92o3Pcs_UAKqRMmDsIGI",
              }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Headline */}
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Let&apos;s get you started with your account.</Text>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email or Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or Phone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email or phone"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
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
                    <Text style={styles.showText}>{showPassword ? "Hide" : "Show"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordWrapper}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm your password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                    style={styles.showButton}
                  >
                    <Text style={styles.showText}>{showConfirmPassword ? "Hide" : "Show"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* OTP */}
            <View style={[styles.inputGroup, { marginTop: 10 }]}>
              <Text style={styles.label}>OTP</Text>
              <View style={styles.otpWrapper}>
                <View style={styles.otpRow}>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="Enter OTP"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                  />
                  <TouchableOpacity 
                    style={styles.otpButton}
                    onPress={handleSendOtp}
                  >
                    <Text style={styles.otpButtonText}>Send OTP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Create Account */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity 
                style={styles.createButton} 
                onPress={handleCreateAccount}
              >
                <Text style={styles.createButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}>Log in</Text>
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
    padding: 20,
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
    marginBottom: 20 
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
    marginBottom: 30 
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
  inputWrapper: {
    width: "100%",
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
  passwordWrapper: {
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
    zIndex: 1 
  },
  showText: { 
    color: "#FFFFFF", 
    fontWeight: "700" as const,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  otpWrapper: {
    width: "100%",
  },
  otpRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%",
    gap: 12 
  },
  otpInput: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  otpButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 110,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  otpButtonText: { 
    color: "#FFFFFF", 
    fontWeight: "700" as const, 
    fontSize: 14 
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 25,
  },
  createButton: { 
    backgroundColor: "#FFFFFF", 
    paddingVertical: 18, 
    borderRadius: 12, 
    alignItems: "center",
    width: "100%",
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
  createButtonText: { 
    color: "#4A90E2", 
    fontWeight: "700" as const, 
    fontSize: 17 
  },
  loginContainer: { 
    alignItems: "center", 
    marginTop: 25,
    width: "100%",
  },
  loginText: { 
    textAlign: "center", 
    color: "rgba(255, 255, 255, 0.9)", 
    fontSize: 15,
    marginBottom: 6,
  },
  loginLink: { 
    color: "#FFFFFF", 
    fontWeight: "700" as const,
    fontSize: 15,
    textDecorationLine: "underline",
  },
});