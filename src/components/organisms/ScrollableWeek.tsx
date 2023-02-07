import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Key } from "react";
import { useGlobalContext } from "../../utils/context";
import { useNavigation } from "@react-navigation/native";
import DaysOfWeek from "../molecules/DaysOfWeek";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const ScrollableWeek = () => {
  const {
    curDate,
    setCurDate,
    weeksList,
    dateButtonPressed,
    isPhysicalScroll,
    weekListRef,
    weekScrollDay,
    WEEK_BUFFER_LEN,
    getCurWeek,
  } = useGlobalContext();

  const navigation = useNavigation<any>();

  const getWeekDates = ({ item }: { item: { date: Date; key: Key } }) => {
    const weekArray = getCurWeek(item.date);
    return (
      <View
        key={item.key}
        style={{
          width: SCREEN_WIDTH,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {Array(7)
          .fill(0)
          .map((_, i) => {
            return (
              <View key={i} style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    {
                      height: 35,
                      width: 35,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    weekArray[i].toDateString() === curDate && {
                      backgroundColor: "#AAA",
                    },
                  ]}
                  onPress={() => {
                    dateButtonPressed.current = true;
                    setCurDate(weekArray[i].toDateString());
                  }}
                >
                  <Text
                    style={[
                      { fontSize: 20, fontWeight: "400" },
                      weekArray[i].toDateString() === curDate && {
                        color: "#FFF",
                      },
                    ]}
                  >
                    {weekArray[i].getDate()}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DaysOfWeek />
      <FlatList
        data={weeksList}
        decelerationRate={"fast"}
        horizontal
        initialScrollIndex={Math.floor(WEEK_BUFFER_LEN / 2)}
        pagingEnabled
        ref={weekListRef}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          let newDate =
            weeksList[Math.floor(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)]
              .date;
          newDate.setDate(
            newDate.getDate() + new Date(curDate).getDay() - newDate.getDay()
          );
          weekScrollDay.current = true;
          if (isPhysicalScroll.current) setCurDate(newDate.toDateString());
          isPhysicalScroll.current = true;
        }}
        onScrollToIndexFailed={(err) => console.error(weeksList.length, err)}
        renderItem={({ item }) => getWeekDates({ item })}
      />
      <Text style={{ fontSize: 17, textAlign: "center" }}>{curDate}</Text>
      <TouchableOpacity
        style={styles.pullDownBarBtn}
        onPress={() => navigation.navigate("CalendarView")}
      >
        <View style={styles.pullDownBar} />
      </TouchableOpacity>
    </View>
  );
};

export default ScrollableWeek;

const styles = StyleSheet.create({
  container: { height: 100 },
  pullDownBarBtn: { padding: 8, marginTop: 4 },
  pullDownBar: {
    height: 5,
    width: 50,
    borderRadius: 5,
    backgroundColor: "black",
    alignSelf: "center",
  },
});
