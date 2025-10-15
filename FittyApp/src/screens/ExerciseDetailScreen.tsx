import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";

// Define the type for this screen's route props, which includes the parameters we expect
type ExerciseDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ExerciseDetail"
>;

const ExerciseDetailScreen: React.FC = () => {
  // Use the useRoute hook to get the navigation parameters
  const route = useRoute<ExerciseDetailScreenRouteProp>();

  // Safely access the exercise object from the route parameters
  const exercise = route.params?.exercise;

  // If for some reason the exercise data isn't passed, show a fallback message.
  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text>Exercise details not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{exercise.name}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Muscle: {exercise.muscle}</Text>
          <Text style={styles.infoText}>Equipment: {exercise.equipment}</Text>
          <Text style={styles.infoText}>Difficulty: {exercise.difficulty}</Text>
        </View>

        <Text style={styles.instructionsHeader}>Instructions</Text>
        <Text style={styles.instructions}>{exercise.instructions}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  infoBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  instructionsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ExerciseDetailScreen;
