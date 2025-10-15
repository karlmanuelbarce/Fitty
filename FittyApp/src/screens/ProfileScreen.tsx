import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

// ✅ 1. Change the import to use the React Native Firebase library
import { getAuth, signOut } from "@react-native-firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

const ProfileScreen: React.FC = () => {
  const handleSignOut = async () => {
    // This logic is now correct because it uses the right library
    const auth = getAuth();
    try {
      await signOut(auth);
      // Now the listener in App.tsx will hear this change!
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Error", "Could not sign out. Please try again.");
    }
  };

  // The rest of your component's JSX and styles are correct and don't need to change.
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
      />
      <Text style={styles.name}>Jane Doe</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>125</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>512</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>82</Text>
          <Text style={styles.statLabel}>Activities</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// ...your styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#FC4C02",
  },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  statsContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  stat: { alignItems: "center" },
  statNumber: { fontSize: 20, fontWeight: "bold" },
  statLabel: { fontSize: 14, color: "gray", marginTop: 4 },
  signOutButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  signOutButtonText: { color: "#333", fontSize: 16, fontWeight: "500" },
});

export default ProfileScreen;
