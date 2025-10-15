import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import ActivityCard from "../components/ActivityCard";
import {
  Activity,
  MainTabsParamList,
  RootStackParamList,
} from "../types/types";
import { fetchAllExercises } from "../services/ExerciseService"; // <-- import here
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList, "Home">,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [exercises, setExercises] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handlePressExercise = (exercise: Activity) => {
    navigation.navigate("ExerciseDetail", { exercise });
  };

  const renderItem = ({ item }: { item: Activity }) => (
    <ActivityCard activity={item} onPress={() => handlePressExercise(item)} />
  );

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchAllExercises();
        setExercises(data);
      } catch (err) {
        setError("Failed to load exercises.");
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercises</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : error ? (
        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
          {error}
        </Text>
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.list}
        />
      )}
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
