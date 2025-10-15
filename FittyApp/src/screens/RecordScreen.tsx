import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// Assuming you have a Value component like this in ../components/Value
import Value from "../components/Value";
import RingProgress from "../components/RingProgress";
import MapView from "react-native-maps";
// 1. Import the Pedometer from expo-sensors
import { Pedometer } from "expo-sensors";

const RecordScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  // 2. Add state to hold the step count
  const [stepCount, setStepCount] = useState<number>(0);

  // 3. Use an effect to handle the pedometer subscription
  useEffect(() => {
    // Use a more robust inline type for the subscription object
    let subscription: { remove: () => void } | undefined;

    const subscribe = async () => {
      // Check if the pedometer is available on the device
      const isAvailable = await Pedometer.isAvailableAsync();
      if (!isAvailable) {
        console.log("Pedometer is not available on this device.");
        return;
      }

      // Request permission to access the device's motion activity
      const { status } = await Pedometer.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access pedometer was denied.");
        return;
      }

      // Start listening for step count updates
      subscription = Pedometer.watchStepCount((result) => {
        setStepCount(result.steps);
      });
    };

    subscribe();

    // The cleanup function will run when the component unmounts
    return () => {
      subscription && subscription.remove();
    };
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ready to Go?</Text>
      <RingProgress progress={0.5} />

      {isRecording && (
        <Text style={styles.statusText}>Activity in progress... ⏱️</Text>
      )}
      <View style={styles.values}>
        {/* 4. Display the stepCount from state instead of a hardcoded value */}
        <Value label="Steps" value={stepCount.toString()} />
        <Value label="Distance" value="0,75 km" />
        <Value label="Flights Climbed" value="12" />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          isRecording ? styles.stopButton : styles.startButton,
        ]}
        onPress={() => setIsRecording(!isRecording)}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Stop Recording" : "Start Activity"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  startButton: {
    backgroundColor: "#FC4C02",
  },
  stopButton: {
    backgroundColor: "#B22222",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  values: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 25,
    marginTop: 40,
    width: "100%",
  },
});

export default RecordScreen;
