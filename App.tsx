import { Key, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppProvider } from "./src/utils/context";
import Navigation from "./src/utils/Navigation";

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}

const styles = StyleSheet.create({});
