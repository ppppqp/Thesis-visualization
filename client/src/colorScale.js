import allTopic from "./data/allTopic2";
function colorScale(name, mode) {
  if (mode === "T") {
    //topic mode
    var i = 0;
    var index = allTopic.indexOf(name);
    index = index + 30;
    return (
      "rgb(" +
      Math.abs((255 - index) % 255) +
      "," +
      Math.abs((255 - index * 2) % 255) +
      "," +
      Math.abs((255 - index * 2) % 255) +
      ")"
    );
  }
}
export default colorScale;
