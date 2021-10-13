// import Axios from "axios";
// import colorScale from "../../colorScale";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import mentorPosition from "../../position_json";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
import { useState, useRef } from "react";

const SankeyNode = ({
  name,
  x0,
  x1,
  y0,
  y1,
  color,
  index,
  sourceLinks,
  targetLinks,
  changeHighlight,
  changeShow,
  show,
}) => {
  const target = useRef(null);
  return (
    <g>
      {/* <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id={`tooltip-right`}>
          Tooltip on <strong>right</strong>.
        </Tooltip>
      }
    > */}
      <rect
        x={x0}
        y={y0}
        ref={target}
        width={x1 - x0}
        height={y1 - y0}
        display={name === "null" ? "none" : "block"}
        fill={color}
        onMouseOver={(e) => {
          console.log(sourceLinks);
          changeShow([
            index,
            // ...sourceLinks.map((l) => l.index),
            ...sourceLinks.map((l) => l.source.index),
            ...sourceLinks.map((l) => l.target.index),
            ...targetLinks.map((l) => l.source.index),
            ...targetLinks.map((l) => l.target.index),
            // ...targetLinks.map((l) => l.index),
          ]);
          changeHighlight([
            ...sourceLinks.map((l) => l.index),
            ...targetLinks.map((l) => l.index),
          ]);
        }}
        onMouseOut={(e) => {
          // setShow(!show);
          changeShow([]);
          changeHighlight([]);
        }}
      ></rect>

      {name === "null" || (
        <Overlay target={target.current} show={show} placement="bottom">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {name}
            </Tooltip>
          )}
        </Overlay>
      )}
      {/* <text
        font-size="12"
        transform={`translate(18,-5) rotate(-90,${x0}, ${y1})`}
        x={x0}
        y={y1}
        display={name === "null" ? "none" : "block"}
        onMouseOver={(e) => {
          changeHighlight([
            ...sourceLinks.map((l) => l.index),
            ...targetLinks.map((l) => l.index),
          ]);
        }}
        onMouseOut={(e) => {
          changeHighlight([]);
        }}
      >
        {name}
      </text> */}
      {/* </OverlayTrigger> */}
    </g>
  );
};

const SankeyLink = ({
  link,
  color,
  opacity,
  index,
  changeHighlight,
  nodes,
}) => (
  <path
    d={sankeyLinkHorizontal()(link)}
    style={{
      fill: "none",
      strokeOpacity: ".3",
      stroke: color,
      display:
        link.source.name === "null" || link.target.name === "null"
          ? "none"
          : "block",
      strokeWidth: Math.max(1, link.width),
      opacity,
    }}
    onMouseOver={(e) => {
      changeHighlight([index]);
    }}
    onMouseOut={(e) => {
      changeHighlight([]);
    }}
  />
);

const MysteriousSankey = ({
  data,
  width,
  height,
  highlightIndex,
  changeHighlight,
  showIndex,
  changeShow,
}) => {
  width = 800;
  height = 600;
  // if (data.length === 0)
  // data = {
  //   nodes: [
  //     { name: "电院" }, //0
  //     { name: "生物工程" }, //1
  //     { name: "安泰" }, //2
  //     { name: "环境" }, //3
  //     { name: "key3" }, //9
  //     { name: "教师2" }, //5
  //     { name: "教师3" }, //6
  //     { name: "教师4" }, //7
  //     { name: "key2" }, //8
  //     { name: "教师1" }, //4

  //     { name: "key4" },
  //   ],
  //   links: [
  //     { source: 0, target: 9, value: 2 },
  //     { source: 1, target: 5, value: 2 },
  //     { source: 2, target: 6, value: 2 },
  //     { source: 3, target: 7, value: 2 },
  //     { source: 9, target: 8, value: 2 },
  //     { source: 9, target: 4, value: 2 },
  //     { source: 5, target: 4, value: 2 },
  //     { source: 6, target: 10, value: 2 },
  //     { source: 7, target: 8, value: 2 },
  //   ],
  // };
  if (data.nodes.length === 0) {
    return <div></div>;
  } else {
    const { nodes, links } = sankey()
      .nodeWidth(25)
      .nodePadding(10)
      .extent([
        [1, 1],
        [width - 20, height - 5],
      ])(data);
    // const color = chroma.scale("Set3").classes(nodes.length);
    return (
      <g style={{ mixBlendMode: "multiply" }}>
        {nodes.map((node, i) => (
          <SankeyNode
            {...node}
            color="#dde"
            index={i}
            show={showIndex.includes(i) ? true : false}
            key={node.name}
            changeHighlight={changeHighlight}
            changeShow={changeShow}
          />
        ))}
        {links.map((link, i) => {
          return (
            <SankeyLink
              link={link}
              color={highlightIndex.includes(i) ? "red" : "#bbb"}
              opacity={highlightIndex.includes(i) ? 1 : 0.5}
              index={i}
              changeHighlight={changeHighlight}
              nodes={data.nodes}
              changeShow={changeShow}
            />
          );
        })}
      </g>
    );
  }
};

// export default draw;

// const draw = ({
//   mapNode,
//   scale,
//   width,
//   height,
//   Ox,
//   Oy,
//   Oscale,
//   onChangeMentor,
//   selectedMentor,
// }) => {
//   d3.selectAll(".vis-flow > *").remove();
//   var data = {
//     nodes: [
//       { name: "0" },
//       { name: "1" },
//       { name: "2" },
//       { name: "3" },
//       { name: "4" },
//       { name: "5" },
//       { name: "6" },
//       { name: "7" },
//       { name: "8" },
//     ],
//     links: [
//       { source: 0, target: 3, value: 10 },
//       { source: 1, target: 4, value: 10 },
//       { source: 2, target: 4, value: 5 },
//       { source: 1, target: 5, value: 5 },
//       { source: 3, target: 6, value: 5 },
//       { source: 3, target: 7, value: 5 },
//       { source: 4, target: 7, value: 10 },
//       { source: 4, target: 8, value: 5 },
//       { source: 5, target: 8, value: 5 },
//     ],
//   };

//   const { nodes, links } = sankey()
//     .nodeWidth(15)
//     .nodePadding(10)
//     .extent([
//       [1, 1],
//       [width - 1, height - 5],
//     ])(data);

//   // var sankey = Sankey()
//   //   .nodeWidth(80)
//   //   .nodePadding(40)
//   //   .size([width, height])
//   //   .nodes(data.nodes)
//   //   .links(data.links);
//   // var path = sankey.links();
//   // 绘制连接数据
//   // console.log(sankey.links(data.links));
//   let svg = d3
//     .select(".vis-flow")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .call(d3.zoom);
//   var Links = svg.append("g").selectAll("path").data(links).enter();
//   // 绑定节点数据
//   var Nodes = svg.append("g").selectAll(".node").data(nodes).enter();

//   // 绘制连接线
//   Links.append("path")
//     .attr("fill", "none")
//     .attr("stroke", function (d, i) {
//       return "red";
//     })
//     .attr("stroke-opacity", 0.5)
//     .attr("d", links)
//     .attr("id", function (d, i) {
//       return "link" + i;
//     })
//     .style("stroke-width", function (d) {
//       //连线的宽度
//       return Math.max(1, d.dy);
//     });

//   // 绘制圆形节点
//   Nodes.append("circle")
//     .attr("transform", function (d) {
//       return "translate(" + d.x + "," + d.y + ")";
//     })
//     .attr("r", function (d) {
//       return d.dy / 2;
//     })
//     .attr("cx", function (d) {
//       return d.dx / 2;
//     })
//     .attr("cy", function (d) {
//       return d.dy / 2;
//     })
//     .style("fill", "tomato")
//     .style("stroke", "gray");

//   // Nodes.append("text")
//   //   .attr("x", (d) => d.x + sankey.nodeWidth() / 2)
//   //   .attr("y", (d) => d.y + d.dy / 2)
//   //   .text(function (d) {
//   //     return d.name;
//   //   });
//   // Links.append("text")
//   //   .append("textPath")
//   //   .attr("xlink:href", function (d, i) {
//   //     return "#link" + i;
//   //   })
//   //   .attr("startOffset", "50%")
//   //   .text(function (d) {
//   //     return "流量:" + d.value;
//   //   });
// };
// export default draw;
export default MysteriousSankey;
