import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import HealthData from "./components/HealthData";
import RingProgress from "./components/RingProgress";
import useHealthData from "./hooks/useHealthData";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const STEPS_GOAL = 10000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, distance, flights } = useHealthData(date);

  const changeDate = (numDays) => {
    const currentDate = new Date(date); // Create a copy of the current date
    // Update the date by adding/subtracting the number of days
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate); // Update the state variable
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>

        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
      </View>

      <RingProgress progress={steps / STEPS_GOAL} />

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
});
