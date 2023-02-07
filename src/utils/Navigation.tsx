import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DayViewScreen from "../components/screens/DayViewScreen";
import CalendarViewScreen from "../components/screens/CalendarViewScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  let screens;

  screens = (
    <>
      <Stack.Screen
        name="DayView"
        component={DayViewScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CalendarView"
        component={CalendarViewScreen}
        options={{ animationEnabled: false }}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DayView"
        screenOptions={{ headerShown: false }}
      >
        {screens}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
