import * as d3 from "d3";
import colorScale from "../../colorScale";
const draw = () => {
  // set the dimensions and margins of the graph
  const data = [
    [
      { year: 2015, value: 10, school: "电子信息与电气工程学院(计算机系)" },
      { year: 2016, value: 12, school: "电子信息与电气工程学院(计算机系)" },
      { year: 2017, value: 15, school: "电子信息与电气工程学院(计算机系)" },
    ],
    [
      { year: 2015, value: 12, school: "船舶海洋与建筑工程学院" },
      { year: 2016, value: 9, school: "船舶海洋与建筑工程学院" },
      { year: 2017, value: 6, school: "船舶海洋与建筑工程学院" },
    ],
    [
      { year: 2015, value: 21, school: "机械与动力工程学院" },
      { year: 2016, value: 15, school: "机械与动力工程学院" },
      { year: 2017, value: 17, school: "机械与动力工程学院" },
    ],
  ];
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  d3.selectAll(".vis-line > *").remove();
  var svg = d3
    .select(".vis-line")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // When reading the csv, I must format variables:

  // Now I can use this dataset:
  // Add X axis --> it is a date format

  let xScale = d3
    .scaleLinear()
    .domain(
      d3.extent(data[0], function (d) {
        return parseInt(d.year);
      })
    )
    .range([0, width]);

  //Add X axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).ticks(data[0].length - 1, ".4"));

  // Add Y axis
  let maxn;
  for (let datum of data) {
    maxn = Math.max(d3.max(datum, (d) => +d.value));
  }
  var yScale = d3.scaleLinear().domain([0, maxn]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(yScale));

  // Add the line
  let line = svg.append("g");
  for (let datum of data) {
    line
      .append("path")
      .datum(datum)
      .attr("fill", "none")
      .attr("stroke", (d) => colorScale(d[0].school, "T"))
      .attr("stroke-width", 3)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return xScale(d.year);
          })
          .y(function (d) {
            return yScale(d.value);
          })
      );
  }
  let circle = svg.append("g");
  for (let datum of data) {
    console.log(datum);
    circle
      .append("circle")
      .data(datum)
      .attr("fill", (d) => colorScale(d.school, "T"))
      .attr("stroke", "none")
      .attr("r", 5)
      .attr("cx", (d, i) => {
        xScale(d.year);
        console.log(i);
      })
      .attr("cy", (d) => yScale(d.value));
  }
};
export default draw;
