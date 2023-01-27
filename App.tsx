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

const SCREEN_WIDTH = Dimensions.get("screen").width;

const getSurroundingDays = (date: Date, dateBufferLen: number) =>
  Array(dateBufferLen)
    .fill(0)
    .map((_, i) => {
      let curDate = new Date(date);
      curDate.setUTCDate(
        curDate.getUTCDate() + i - Math.floor(dateBufferLen / 2)
      );
      return {
        date: curDate,
        key: curDate.getTime().toString(),
      };
    });

const getSurroundingWeeks = (date: Date, weekBufferLen: number) =>
  Array(weekBufferLen)
    .fill(0)
    .map((_, i) => {
      let curDate = new Date(date);
      curDate.setUTCDate(
        curDate.getUTCDate() + (i - Math.floor(weekBufferLen / 2)) * 7
      );
      return {
        date: curDate,
        key: curDate.getTime().toString(),
      };
    });

const getCurWeek = (curDate: Date) =>
  Array(7)
    .fill(0)
    .map((_, i) => {
      let weekDate = new Date(curDate);
      weekDate.setDate(weekDate.getDate() - weekDate.getDay() + i);
      return weekDate;
    });

export default function App() {
  const dateBufferLen = 7;
  const weekBufferLen = 7;
  const [curDate, setCurDate] = useState(new Date().toDateString());
  const [datesList, setDatesList] = useState(
    getSurroundingDays(new Date(), dateBufferLen)
  );
  const [curWeek, setCurWeek] = useState(getCurWeek(new Date()));
  const [weeksList, setWeeksList] = useState(
    getSurroundingWeeks(new Date(), weekBufferLen)
  ); // One day for each week centered around the current day

  const dateListRef = useRef(null);
  const weekListRef = useRef(null);

  let isPhysicalScroll = useRef(true);
  let betweenScrolls = useRef(false);
  let scrollUpdated = useRef(false);
  let weekScrollDay = useRef(false);

  useEffect(() => {
    (async () => {
      const curDateObj = new Date(curDate);
      if (
        curDateObj <= datesList[1].date ||
        curDateObj >= datesList[dateBufferLen - 2].date
      ) {
        if (betweenScrolls) scrollUpdated.current = true;
        setDatesList(getSurroundingDays(curDateObj, dateBufferLen));
        dateListRef.current.scrollToOffset({
          animated: false,
          offset: Math.floor(dateBufferLen / 2) * SCREEN_WIDTH,
        });
      }
      // Scroll to adjacent week if you have scrolled date out of current week range
      if (curDateObj < curWeek[0] || curDateObj > curWeek[6]) {
        console.log(weekScrollDay.current);
        setTimeout(() => {
          setCurWeek(getCurWeek(curDateObj));
        }, 175);
        if (!weekScrollDay.current) {
          let curIndex;
          const curWeekString = curWeek.map((date) => date.toDateString());
          weeksList.forEach(({ date }, i) => {
            if (curWeekString.includes(date.toDateString())) curIndex = i;
          });
          const newIndex = curIndex + (curDateObj < curWeek[0] ? -1 : 1);
          isPhysicalScroll.current = false;

          weekListRef.current?.scrollToIndex({ index: newIndex });
        }
      }
      weekScrollDay.current = false;
    })();
  }, [curDate]);

  useEffect(() => {
    let curWeekSun = curWeek[0];
    curWeekSun.setHours(0, 0, 0, 0);
    let lowerBoundSun = getCurWeek(weeksList[1].date)[0];
    lowerBoundSun.setHours(0, 0, 0, 0);
    let upperBoundSun = getCurWeek(weeksList[weekBufferLen - 2].date)[0];
    upperBoundSun.setHours(0, 0, 0, 0);
    if (curWeekSun <= lowerBoundSun || curWeekSun >= upperBoundSun) {
      setWeeksList(getSurroundingWeeks(curWeekSun, weekBufferLen));
      weekListRef.current.scrollToOffset({
        animated: false,
        offset: Math.floor(dateBufferLen / 2) * SCREEN_WIDTH,
      });
    }
  }, [curWeek]);

  const getDaysOfWeek = () => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {daysOfWeek.map((day, i) => (
          <Text
            key={i}
            style={{
              width: 35,
              fontSize: 12,
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const getWeekDates = ({
    item,
    index,
    separators,
  }: {
    item: { date: Date; key: Key };
    index: any;
    separators: any;
  }) => {
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

  const getDateInfo = ({
    item,
    index,
    separators,
  }: {
    item: any;
    index: any;
    separators: any;
  }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }}>
        <Text>{item.date.toDateString()}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      {getDaysOfWeek()}
      <View style={{ height: 65, marginBottom: 5 }}>
        <FlatList
          data={weeksList}
          decelerationRate={"fast"}
          horizontal
          initialScrollIndex={Math.floor(weekBufferLen / 2)}
          pagingEnabled
          ref={weekListRef}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            let newDate =
              weeksList[
                Math.floor(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)
              ].date;
            newDate.setDate(
              newDate.getDate() + new Date(curDate).getDay() - newDate.getDay()
            );
            weekScrollDay.current = true;
            if (isPhysicalScroll.current) setCurDate(newDate.toDateString());
            isPhysicalScroll.current = true;
          }}
          onScrollToIndexFailed={(err) => console.error(err)}
          renderItem={({ item, index, separators }) =>
            getWeekDates({ item, index, separators })
          }
        />
        <Text style={{ fontSize: 17, textAlign: "center" }}>{curDate}</Text>
      </View>
      <FlatList
        data={datesList}
        horizontal
        initialScrollIndex={Math.floor(dateBufferLen / 2)}
        pagingEnabled
        ref={dateListRef}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "green" }}
        onMomentumScrollEnd={(e) => {
          weekScrollDay.current = false;
          betweenScrolls.current = false;
          if (!scrollUpdated.current)
            setCurDate(
              datesList[
                Math.floor(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)
              ].date.toDateString()
            );
        }}
        onScrollEndDrag={(e) => {
          betweenScrolls.current = true;
          scrollUpdated.current = false;
          setCurDate(
            datesList[
              Math.floor(e.nativeEvent.contentOffset.x / SCREEN_WIDTH + 0.5)
            ].date.toDateString()
          );
        }}
        onScrollToIndexFailed={(err) => console.error(err)}
        renderItem={({ item, index, separators }) =>
          getDateInfo({ item, index, separators })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
