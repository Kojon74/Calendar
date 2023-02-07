import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import ContextDefaults from "./contextDefaults";

const AppContext = React.createContext(ContextDefaults);

const SCREEN_WIDTH = Dimensions.get("screen").width;

const DATE_BUFFER_LEN = 7;
const WEEK_BUFFER_LEN = 7;

const getSurroundingDays = (date: Date) =>
  Array(DATE_BUFFER_LEN)
    .fill(0)
    .map((_, i) => {
      let curDate = new Date(date);
      curDate.setUTCDate(
        curDate.getUTCDate() + i - Math.floor(DATE_BUFFER_LEN / 2)
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

const getSurroundingWeeks = (date: Date) =>
  Array(WEEK_BUFFER_LEN)
    .fill(0)
    .map((_, i) => {
      let curDate = new Date(date);
      curDate.setUTCDate(
        curDate.getUTCDate() + (i - Math.floor(WEEK_BUFFER_LEN / 2)) * 7
      );
      return {
        date: curDate,
        key: curDate.getTime().toString(),
      };
    });

const AppProvider = ({ children }: any) => {
  const [curDate, setCurDate] = useState(new Date().toDateString());
  const [datesList, setDatesList] = useState(getSurroundingDays(new Date()));
  const [curWeek, setCurWeek] = useState(getCurWeek(new Date()));
  const [weeksList, setWeeksList] = useState(getSurroundingWeeks(new Date())); // One day for each week centered around the current day

  const dateListRef = useRef<FlatList>(null);
  const weekListRef = useRef<FlatList>(null);

  let betweenScrolls = useRef(false);
  let scrollUpdated = useRef(false);
  let weekScrollDay = useRef(false);
  let isPhysicalScroll = useRef(true);
  let dateButtonPressed = useRef(true);

  useEffect(() => {
    (async () => {
      const curDateObj = new Date(curDate);
      // Scroll to center of buffer if we near the edges
      if (
        curDateObj <= datesList[1].date ||
        curDateObj >= datesList[DATE_BUFFER_LEN - 2].date ||
        dateButtonPressed.current === true
      ) {
        if (betweenScrolls) scrollUpdated.current = true;
        setDatesList(getSurroundingDays(curDateObj));
        dateListRef.current?.scrollToOffset({
          animated: false,
          offset: Math.floor(DATE_BUFFER_LEN / 2) * SCREEN_WIDTH,
        });
      }
      // Scroll to adjacent week if you have scrolled date out of current week range
      if (curDateObj < curWeek[0] || curDateObj > curWeek[6]) {
        setTimeout(() => {
          setCurWeek(getCurWeek(curDateObj));
        }, 175);
        if (!weekScrollDay.current) {
          let curIndex = -1;
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
      dateButtonPressed.current = false;
    })();
  }, [curDate]);

  useEffect(() => {
    let curWeekSun = curWeek[0];
    curWeekSun.setHours(0, 0, 0, 0);
    let lowerBoundSun = getCurWeek(weeksList[1].date)[0];
    lowerBoundSun.setHours(0, 0, 0, 0);
    let upperBoundSun = getCurWeek(weeksList[WEEK_BUFFER_LEN - 2].date)[0];
    upperBoundSun.setHours(0, 0, 0, 0);
    if (curWeekSun <= lowerBoundSun || curWeekSun >= upperBoundSun) {
      setWeeksList(getSurroundingWeeks(curWeekSun));
      weekListRef.current?.scrollToOffset({
        animated: false,
        offset: Math.floor(DATE_BUFFER_LEN / 2) * SCREEN_WIDTH,
      });
    }
  }, [curWeek]);

  return (
    <AppContext.Provider
      value={{
        // states
        curDate,
        setCurDate,
        datesList,
        weeksList,
        // refs
        betweenScrolls,
        dateButtonPressed,
        isPhysicalScroll,
        scrollUpdated,
        weekScrollDay,
        dateListRef,
        weekListRef,
        // constants
        DATE_BUFFER_LEN,
        WEEK_BUFFER_LEN,
        // functions
        getCurWeek,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
