import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View, ActivityIndicator } from "react-native";

// 1. Import 'auth' directly from the native Firebase library
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import MainNavigator from "./src/navigation/MainNavigator";

// 2. We no longer need to call getAuth().
// The native library handles initialization automatically.

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // 3. The onAuthStateChanged function now comes from the imported auth() instance
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
