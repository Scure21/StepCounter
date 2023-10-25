import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type DatePickerProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

/**
 *
 * DatePicker component
 *
 * @param date - Date object
 * @param setDate - React hook to set date
 *
 * @returns DatePicker component
 *
 * The DatePicker component is a component that allows the user
 * to toggle the date backwards and forward till todays date.
 *
 * When the user presses the left button, the date is set to the previous day.
 * When the user presses the right button, the date is set to the next day.
 * When today is the current date, the right button is disabled.
 */
const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const nextDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    setDate(currentDate);
  };

  const previousDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    setDate(currentDate);
  };

  const isDateToday = () => {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0);
  };

  return (
    <View style={styles.datePicker}>
      {/* Previous day btn */}
      <Pressable onPress={() => previousDay()} style={styles.datePickerButton}>
        <AntDesign name="left" size={20} color="#C3FF53" />
      </Pressable>
      {/* Date Text */}
      <Text style={styles.date}>{date.toDateString()}</Text>

      {/* Next day btn */}
      <Pressable
        onPress={() => (!isDateToday() ? nextDay() : null)}
        style={styles.datePickerButton}
      >
        {isDateToday() ? null : (
          <AntDesign name="right" size={20} color="#C3FF53" />
        )}
      </Pressable>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
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
