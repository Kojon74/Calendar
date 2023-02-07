import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { FlatList } from "react-native";

export type ContextType = {
  // states
  curDate: string;
  setCurDate: Dispatch<SetStateAction<string>>;
  datesList: Array<{ date: Date; key: string }>;
  weeksList: Array<{ date: Date; key: string }>;
  // refs
  betweenScrolls: MutableRefObject<boolean>;
  dateButtonPressed: MutableRefObject<boolean>;
  isPhysicalScroll: MutableRefObject<boolean>;
  scrollUpdated: MutableRefObject<boolean>;
  weekScrollDay: MutableRefObject<boolean>;
  dateListRef: RefObject<FlatList<any>>;
  weekListRef: RefObject<FlatList<any>>;
  // constants
  DATE_BUFFER_LEN: number;
  WEEK_BUFFER_LEN: number;
  // functions
  getCurWeek: (date: Date) => Array<Date>;
};
