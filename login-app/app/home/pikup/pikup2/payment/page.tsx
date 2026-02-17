import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>("card");

  // Card details state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Validation state
  const [errors, setErrors] = useState({ 
    cardNumber: false, 
    expiryDate: false, 
    cvv: false 
  });

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  // Format card number with spaces
  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setCardNumber(formatted);
    if (cleaned.length >= 16) {
      setErrors(prev => ({ ...prev, cardNumber: false }));
    }
  };

  // Format expiry date
  const formatExpiryDate = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Add slash after 2 digits
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    
    setExpiryDate(formatted);
    if (cleaned.length >= 4) {
      setErrors(prev => ({ ...prev, expiryDate: false }));
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    if (selectedMethod === "card") {
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      return cleanCardNumber.length === 16 && 
             expiryDate.length === 5 && 
             cvv.length === 3;
    }
    return true; // Other methods don't need validation
  };

  // Show success modal with animation
  const showSuccessAlert = (title: string, message: string) => {
    setSuccessTitle(title);
    setSuccessMessage(message);
    setShowSuccessModal(true);
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Hide success modal
  const hideSuccessAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowSuccessModal(false);
      // Navigate to home after modal closes
      router.push("/home/page");
    });
  };

  const handleConfirmPayment = () => {
    console.log("🔵 Confirm Payment button clicked");
    
    if (selectedMethod === "card") {
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      const newErrors = {
        cardNumber: cleanCardNumber.length !== 16,
        expiryDate: expiryDate.length !== 5,
        cvv: cvv.length !== 3,
      };
      
      console.log("🟡 Validation errors:", newErrors);
      setErrors(newErrors);

      if (newErrors.cardNumber || newErrors.expiryDate || newErrors.cvv) {
        console.log("🔴 Showing error alert");
        Alert.alert(
          "Incomplete Card Details", 
          "Please fill all card details correctly:\n\n• Card Number: 16 digits\n• Expiry Date: MM/YY\n• CVV: 3 digits"
        );
        return;
      }
    }

    // Success message based on selected method
    let message = "";
    let title = "Payment Successful";
    
    switch (selectedMethod) {
      case "card":
        message = "Your card payment has been processed successfully!";
        break;
      case "lankapay":
        message = "Redirecting to LankaPay gateway...";
        title = "Redirecting to LankaPay";
        break;
      case "wallet":
        message = "Mobile wallet payment initiated successfully!";
        break;
      case "cod":
        message = "Cash on Delivery selected. Please have LKR 1,250.00 ready for the delivery person.";
        title = "Order Confirmed";
        break;
      default:
        message = "Payment completed successfully!";
    }

    console.log("🟢 Showing success modal");
    showSuccessAlert(title, message);
  };

  // Simple rotation style for accordion arrows
  const getArrowRotation = (method: string) => {
    return selectedMethod === method ? "180deg" : "0deg";
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Payment</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Amount */}
        <View style={styles.amountSection}>
          <Text style={styles.totalAmount}>LKR 1,250.00</Text>
          <Text style={styles.amountLabel}>Total Amount</Text>
        </View>

        {/* Secure Payment Info */}
        <View style={styles.secureInfo}>
          <MaterialIcons name="lock" size={18} color="#22C55E" />
          <Text style={styles.secureText}>Your payment is safe and secure</Text>
        </View>

        {/* Section Header */}
        <Text style={styles.sectionHeader}>Select Payment Method</Text>

        {/* Payment Methods */}
        <View style={styles.accordions}>
          {/* Credit/Debit Card */}
          <View style={[
            styles.accordion,
            selectedMethod === "card" && styles.accordionOpen,
          ]}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setSelectedMethod(selectedMethod === "card" ? null : "card")}
              activeOpacity={0.7}
            >
              <View style={styles.accordionTitle}>
                <MaterialIcons name="credit-card" size={24} color="#D82828" />
                <Text style={styles.accordionText}>Credit/Debit Card</Text>
              </View>
              <MaterialIcons
                name="expand-more"
                size={24}
                color="#666"
                style={{ transform: [{ rotate: getArrowRotation("card") }] }}
              />
            </TouchableOpacity>
            
            {selectedMethod === "card" && (
              <View style={styles.accordionContent}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.cardNumber && styles.inputError,
                  ]}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="number-pad"
                  value={cardNumber}
                  onChangeText={formatCardNumber}
                  maxLength={19}
                />
                
                <View style={styles.row}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.expiryDate && styles.inputError,
                      ]}
                      placeholder="MM/YY"
                      keyboardType="number-pad"
                      value={expiryDate}
                      onChangeText={formatExpiryDate}
                      maxLength={5}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={[
                        styles.input, 
                        errors.cvv && styles.inputError
                      ]}
                      placeholder="123"
                      keyboardType="number-pad"
                      value={cvv}
                      onChangeText={(text) => {
                        const cleaned = text.replace(/\D/g, '');
                        setCvv(cleaned);
                        if (cleaned.length >= 3) {
                          setErrors(prev => ({ ...prev, cvv: false }));
                        }
                      }}
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>
                
                {Object.values(errors).some(e => e) && (
                  <Text style={styles.errorText}>
                    Please check your card details
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* LankaPay */}
          <View style={[
            styles.accordion,
            selectedMethod === "lankapay" && styles.accordionOpen,
          ]}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setSelectedMethod(selectedMethod === "lankapay" ? null : "lankapay")}
              activeOpacity={0.7}
            >
              <View style={styles.accordionTitle}>
                <MaterialIcons name="account-balance" size={24} color="#D82828" />
                <Text style={styles.accordionText}>LankaPay</Text>
              </View>
              <MaterialIcons
                name="expand-more"
                size={24}
                color="#666"
                style={{ transform: [{ rotate: getArrowRotation("lankapay") }] }}
              />
            </TouchableOpacity>
            {selectedMethod === "lankapay" && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionContentText}>
                  You will be redirected to the LankaPay gateway to complete your payment securely.
                </Text>
              </View>
            )}
          </View>

          {/* Mobile Wallets */}
          <View style={[
            styles.accordion,
            selectedMethod === "wallet" && styles.accordionOpen,
          ]}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setSelectedMethod(selectedMethod === "wallet" ? null : "wallet")}
              activeOpacity={0.7}
            >
              <View style={styles.accordionTitle}>
                <MaterialIcons name="account-balance-wallet" size={24} color="#D82828" />
                <Text style={styles.accordionText}>Mobile Wallets</Text>
              </View>
              <MaterialIcons
                name="expand-more"
                size={24}
                color="#666"
                style={{ transform: [{ rotate: getArrowRotation("wallet") }] }}
              />
            </TouchableOpacity>
            {selectedMethod === "wallet" && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionContentText}>
                  Select your mobile wallet provider (e.g., FriMi, Genie, mCash) to proceed with payment.
                </Text>
              </View>
            )}
          </View>

          {/* COD */}
          <View style={[
            styles.accordion,
            selectedMethod === "cod" && styles.accordionOpen,
          ]}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setSelectedMethod(selectedMethod === "cod" ? null : "cod")}
              activeOpacity={0.7}
            >
              <View style={styles.accordionTitle}>
                <MaterialIcons name="payments" size={24} color="#D82828" />
                <Text style={styles.accordionText}>Cash on Delivery (COD)</Text>
              </View>
              <MaterialIcons
                name="expand-more"
                size={24}
                color="#666"
                style={{ transform: [{ rotate: getArrowRotation("cod") }] }}
              />
            </TouchableOpacity>
            {selectedMethod === "cod" && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionContentText}>
                  Please have the exact amount (LKR 1,250.00) ready for the delivery person. 
                  No online payment is required.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Debug Info - Remove this in production */}
        <View style={styles.debugSection}>
          <Text style={styles.debugText}>
            Debug: {isFormValid() ? "✅ Form Valid" : "❌ Form Invalid"}
          </Text>
          <Text style={styles.debugText}>
            Card: {cardNumber.replace(/\s/g, '').length}/16
          </Text>
          <Text style={styles.debugText}>
            Expiry: {expiryDate.length}/5
          </Text>
          <Text style={styles.debugText}>
            CVV: {cvv.length}/3
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            !isFormValid() && styles.confirmBtnDisabled,
          ]}
          onPress={handleConfirmPayment}
          disabled={!isFormValid()}
        >
          <Text style={styles.confirmText}>
            {isFormValid() ? "✅ Confirm Payment - LKR 1,250.00" : "❌ Complete Form First"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.successIcon}>
              <MaterialIcons name="check-circle" size={80} color="#22C55E" />
            </View>
            
            <Text style={styles.modalTitle}>{successTitle}</Text>
            <Text style={styles.modalMessage}>{successMessage}</Text>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={hideSuccessAlert}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
             
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#a4c7e7ff" 
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#c7d7e6ff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backBtn: { 
    padding: 4 
  },
  topBarTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#2D3748" 
  },
  scrollContent: {
    paddingBottom: 120,
  },
  amountSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#D82828",
  },
  amountLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  secureInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  secureText: { 
    fontSize: 14, 
    color: "#22C55E",
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  accordions: { 
    paddingHorizontal: 16,
  },
  accordion: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    overflow: "hidden",
  },
  accordionOpen: {
    borderColor: "#D82828",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  accordionTitle: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12 
  },
  accordionText: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#2D3748" 
  },
  accordionContent: { 
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  accordionContentText: { 
    fontSize: 14, 
    color: "#6B7280",
    lineHeight: 20,
  },
  inputLabel: { 
    fontSize: 14, 
    color: "#374151", 
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  row: { 
    flexDirection: "row",
    marginHorizontal: -4,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    textAlign: "center",
  },
  debugSection: {
    margin: 16,
    padding: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  confirmBtn: {
    backgroundColor: "#D82828",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmBtnDisabled: {
    backgroundColor: "#9CA3AF",
  },
  confirmText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  // Success Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22C55E',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#D82828',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    minWidth: 120,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});