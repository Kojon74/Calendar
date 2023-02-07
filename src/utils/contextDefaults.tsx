import { AppState } from "react-native";
import { ContextType } from "./contextType";

const ContextDefaults: ContextType = {
  // states
  curDate: "",
  setCurDate: () => {},
  datesList: [],
  weeksList: [],
  // refs
  weekListRef: undefined,
  isPhysicalScroll: undefined,
  weekScrollDay: undefined,
  // constants
  DATE_BUFFER_LEN: 7,
  WEEK_BUFFER_LEN: 7,
  // functions
  getCurWeek: (date) => [],
};

export default ContextDefaults;
