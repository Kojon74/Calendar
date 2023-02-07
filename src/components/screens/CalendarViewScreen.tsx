import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CalendarFilter from "../organisms/CalendarFilter";
import Calendar from "../organisms/Calendar";

type Props = {};

const CalendarViewScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* <CalendarFilter /> */}
      <Calendar />
    </View>
  );
};

export default CalendarViewScreen;

const styles = StyleSheet.create({ container: { marginHorizontal: 10 } });
