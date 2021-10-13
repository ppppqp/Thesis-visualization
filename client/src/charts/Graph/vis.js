import * as d3 from "d3";
import colorScale from "../../colorScale";
const draw = (props) => {
  d3.selectAll(".vis-scatter > *").remove();
  const { dataV, dataE, selectedTopic } = props;
  /*
  const dataV = [
    { name: "Apple", value: 13 },
    { name: "Orange", value: 8 },
    { name: "Cake", value: 34 },
    { name: "Peach", value: 2 },
    { name: "Banana", value: 21 },
  ];
  let dataE = [
    { source: 0, target: 4, value: 1 },
    { source: 1, target: 3, value: 0.8 },
    { source: 2, target: 4, value: 0.6 },
    { source: 4, target: 3, value: 1.3 },
    { source: 1, target: 4, value: 0.9 },
    { source: 2, target: 1, value: 1.5 },
  ];
*/
  let keyRange = [];
  dataV.forEach((d) => {
    keyRange.push(d.name);
  });

  const width = 400;
  const height = 270;
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  let svg = d3
    .select(".vis-scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom);

  const g = svg
    .append("g")
    .attr("id", "maingroup")
    .attr("transform", `translate(${margin.top}, ${margin.right})`);
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(dataV, (d) => d.x), d3.max(dataV, (d) => d.x)])
    .range([0, 900]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(dataV, (d) => d.y), d3.max(dataV, (d) => d.y)])
    .range([0, height - 200]);

  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(dataV, (d) => d.value)])
    .range([0, 20]);

  //TODO: draw the chart
  var scaleColor = d3
    .scaleOrdinal()
    .domain(d3.range(dataV.length))
    .range(d3.schemeCategory10);

  var forceSimulation = d3
    .forceSimulation(dataV)
    .force("link", d3.forceLink())
    .force("collision", d3.forceCollide(1).strength(0.1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter());
  forceSimulation.nodes(dataV).on("tick", () => {
    links
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });
    linksText
      .attr("x", function (d) {
        return (d.source.x + d.target.x) / 2;
      })
      .attr("y", function (d) {
        return (d.source.y + d.target.y) / 2;
      });
    gs &&
      gs.attr("transform", function (d, i) {
        return "translate(" + d.x + "," + d.y + ")";
      });
  });
  forceSimulation
    .force("link")
    .links(dataE)
    .distance(function (d, i) {
      return d.value * 100; //设置边长
    });
  forceSimulation
    .force("center")
    .x(width / 2) //设置x坐标
    .y(height / 2); //设置y坐标

  var links = g
    .append("g")
    .selectAll("line")
    .data(dataE)
    .enter()
    .append("line")
    .attr("stroke", function (d, i) {
      return colorScale(d.name, "T"); //设置边线颜色
    })
    .attr("stroke-width", "5"); //设置边线宽度

  var linksText = g
    .append("g")
    .selectAll("text")
    .data(dataE)
    .enter()
    .append("text")
    .text(function (d, i) {
      return d.name;
    });
  //创建节点分组
  var gs = g
    .selectAll(".circle")
    .data(dataV)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .call(
      d3
        .drag() //相当于移动端的拖拽手势  分以下三个阶段
        .on("start", (event, d) => {
          if (!d3.active) {
            forceSimulation.alphaTarget(0.8).restart();
          }
          d.fx = event.x;
          d.fy = event.y;
        })

        .on("drag", drag)
        .on("end", (event, d) => {
          if (!d3.active) {
            forceSimulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
        })
    );

  //绘制节点
  let circles = gs
    .append("circle")
    .attr("r", (d) => sizeScale(d.value))
    .attr("opacity", 0.7)
    .attr("stroke", "none")
    .attr("fill", function (d, i) {
      return colorScale(d.name, "T");
    })
    .on("click", function (d) {
      console.log(d3.select(this).text());
    })
    .on("mouseover", function (d) {
      d3.select(this)
        .attr("opacity", 0.5)
        .attr("stroke", "white")
        .attr("stroke-width", 6);
    })
    .on("mouseout", function (d) {
      d3.select(this).attr("opacity", 0.7).attr("stroke", "none");
    })
    .append("title")
    .text(
      (d) => d.name //+ ": " + format(",")(d[`${caseType}`])
    );

  gs.append("title").text(function (d, i) {
    return d.name;
  });
  const zoom = d3
    .zoom()
    .scaleExtent([1, 40])
    .on("zoom", (event, d) => {
      let k = (event.transform.k - 1) * 0.1 + 1;
      g.attr(
        "transform",
        "translate(" +
          event.transform.x / 5 +
          "," +
          event.transform.y / 5 +
          ") scale(" +
          k +
          ")"
      );
    });
  //svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
};

function drag(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

export default draw;
