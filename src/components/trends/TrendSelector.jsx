import { useState } from "react";
import trendData from "./trend.json";
const TrendSelector = () => {
  const [{ selectorsKR, selectors }] = useState(trendData);
  return (
    <select>
      <option>{selectorsKR[0]}</option>
      <option>{selectorsKR[1]}</option>
    </select>
  );
};
export default TrendSelector;
