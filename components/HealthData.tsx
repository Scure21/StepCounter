import { StyleSheet, Text, View } from "react-native";
import React from "react";

type HealthDataProps = {
  label: string;
  value: string;
};

const HealthData = ({ label, value }: HealthDataProps) => {
  return (
    <View>
      <Text style={styles.label}>{label} </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default HealthData;

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 20,
  },
  value: {
    fontSize: 45,
    fontWeight: "500",
    color: "#AFB3BE",
  },
});
