import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type ContextType = {
  // states
  curDate: string;
  setCurDate: Dispatch<SetStateAction<string>>;
  datesList: Array<{ date: Date; key: string }>;
  weeksList: Array<{ date: Date; key: string }>;
  // refs
  weekListRef: MutableRefObject<null> | undefined;
  isPhysicalScroll: MutableRefObject<boolean> | undefined;
  weekScrollDay: MutableRefObject<boolean> | undefined;
  // constants
  DATE_BUFFER_LEN: number;
  WEEK_BUFFER_LEN: number;
  // functions
  getCurWeek: (date: Date) => {
    date: Date;
    key: string;
  }[];
};
