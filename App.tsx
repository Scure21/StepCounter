import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HealthData from "./components/HealthData";
import RingProgress from "./components/RingProgress";
import useHealthData from "./hooks/useHealthData";

const STEPS_GOAL = 10000;

export default function App() {
  const { steps, distance, flights } = useHealthData();

  return (
    <View style={styles.container}>
      <RingProgress progress={6000 / STEPS_GOAL} />

      <View style={styles.dataContainer}>
        <HealthData label="Steps" value={steps.toString()} />
        <HealthData
          label="Distance"
          value={`${(distance / 1000).toFixed(2)} km`}
        />
        <HealthData label="Flights Climbed" value={flights.toString()} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },
  dataContainer: {
    gap: 55,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
  },
});
