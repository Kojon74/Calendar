import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DaysOfWeek from "../molecules/DaysOfWeek";
import CalendarMonth from "../molecules/CalendarMonth";
import { useGlobalContext } from "../../utils/context";

type Props = {};

const MONTH_BUFFER_LEN = 7;

const Calendar = (props: Props) => {
  const { curDate } = useGlobalContext();
  const [curMonths, setCurMonths] =
    useState<Array<{ month: number; year: number }>>();

  useEffect(() => {
    setCurMonths(
      Array(MONTH_BUFFER_LEN)
        .fill(0)
        .map((_, i) => {
          let date = new Date(curDate);
          date.setMonth(date.getMonth() - Math.floor(MONTH_BUFFER_LEN / 2) + i);
          return { month: date.getMonth(), year: date.getFullYear() };
        })
    );
  }, []);

  return (
    <View>
      <DaysOfWeek />
      <FlatList
        data={curMonths}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CalendarMonth date={item} />}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
