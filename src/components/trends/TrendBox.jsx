import { useState } from "react";
import TrendHeader from "./TrendHeader.jsx";
import TrendItem from "./TrendItem.jsx";
import TrendList from "./TrendList.jsx";
import TrendSelector from "./TrendSelector.jsx";
import trendData from "./trend.json";

const TrendBox = () => {
  //   const [{ sectionName, selectors, items }] = useState(trendData);
  const [{ sectionName, selectors, selectorsKR, items }] = useState(trendData);
  const [active, setActive] = useState(selectors[0]);
  const onSelectChangeHandler = (event) => {
    setActive(event.target.value);
  };
  return (
    <>
      <div className="wrapper">
        <TrendHeader>
          <h2>
            {sectionName}
            <TrendSelector onSelectChange={onSelectChangeHandler} />
          </h2>
        </TrendHeader>
        <TrendList>
          {items[active].map((movie) => (
            <TrendItem key={movie.id} item={movie} />
          ))}
        </TrendList>
      </div>
    </>
  );
};
export default TrendBox;
