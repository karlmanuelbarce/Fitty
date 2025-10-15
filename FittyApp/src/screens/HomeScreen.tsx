import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import ActivityCard from "../components/ActivityCard";
import {
  Activity,
  MainTabsParamList,
  RootStackParamList,
} from "../types/types";
import exercises from "../../assets/exercises.json";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Create a composite type that understands both the Stack and Tab navigators
type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, "Home">,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // This function will be called when an item is pressed
  const handlePressExercise = (exercise: Activity) => {
    // Navigate to the 'ExerciseDetail' screen and pass the selected exercise as a parameter
    navigation.navigate("ExerciseDetail", { exercise });
  };

  // Update renderItem to pass the onPress handler to the ActivityCard
  const renderItem = ({ item }: { item: Activity }) => (
    <ActivityCard activity={item} onPress={() => handlePressExercise(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercises</Text>
      </View>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
