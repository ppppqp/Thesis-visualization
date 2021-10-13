import * as d3 from "d3";
import _, { floor } from "lodash";
//import colorScale from "../../colorScale";
import "./style.css";
import allTopic from "../../data/allTopic";

const draw = ({
  data,
  width,
  height,
  isMentor,
  onChangeMentor,
  selectedYear,
  onChangeYear,
  onChangeTopic,
}) => {
  // data = [
  //   { year: "2015", Apple: 15, Orange: 10, Cake: 30, Banana: 20, Peach: 20 },
  //   { year: "2016", Apple: 16, Orange: 7, Cake: 35, Banana: 14, Peach: 10 },
  //   { year: "2017", Apple: 19, Orange: 6, Cake: 40, Banana: 9, Peach: 22 },
  //   { year: "2018", Apple: 10, Orange: 9, Cake: 20, Banana: 5, Peach: 20 },
  //   { year: "2019", Apple: 13, Orange: 8, Cake: 34, Banana: 2, Peach: 21 },
  // ];

  // console.log(data);
  let dataPie = [];
  let count = 0;
  let yearData = d3.extent(data, function (d) {
    return parseInt(d.year);
  }); // how many years covered
  let maxNum = 0; // max number of the sum of all themes in each years
  let domain = []; // domain of all the themes
  // console.log(yearData);
  const yearLB = yearData[0];
  // get the data for pie chart
  data.forEach((d) => {
    if (d.year === selectedYear) yearData = d;
  });
  /*
  for (var key in yearData) {
    if (key != "year") {
      let temp = {};
      temp["count"] = yearData[key]; // convert the data format to
      temp["label"] = key;
      dataPie.push(temp);
    }
  }
*/
  // data.forEach((d)=>{

  // })
  data.forEach((d) => {
    var sum = 0;
    for (var key in d) {
      if (key != "year" && domain.indexOf(key) < 0) domain.push(key);
      if (key != "year") sum += d[key];
    }
    if (maxNum < sum) maxNum = sum;
  });
  // console.log(domain);
  d3.selectAll(".vis-themeRiver > *").remove();
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  var svg = d3
    .select(".vis-themeRiver")
    .attr("position", "relative")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "themeVis");
  var stackGen = d3.stack().keys(domain).order(d3.stackOrderNone);
  //.offset(d3.stackOffsetWiggle);
  var stackedSeries = stackGen(data);

  const Riverscale = 1;
  // Add X axis --> it is a date format
  let xScale = d3
    .scaleLinear()
    .domain(
      d3.extent(data, function (d) {
        return parseInt(d.year);
      })
    )
    .range([0, width / Riverscale]);

  //Add X axis
  const xAxis = d3.axisBottom(xScale).ticks(data.length - 1, ".4"); //.tickFormat(format(".4"));
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("id", "horizontalAxis")
    .call(xAxis)
    .select(".domain")
    .remove();

  // Add Y axis
  var yScale = d3
    .scaleLinear()
    .domain([0, maxNum])
    .range([height - 20, 0]);
  svg.append("g").call(d3.axisLeft(yScale));

  var colorScale = d3
    .scaleOrdinal()
    .domain(domain) //TODO
    .range(["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"]);

  var areaGen = d3
    .area()
    .curve(d3.curveBasis)
    .x((d) => xScale(d.data.year))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  d3.select("#themeVis")
    .selectAll(".areas")
    .data(stackedSeries)
    .join("path")
    .attr("d", areaGen)
    .attr("fill", (d) => colorScale(d.key, "T"))
    .attr("class", "theme");

  //change font size of the axis
  d3.selectAll("#themeVis .tick>text").each(function (d, i) {
    d3.select(this).style("font-size", "14px");
  });
  var tooltip = d3
    .select(".theme")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .html(
      "<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>"
    );

  d3.selectAll(".theme")
    .attr("opacity", 1)
    .on("mouseover", function (event, i) {
      d3.selectAll(".theme").attr("opacity", (d, j) => {
        if (i.key === d.key) return 1;
        return 0.8;
      });

      tooltip.style("opacity", 0.9);

      // d3.selectAll(".pie").attr("opacity", (d, j) => {
      //   if (i.key === d.data.label) return 1;
      //   return 0.8;
      // });
    })
    .append("title")
    .text((d) => d.key);

  // .on("click", function (event, i) {
  //   alert(i.key);
  // });

  var vertical = d3
    .select(".vis-themeRiver")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "19")
    .style("bottom", "0px")
    .style("left", "0px")
    .style("width", "1px")
    .style("height", height + margin.top + "px")
    .style("background", "#fff");
  d3.select(".vis-themeRiver")
    .on("mousemove", function (event, d) {
      var mousex = d3.pointer(event);
      mousex = mousex[0] + 5;
      vertical.style("left", mousex + "px");
    })
    .on("mouseover", function (event) {
      var mousex = d3.pointer(event);
      mousex = mousex[0] + 5;
      vertical.style("left", mousex + "px");
    })
    .on("click", function (event, d) {
      var mousex = d3.pointer(event);
      mousex = mousex[0] - margin.left;
      const padding = (width / Riverscale - margin.left) / (data.length - 1);
      const target = parseInt(mousex / padding) + yearLB;
      onChangeYear(target);
    });

  /*
  let radius = Math.min(width, height) / 2;

  let arc = d3.arc().innerRadius(0).outerRadius(radius);

  let pie = d3
    .pie()
    .value(function (d) {
      return d.count;
    })
    .sort(null);
  svg
    .selectAll("pie")
    .data(pie(dataPie))
    .enter()
    .append("path")
    .attr("transform", "translate(1000," + radius + ")")
    .attr("d", arc)
    .attr("class", "pie")
    .attr("fill", function (d) {
      return colorScale(d.data.label);
    });
    */
};

export default draw;
