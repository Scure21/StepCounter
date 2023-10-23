import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HealthData from "./components/HealthData";
import RingProgress from "./components/RingProgress";

export default function App() {
  return (
    <View style={styles.container}>
      <RingProgress progress={0.25} />

      <View style={styles.dataContainer}>
        <HealthData label="Steps" value="1,000" />
        <HealthData label="Distance" value="1.2 km" />
        <HealthData label="Flights Climbed" value="3" />
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
