import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScrollableWeek from "../organisms/ScrollableWeek";
import ScrollableDay from "../organisms/ScrollableDay";

const DayViewScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScrollableWeek />
      <ScrollableDay />
    </View>
  );
};

export default DayViewScreen;

const styles = StyleSheet.create({ container: { flex: 1 } });
