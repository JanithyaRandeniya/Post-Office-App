import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Types
type ParcelType = "Private" | "PostOffice" | "Company";
type ServiceType = "Express" | "Standard" | "Economy" | "Priority" | "International";
type CountryType = 
  | "Sri Lanka" 
  | "India" 
  | "USA" 
  | "UK" 
  | "Australia" 
  | "Japan" 
  | "Germany" 
  | "Canada" 
  | "UAE" 
  | "Singapore";

interface PriceRates {
  serviceRates: Record<ServiceType, number>;
  countryMultipliers: Record<CountryType, number>;
  insuranceRate: number;
  volumetricFactor: number;
  minimumCharge: number;
}

interface ParcelFormData {
  parcelType: ParcelType;
  senderAddress: string;
  receiverAddress: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  serviceType: ServiceType | "";
  destinationCountry: CountryType | "";
  insured: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// API Configuration
const API_CONFIG = {
  BASE_URL: Platform.select({
    android: "http://10.0.2.2:3000",
    ios: "http://localhost:3000",
    web: "http://localhost:3000",
  }),
  ENDPOINTS: {
    CREATE_PARCEL: "/parcels",
  },
};

// Price calculation constants
const PRICE_RATES: PriceRates = {
  serviceRates: {
    Express: 4500,
    Standard: 3000,
    Economy: 2100,
    Priority: 6000,
    International: 7500,
  },
  countryMultipliers: {
    "Sri Lanka": 1.0,
    India: 1.2,
    USA: 1.8,
    UK: 1.7,
    Australia: 1.6,
    Japan: 1.5,
    Germany: 1.5,
    Canada: 1.6,
    UAE: 1.4,
    Singapore: 1.3,
  },
  insuranceRate: 0.05,
  volumetricFactor: 5000,
  minimumCharge: 500,
};

// Country list for Picker
const COUNTRIES: CountryType[] = [
  "Sri Lanka",
  "India",
  "USA",
  "UK",
  "Australia",
  "Japan",
  "Germany",
  "Canada",
  "UAE",
  "Singapore",
];

// Service types for Picker
const SERVICE_TYPES: ServiceType[] = [
  "Express",
  "Standard",
  "Economy",
  "Priority",
  "International",
];

// Image size constants
const IMAGE_SIZES = {
  // For upload button
  uploadButton: {
    width: screenWidth - 40, // Screen width minus horizontal padding
    height: 180,
  },
  // For selected image
  selectedImage: {
    width: screenWidth - 40,
    height: 180,
  },
  // For thumbnail preview (if needed)
  thumbnail: {
    width: 100,
    height: 100,
  }
};

export default function EnterParcelDetails(): React.ReactElement {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState<ParcelFormData>({
    parcelType: "Private",
    senderAddress: "",
    receiverAddress: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    serviceType: "",
    destinationCountry: "",
    insured: false,
  });

  // UI State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [priceBreakdown, setPriceBreakdown] = useState<string>("");
  const [imageSize, setImageSize] = useState<{width: number, height: number} | null>(null);

  // Animation
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Update form data helper
  const updateFormData = <K extends keyof ParcelFormData>(
    field: K,
    value: ParcelFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Go to next page with animation
  const goNextPageWithRotate = (): void => {
    rotation.value = withTiming(
      rotation.value + 360,
      {
        duration: 600,
        easing: Easing.inOut(Easing.ease),
      },
      () => {
        router.push("/home/driver/page");
      }
    );
  };

  // Calculate price
  const calculatePrice = (): void => {
    const { weight, length, width, height, serviceType, destinationCountry, parcelType, insured } =
      formData;

    const weightNum = parseFloat(weight);
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);

    if (
      isNaN(weightNum) ||
      isNaN(lengthNum) ||
      isNaN(widthNum) ||
      isNaN(heightNum) ||
      !serviceType ||
      !destinationCountry
    ) {
      setCalculatedPrice(null);
      setPriceBreakdown("");
      return;
    }

    const volume = lengthNum * widthNum * heightNum;
    const volumetricWeight = volume / PRICE_RATES.volumetricFactor;
    const chargeableWeight = Math.max(weightNum, volumetricWeight);
    const baseRate = PRICE_RATES.serviceRates[serviceType];
    const countryMultiplier =
      PRICE_RATES.countryMultipliers[destinationCountry as CountryType];

    let basePrice = chargeableWeight * baseRate * countryMultiplier;
    const parcelTypeAdjustment =
      parcelType === "PostOffice" ? 0.9 : parcelType === "Company" ? 0.8 : 1;
    basePrice *= parcelTypeAdjustment;

    const insuranceCost = insured ? basePrice * PRICE_RATES.insuranceRate : 0;
    const totalPrice = Math.max(
      basePrice + insuranceCost,
      PRICE_RATES.minimumCharge
    );

    setCalculatedPrice(Math.round(totalPrice));

    // Detailed breakdown
    const discountPercent = ((1 - parcelTypeAdjustment) * 100).toFixed(0);
    const discountText =
      discountPercent === "0"
        ? "No discount"
        : `${discountPercent}% discount applied`;

    setPriceBreakdown(
      `Chargeable Weight: ${chargeableWeight.toFixed(2)} kg\n` +
        `Base Rate: LKR ${baseRate.toLocaleString()}\n` +
        `Country Multiplier: ${countryMultiplier}x\n` +
        `${discountText}\n` +
        `Insurance: ${insured ? "Yes (+5%)" : "No"}`
    );
  };

  // Recalculate price when form data changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => calculatePrice(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [formData]);

  // Get image dimensions
  const getImageDimensions = (uri: string): Promise<{width: number, height: number}> => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'web') {
        const img = new window.Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = uri;
      } else {
        Image.getSize(
          uri,
          (width, height) => resolve({ width, height }),
          reject
        );
      }
    });
  };

  // Image picker
  const openImagePicker = async (): Promise<void> => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
          setSelectedImageFile(file);
          
          // Get image dimensions
          try {
            const dimensions = await getImageDimensions(imageUrl);
            setImageSize(dimensions);
          } catch (error) {
            console.warn("Could not get image dimensions:", error);
          }
        }
      };
      input.click();
    } else {
      // Request permissions for mobile
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Sorry, we need camera roll permissions to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setImageSize({
          width: result.assets[0].width,
          height: result.assets[0].height
        });
      }
    }
  };

  // Create FormData for submission
  const createFormData = (): FormData => {
    const formDataObj = new FormData();

    // Add all text fields
    formDataObj.append("parcelType", formData.parcelType);
    formDataObj.append("senderAddress", formData.senderAddress.trim());
    formDataObj.append("receiverAddress", formData.receiverAddress.trim());
    formDataObj.append("weight", parseFloat(formData.weight).toString());
    formDataObj.append(
      "dimensions",
      `${formData.length || "0"}x${formData.width || "0"}x${formData.height || "0"}`
    );
    formDataObj.append("serviceType", formData.serviceType);
    formDataObj.append("destinationCountry", formData.destinationCountry);
    formDataObj.append("insured", formData.insured.toString());
    formDataObj.append("totalPrice", (calculatedPrice || 0).toString());

    // Add image if exists
    if (selectedImage) {
      // For web
      if (Platform.OS === "web" && selectedImageFile) {
        formDataObj.append("image", selectedImageFile);
      }
      // For mobile (React Native)
      else if (Platform.OS !== "web" && selectedImage) {
        // Extract file info from URI
        const uriParts = selectedImage.split(".");
        const fileExtension = uriParts[uriParts.length - 1];

        // Create file object
        const file = {
          uri: selectedImage,
          name: `parcel_${Date.now()}.${fileExtension}`,
          type: `image/${fileExtension}`,
        } as any;

        formDataObj.append("image", file);
      }
    }

    return formDataObj;
  };

  // Validate form
  const validateForm = (): boolean => {
    const { senderAddress, receiverAddress, weight, serviceType, destinationCountry } = formData;

    if (!senderAddress.trim() || !receiverAddress.trim()) {
      Alert.alert("Error", "Please enter both sender and receiver addresses.");
      return false;
    }

    if (!weight || parseFloat(weight) <= 0) {
      Alert.alert("Error", "Please enter a valid weight.");
      return false;
    }

    if (!serviceType) {
      Alert.alert("Error", "Please select a service type.");
      return false;
    }

    if (!destinationCountry) {
      Alert.alert("Error", "Please select a destination country.");
      return false;
    }

    if (!calculatedPrice || calculatedPrice <= 0) {
      Alert.alert("Error", "Please wait for price calculation to complete.");
      return false;
    }

    return true;
  };

  // Submit parcel to backend
  const submitParcel = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // Create FormData
      const submissionData = createFormData();

      // Make API request
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_PARCEL}`,
        {
          method: "POST",
          body: submissionData,
          headers:
            Platform.OS === "web"
              ? {}
              : {
                  "Content-Type": "multipart/form-data",
                },
        }
      );

      let responseData: ApiResponse;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        responseData = { success: false, message: "Invalid response from server" };
      }

      if (response.ok) {
        Alert.alert("Success!", "Parcel details have been saved successfully.", [
          {
            text: "Continue",
            onPress: () => {
              resetForm();
              router.push("/home/driver/page");
            },
          },
        ]);
      } else {
        let errorMessage = "Failed to save parcel details.";
        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
        Alert.alert("Submission Error", errorMessage);
      }
    } catch (error: any) {
      console.error("Network Error:", error);
      Alert.alert(
        "Connection Error",
        "Unable to connect to the server. Please check:\n1. Your internet connection\n2. Backend server is running\n3. Correct API URL"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = (): void => {
    setFormData({
      parcelType: "Private",
      senderAddress: "",
      receiverAddress: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      serviceType: "",
      destinationCountry: "",
      insured: false,
    });
    setSelectedImage(null);
    setSelectedImageFile(null);
    setCalculatedPrice(null);
    setPriceBreakdown("");
    setImageSize(null);
  };

  // Calculate image style based on dimensions
  const getImageStyle = () => {
    if (!selectedImage) return null;
    
    // Default size
    let width = IMAGE_SIZES.selectedImage.width;
    let height = IMAGE_SIZES.selectedImage.height;
    
    // If we have image dimensions, maintain aspect ratio
    if (imageSize) {
      const aspectRatio = imageSize.width / imageSize.height;
      
      // Limit maximum width and height
      const maxWidth = IMAGE_SIZES.selectedImage.width;
      const maxHeight = 250; // Slightly taller than default
      
      if (aspectRatio > 1) {
        // Landscape image
        width = Math.min(maxWidth, imageSize.width);
        height = width / aspectRatio;
      } else {
        // Portrait or square image
        height = Math.min(maxHeight, imageSize.height);
        width = height * aspectRatio;
      }
      
      // Ensure minimum dimensions
      width = Math.max(width, 100);
      height = Math.max(height, 100);
    }
    
    return {
      width,
      height,
      borderRadius: 10,
    };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#212529" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Enter Parcel Details</Text>
        <TouchableOpacity onPress={resetForm} style={styles.resetButton}>
          <MaterialIcons name="refresh" size={24} color="#246dc6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Parcel Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Parcel Type <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.parcelType}
              onValueChange={(value) => updateFormData("parcelType", value as ParcelType)}
              style={styles.picker}
            >
              <Picker.Item label="Private" value="Private" />
              <Picker.Item label="Post Office" value="PostOffice" />
              <Picker.Item label="Company" value="Company" />
            </Picker>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Sender Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Enter full sender address"
            style={styles.inputLarge}
            value={formData.senderAddress}
            onChangeText={(text) => updateFormData("senderAddress", text)}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Receiver Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Enter full delivery address"
            style={styles.inputLarge}
            value={formData.receiverAddress}
            onChangeText={(text) => updateFormData("receiverAddress", text)}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Weight & Dimensions */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Weight (kg) <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="e.g., 2.5"
            keyboardType="decimal-pad"
            style={[styles.inputLarge, { marginBottom: 10 }]}
            value={formData.weight}
            onChangeText={(text) => updateFormData("weight", text)}
          />

          <Text style={styles.label}>Dimensions (cm)</Text>
          <View style={styles.dimensionsContainer}>
            <View style={styles.dimensionInputWrapper}>
              <Text style={styles.dimensionLabel}>Length</Text>
              <TextInput
                placeholder="L"
                keyboardType="decimal-pad"
                style={styles.dimInput}
                value={formData.length}
                onChangeText={(text) => updateFormData("length", text)}
              />
            </View>
            <View style={styles.dimensionInputWrapper}>
              <Text style={styles.dimensionLabel}>Width</Text>
              <TextInput
                placeholder="W"
                keyboardType="decimal-pad"
                style={styles.dimInput}
                value={formData.width}
                onChangeText={(text) => updateFormData("width", text)}
              />
            </View>
            <View style={styles.dimensionInputWrapper}>
              <Text style={styles.dimensionLabel}>Height</Text>
              <TextInput
                placeholder="H"
                keyboardType="decimal-pad"
                style={styles.dimInput}
                value={formData.height}
                onChangeText={(text) => updateFormData("height", text)}
              />
            </View>
          </View>
        </View>

        {/* Service Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Service Type <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.serviceType}
              onValueChange={(value) => updateFormData("serviceType", value as ServiceType)}
              style={styles.picker}
            >
              <Picker.Item label="Select Service Type" value="" />
              {SERVICE_TYPES.map((service) => (
                <Picker.Item key={service} label={service} value={service} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Destination Country */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Destination Country <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.destinationCountry}
              onValueChange={(value) => updateFormData("destinationCountry", value as CountryType)}
              style={styles.picker}
            >
              <Picker.Item label="Select Country" value="" />
              {COUNTRIES.map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Insurance */}
        <View style={styles.inputGroup}>
          <View style={styles.insuranceContainer}>
            <Text style={styles.label}>Insurance Coverage</Text>
            <Switch
              value={formData.insured}
              onValueChange={(value) => updateFormData("insured", value)}
              trackColor={{ false: "#767577", true: "#246dc6" }}
              thumbColor="#f4f3f4"
            />
          </View>
          <Text style={styles.insuranceNote}>
            {formData.insured
              ? "✓ Parcel is insured (+5% to total)"
              : "✗ No insurance coverage"}
          </Text>
        </View>

        {/* Price Display */}
        <View style={styles.priceBox}>
          <Text style={styles.priceTitle}>Estimated Cost</Text>
          {calculatedPrice ? (
            <>
              <Text style={styles.priceValue}>LKR {calculatedPrice.toLocaleString()}</Text>
              <Text style={styles.priceBreakdown}>{priceBreakdown}</Text>
            </>
          ) : (
            <Text style={styles.emptyPriceText}>
              Fill in all required fields to see estimated price
            </Text>
          )}
        </View>

        {/* Image Upload */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Parcel Photo (Optional)</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={openImagePicker}>
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: selectedImage }} 
                  style={[getImageStyle(), styles.selectedImage]} 
                  resizeMode="contain"
                />
                {imageSize && (
                  <View style={styles.imageInfo}>
                    <Text style={styles.imageInfoText}>
                      {imageSize.width} × {imageSize.height} px
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <MaterialIcons name="add-a-photo" size={40} color="#666" />
                <Text style={styles.uploadText}>Tap to upload photo</Text>
                <Text style={styles.uploadSubtext}>Recommended: 800×600px or larger</Text>
                <Text style={styles.uploadSubtext}>Max size: 5MB</Text>
              </View>
            )}
          </TouchableOpacity>
          
          {/* Image Size Info */}
          {selectedImage && (
            <TouchableOpacity 
              style={styles.changeImageButton}
              onPress={openImagePicker}
            >
              <MaterialIcons name="edit" size={16} color="#246dc6" />
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={submitParcel}
          style={[
            styles.submitButton,
            (submitting || !calculatedPrice) && styles.submitButtonDisabled,
          ]}
          disabled={submitting || !calculatedPrice}
        >
          {submitting ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.submitButtonText}>Saving...</Text>
            </View>
          ) : (
            <Text style={styles.submitButtonText}>
              {calculatedPrice
                ? `Submit Parcel - LKR ${calculatedPrice.toLocaleString()}`
                : "Complete Details First"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Next Button FAB */}
      <Animated.View style={[animatedStyle, styles.fabContainer]}>
        <TouchableOpacity onPress={goNextPageWithRotate} style={styles.nextFab}>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a4c7e7ff" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#c5daf1ff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    elevation: 2,
  },
  topTitle: { fontSize: 20, fontWeight: "bold", color: "#212529" },
  resetButton: { padding: 5 },
  scroll: { paddingHorizontal: 20, paddingTop: 10 },
  inputGroup: { marginTop: 15 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#495057" },
  required: { color: "#dc3545" },
  inputLarge: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ced4da",
    fontSize: 16,
    minHeight: 50,
  },
  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    overflow: "hidden",
  },
  picker: { height: 50, width: "100%" },
  dimensionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  dimensionInputWrapper: { alignItems: "center", width: "30%" },
  dimensionLabel: { fontSize: 12, color: "#6c757d", marginBottom: 5 },
  dimInput: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ced4da",
    fontSize: 16,
  },
  insuranceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  insuranceNote: { fontSize: 12, color: "#6c757d", fontStyle: "italic" },
  priceBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#246dc6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceTitle: { fontSize: 16, color: "#666", marginBottom: 5 },
  priceValue: { fontSize: 28, fontWeight: "bold", color: "#246dc6", marginVertical: 5 },
  priceBreakdown: { fontSize: 12, color: "#6c757d", marginTop: 10, lineHeight: 18 },
  emptyPriceText: {
    textAlign: "center",
    color: "#adb5bd",
    fontStyle: "italic",
    padding: 10,
  },
  uploadButton: {
    marginTop: 5,
    minHeight: 180,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#adb5bd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  selectedImage: {
    backgroundColor: '#f0f0f0',
  },
  imageInfo: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  imageInfoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  uploadContent: { 
    alignItems: "center",
    paddingVertical: 20,
  },
  uploadText: { 
    marginTop: 8, 
    color: "#495057",
    fontSize: 14,
    fontWeight: '500',
  },
  uploadSubtext: { 
    fontSize: 12, 
    color: "#6c757d", 
    marginTop: 2 
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 8,
  },
  changeImageText: {
    color: "#246dc6",
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: "#246dc6",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#246dc6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: "#4b4dd8ff",
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fabContainer: { position: "absolute", bottom: 30, right: 20 },
  nextFab: {
    backgroundColor: "#2550c5ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  debugInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
  },
  debugText: {
    fontSize: 11,
    color: "#6c757d",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});