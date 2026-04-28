import { useState } from "react";
import TrendHeader from "./TrendHeader.jsx";
import TrendItem from "./TrendItem.jsx";
import TrendList from "./TrendList.jsx";
import TrendSelector from "./TrendSelector.jsx";
import trendData from "./trend.json";

const TrendBox = () => {
  //   const [{ sectionName, selectors, items }] = useState(trendData);
  const [{ sectionName, selectors, items }] = useState(trendData);
  return (
    <>
      <div className="wrapper">
        <TrendHeader>
          <h2>
            {sectionName}
            <TrendSelector />
          </h2>
        </TrendHeader>
        <TrendList>
          <TrendItem />
        </TrendList>
      </div>
    </>
  );
};
export default TrendBox;
