import * as d3 from "d3";
import cloud from "d3-cloud";
import data from "../data/cloud";
import allTopic from "../data/allTopic";
const draw = (props) => {
  d3.selectAll(".cloud-vis > *").remove();
  const { selectedTopic, selectedMentor, isMentor } = props;
  var frequency_list = [];
  if (!isMentor)
    data[selectedTopic[0]].forEach((e, i) => {
      frequency_list.push({ text: e, size: Math.log(i) * 30 });
    });
  // var frequency_list = [
  //   { text: "互联网", size: 50 },
  //   { text: "有限元", size: 20 },
  //   { text: "复合材料", size: 40 },
  //   { text: "传感器", size: 30 },
  //   { text: "swot", size: 19 },
  //   { text: "神经网络", size: 80 },
  //   { text: "人满为患", size: 50 },
  //   { text: "动力学", size: 70 },
  //   { text: "机器人", size: 80 },
  // ];
  /*
神经网络
动力学
机器人
互联网
复合材料
传感器
swot
有限元

*/
  //自定义一个线性非连贯比例尺来进行给不同大小的词赋颜色.
  //   var color = d3.scale.linear()
  //            .domain([0,1,2,3,4,5,6,10,15,20,100])
  //            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
  var color = d3
    .scaleOrdinal()
    .domain(d3.range(frequency_list.length))
    .range(["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"]);

  var layout = cloud()
    .size([900, 270])
    .words(frequency_list)
    .rotate(0)
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", paint);

  layout.start();

  function paint(words) {
    const svg = d3
      .select(".cloud-vis")
      .append("svg") //根据id插入svg
      .attr("width", layout.size()[0]) //宽度
      .attr("height", layout.size()[1]) //高度
      //.attr("viewBox", "0 0 900 300") //可见区域
      .attr("preserveAspectRatio", "xMaxYMax meet")
      .attr("class", "wordcloud");
    const g = svg
      .append("g")
      .attr("transform", "translate(400,150)")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .style("fill", function (d, i) {
        return color(i);
      }) //颜色
      .attr("transform", function (d) {
        //每个词条的偏移量
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .on("mouseover", function (event, i) {
        d3.select(".cloud-vis")
          .selectAll("text")
          .style("font-size", (d) => {
            if (i.text == d.text) return d.size * 1.1 + "px";
            else return d.size + "px";
          });
      })
      .on("mouseleave", function (event, i) {
        d3.select(".cloud-vis")
          .selectAll("text")
          .style("font-size", (d) => {
            return d.size + "px";
          });
      })
      .text(function (d) {
        return d.text;
      });
  }
};
export default draw;
