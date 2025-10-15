import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator"; // Your Tab Navigator
import ExerciseDetailScreen from "../screens/ExerciseDetailScreen";
import { RootStackParamList } from "../types/types";

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* Screen 1: Your entire Bottom Tab Navigator */}
      <Stack.Screen
        name="MainTabs"
        component={MainNavigator}
        options={{ headerShown: false }} // Hide the header for the tab screen
      />
      {/* Screen 2: The Exercise Detail screen that will appear on top of the tabs */}
      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ title: "Exercise Details" }} // Set a header title for this screen
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
