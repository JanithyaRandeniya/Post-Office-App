import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

const SERVER =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";

export default function ManageParcels() {
  const [parcels, setParcels] = useState<any[]>([]);

  const load = async () => {
    try {
      const res = await fetch(`${SERVER}/parcels`);
      const data = await res.json();
      setParcels(data);
    } catch (error) {
      console.error("Failed to load parcels:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getImageUri = (imageUrl: string): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return `${SERVER}${imageUrl}`;
    }   
    return `${SERVER}/uploads/parcels/${imageUrl}`;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Parcels</Text>
      </View>
      <ScrollView style={styles.container}>
        {parcels.map((p) => (
          <View key={p.id} style={styles.card}>
            <View style={styles.row}>
              {/* LEFT SIDE IMAGE */}
              {p.imageUrl ? (
                <Image
                  source={{ uri: getImageUri(p.imageUrl) }}
                  style={styles.image}
                  onError={(error) => {
                    console.log(`Image failed to load: ${getImageUri(p.imageUrl)}`);
                    console.log('Error:', error.nativeEvent.error);
                  }}
                  onLoad={() => {
                    console.log(`Image loaded successfully: ${getImageUri(p.imageUrl)}`);
                  }}
                />
              ) : (
                <View style={[styles.image, styles.noImage]}>
                  <Text style={styles.noImageText}>No Image</Text>
                </View>
              )}

              {/* MIDDLE DETAILS */}
              <View style={styles.details}>
                <Text style={styles.text}>Type: {p.parcelType}</Text>
                <Text style={styles.text}>Sender Address: {p.senderAddress}</Text>
                <Text style={styles.text}>Receiver Address: {p.receiverAddress}</Text>
                <Text style={styles.text}>Weight: {p.weight}</Text>
                <Text style={styles.text}>Service Type: {p.serviceType}</Text>
                <Text style={styles.text}>Country: {p.destinationCountry}</Text>
                <Text style={styles.text}>Estimated Cost: {p.totalPrice}</Text>
              </View>

              {/* RIGHT SIDE BUTTON */}
              {p.status === "Pending" && (
                <View style={styles.action}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={async () => {
                      try {
                        await fetch(`${SERVER}/parcels/${p.id}/deliver`, {
                          method: "PATCH",
                        });
                        load();
                      } catch (error) {
                        console.error("Failed to update parcel:", error);
                      }
                    }}
                  >
                    <Text style={styles.btnText}>Delivered</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#85acccff",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center" as const,
    backgroundColor: "#4980d8ff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700" as const,
    color: "#ffffff",
    textAlign: "center" as const,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#e0e7ff",
  },
  noImage: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  noImageText: {
    fontSize: 10,
    color: "#999",
  },
  details: {
    flex: 1,
  },
  text: {
    fontSize: 13,
    marginBottom: 3,
    color: "#374151",
  },
  action: {
    justifyContent: "center" as const,
    marginLeft: 6,
  },
  btn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700" as const,
  },
});