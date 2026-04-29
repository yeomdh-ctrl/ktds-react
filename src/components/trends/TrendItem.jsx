const TrendItem = ({ item }) => {
  return (
    <div>
      <img src={item.poster} />
      <div>{item.name}</div>
      <div>{item.openDate}</div>
    </div>
  );
};
export default TrendItem;
