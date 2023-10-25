import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HealthData from "./components/HealthData";
import RingProgress from "./components/RingProgress";
import useHealthData from "./hooks/useHealthData";
import { useState } from "react";
import DatePicker from "./components/DatePicker";

const STEPS_GOAL = 10000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, distance, flights } = useHealthData(date);

  return (
    <View style={styles.container}>
      <DatePicker date={date} setDate={setDate} />
      <RingProgress progress={steps / STEPS_GOAL} />

      <View style={styles.dataContainer}>
        <HealthData label="Steps" value={steps.toFixed(0)} />
        <HealthData
          label="Distance"
          value={`${(distance / 1000).toFixed(2)} km`}
        />
        <HealthData label="Flights Climbed" value={flights.toString()} />
      </View>

      <StatusBar style="light" />
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
  datePicker: {
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  date: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    marginHorizontal: 20,
  },
  datePickerButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
});
