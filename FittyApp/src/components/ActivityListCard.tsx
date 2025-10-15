import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Activity } from "../types/Activity";

interface ActivityCardProps {
  item: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>
        Muscle: {item.muscle} | Difficulty: {item.difficulty}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
});

export default ActivityCard;
