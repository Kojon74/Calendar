import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DaysOfWeek = () => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <View style={styles.container}>
      {daysOfWeek.map((day, i) => (
        <Text key={i} style={styles.text}>
          {day}
        </Text>
      ))}
    </View>
  );
};

export default DaysOfWeek;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    width: 35,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
});
