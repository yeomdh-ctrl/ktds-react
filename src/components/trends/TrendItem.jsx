import { useState } from "react";
import trendData from "./trend.json";
const TrendItem = () => {
  const [{ items }] = useState(trendData);
  console.log(items.today);
  return (
    <ul>
      <li>{items.week}</li>
    </ul>
  );
};
export default TrendItem;
