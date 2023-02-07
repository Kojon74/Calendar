import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../utils/context";

type Props = {
  date: { month: number; year: number };
};
const SCREEN_WIDTH = Dimensions.get("screen").width;

const CalendarMonth = ({ date }: Props) => {
  const navigation = useNavigation<any>();
  const { setCurDate } = useGlobalContext();

  const { month, year } = date;
  const dateObj = new Date(year, month + 1, 0);

  const monthStr = dateObj.toLocaleString("default", { month: "long" });
  const daysInMonth = dateObj.getDate();
  const firstDayOffset = new Date(year, month, 1).getDay();
  console.log(firstDayOffset);

  const lastDayOffset = 6 - dateObj.getDay();

  const todayDate = new Date().setHours(0, 0, 0, 0);

  return (
    <View>
      <Text style={styles.monthText}>{monthStr}</Text>
      <View style={styles.datesContainer}>
        {Array(daysInMonth + firstDayOffset + lastDayOffset)
          .fill(0)
          .map((_, i) => {
            const _curDate = new Date(year, month, i - firstDayOffset + 1);
            return i < firstDayOffset || i >= daysInMonth + firstDayOffset ? (
              <View key={i} style={styles.date} />
            ) : (
              <TouchableOpacity
                key={i}
                style={styles.date}
                onPress={() => {
                  setCurDate(_curDate.toDateString());
                  navigation.navigate("DayView");
                }}
              >
                <Text
                  style={[
                    styles.dateText,
                    todayDate === _curDate.setHours(0, 0, 0, 0) &&
                      styles.todayDate,
                  ]}
                >
                  {i - firstDayOffset + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default CalendarMonth;

const styles = StyleSheet.create({
  monthText: { fontSize: 20, fontWeight: "600" },
  datesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  date: {
    width: (SCREEN_WIDTH - 20) / 7,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  todayDate: {
    backgroundColor: "#C9B2F8",
    borderRadius: 17.5,
    overflow: "hidden",
    width: 35,
    lineHeight: 35,
    textAlign: "center",
  },
  dateText: { fontSize: 17 },
});
