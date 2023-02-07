import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../../utils/context";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const ScrollableDay = () => {
  const {
    curDate,
    setCurDate,
    datesList,
    betweenScrolls,
    dateListRef,
    scrollUpdated,
    weekScrollDay,
    DATE_BUFFER_LEN,
  } = useGlobalContext();

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
      <View style={styles.flatListCont}>
        <Text>{item.date.toDateString()}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={datesList}
      horizontal
      initialScrollIndex={Math.floor(DATE_BUFFER_LEN / 2)}
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
  );
};

export default ScrollableDay;

const styles = StyleSheet.create({
  flatListCont: { width: SCREEN_WIDTH },
});
