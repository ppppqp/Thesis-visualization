//import colorScale from "../colorScale";
import * as d3 from "d3";
import { scaleLinear } from "d3";
const draw = (props) => {
  let { keyw } = props;
  d3.selectAll(".Legend-vis > *").remove();
  var data_legend = [];
  console.log(props);
  for (let k in keyw) {
    let temp = {};
    temp["name"] = k;
    temp["value"] = keyw[k];
    data_legend.push(temp);
  }
  var colorScale = d3
    .scaleOrdinal()
    .domain(data_legend.map((d) => d.name)) //TODO
    .range(["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"]);

  const yScale = d3
    .scaleBand()
    .domain(data_legend.map((d) => d.color))
    .range([0, 500])
    .padding(0.1);

  console.log(data_legend);
  var svg = d3
    .select(".Legend-vis")
    .attr("position", "relative")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);

  var legend = svg
    .selectAll(".legend")
    .data(data_legend)
    .enter()
    .append("g")
    .attr("class", "legend")
    .append("rect")
    .attr("width", (d) => d.value)
    .attr("height", "10px")
    .attr("x", "10px")
    .attr("y", (d) => yScale(d.color))
    .attr("fill", (d) => colorScale(d.name, "T"));
};
export default draw;
