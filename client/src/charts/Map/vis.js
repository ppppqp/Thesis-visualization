import * as d3 from "d3";
import Axios from "axios";
import React from "react";
// import colorScale from "../../colorScale";

const draw = ({
  mapNode,
  mapEdge,
  scale,
  width,
  height,
  onChangeMentor,
  selectedMentor,
  handleClickToOpen,
}) => {
  // color scale
  const edgeColor = "#999";
  const colorScale = {
    安泰经济与管理学院: "#e8d4d4",
    化学化工学院: "#F7B5A2",
    机械动力与工程学院: "#B9E4DD",
    aaa: "#F7B5A2",
  };

  const keywColor = "rgb(230, 230, 255)";
  const keywColorH = "rgb(72, 75, 255)";
  const circleColor = "#e8d4d4";
  const circleWordColor = "#111";
  const keywHightlight = (d, isHighlight) => {
    if (isHighlight) {
      d3.selectAll(".keyword").attr("fill", (di) => {
        return di == d ? keywColorH : keywColor;
      });
    } else d3.selectAll(".keyword").attr("fill", keywColor);
  };

  // edge scale
  const keywordOffset = (count, index) => {
    const angle = (2 * Math.PI) / count;
    const ret = { x: 0, y: 0 };
    ret.x = Math.cos(angle * index) * keywEdgeLength(count);
    ret.y = Math.sin(angle * index) * keywEdgeLength(count);
    return ret;
  };
  const MentorCircleR = (length) => {
    if (length <= 8) return 50 * scale;
    else return ((2 * length) / Math.PI) * 10 * scale;
  };
  const MentorEdgeLength = 200 * scale;
  const keywEdgeLength = (length) => MentorCircleR(length) * 1.5;
  const KeywordCircleR = 20 * scale;

  const showPaperList = async (d, mentorOI) => {
    const keywordInfo = { info: [] };
    const response = await Axios.get("http://localhost:3001/getMentor", {
      params: {
        mentorOI,
        year: "2019",
      },
    });
    const data = response.data;
    let arr = "当前教师：" + mentorOI + "\n当前关键词：" + d + "\n\n";

    for (let di of data) {
      if (di["keyword"].indexOf(d) > -1) {
        keywordInfo.info.push({
          title: di.title,
          mentor: mentorOI,
        });
      }
    }
    // data.forEach((di) => {
    //   if (di["keyword"].indexOf(d) > -1) {
    //     arr += di["title"] + "\n";
    //   }
    // });
    // alert(arr);
    handleClickToOpen(keywordInfo);
  };
  let margin = { top: 10, bottom: 10, left: 10, right: 10 };
  d3.selectAll(".vis-map > *").remove();
  let svg = d3
    .select(".vis-map")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  svg
    .call(
      d3.zoom().on("zoom", function (event) {
        g.attr("transform", event.transform);
      })
    )
    .on("dblclick.zoom", null);
  let g = svg
    .append("g")
    .attr("transform", "translate(" + margin.top + "," + margin.left + ")")
    .attr("class", "container");
  // 准备数据
  // 节点集
  // let nodes = [
  //   {
  //     id: 1,
  //     name: "周洁如",
  //     school: "安泰经济与管理学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 12,
  //     name: "江平开",
  //     school: "化学化工学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 2,
  //     name: "吕巍",
  //     school: "安泰经济与管理学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 3,
  //     name: "张鹏翥",
  //     school: "化学化工学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 4,
  //     name: "蒋炜",
  //     school: "安泰经济与管理学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 5,
  //     name: "田澎",
  //     school: "机械动力与工程学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 6,
  //     name: "黄丞",
  //     school: "机械动力与工程学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 7,
  //     name: "周颖",
  //     school: "安泰经济与管理学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 8,
  //     name: "顾琴轩",
  //     school: "安泰经济与管理学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  //   {
  //     id: 9,
  //     name: "费一文",
  //     school: "化学化工学院",
  //     type: 0,
  //     keywords: ["神经网络", "可视化"],
  //   },
  // ];
  // mapNode = [
  //   {
  //     id: 0,
  //     name: "董笑菊",
  //     school: "化学化工学院",
  //     type: 0,
  //     keywords: ["可视化", "可视化", "可视化"],
  //   },
  //   {
  //     id: 1,
  //     name: "萧冰",
  //     school: "化学化工学院",
  //     type: 0,
  //     keywords: ["可视化", "可视化"],
  //   },
  //   {
  //     id: 2,
  //     name: "明新国",
  //     school: "化学化工学院",
  //     type: 0,
  //     keywords: ["差异化", "半导体", "集装箱", "可视化"],
  //   },
  // ];
  let nodes = mapNode;
  // console.log(mapNode);
  // 边集'
  // let tempEdges = mapEdge;
  // console.log(mapEdge);
  let tempEdges = mapNode.length == 0 ? [] : mapEdge;
  // let tempEdges = [
  //   { id: 1, source: 12, target: 5, relation: "渠道管理", value: 1.3 },
  //   { id: 2, source: 5, target: 6, relation: " 营销策略", value: 1 },
  //   { id: 3, source: 5, target: 7, relation: "企业模式", value: 1 },
  //   { id: 4, source: 5, target: 8, relation: "社交网络", value: 1 },
  //   { id: 5, source: 2, target: 7, relation: "神经网络", value: 2 },
  //   { id: 6, source: 3, target: 6, relation: "视网膜", value: 0.9 },
  //   { id: 7, source: 4, target: 8, relation: "分布式", value: 1 },
  //   { id: 8, source: 6, target: 7, relation: "计算机", value: 1.6 },
  //   { id: 9, source: 7, target: 8, relation: "动力学", value: 0.7 },
  //   { id: 10, source: 7, target: 9, relation: "催化剂", value: 2 },
  //   { id: 11, source: 9, target: 7, relation: "管理系统", value: 2 },
  //   { id: 12, source: 9, target: 7, relation: "供应链", value: 2 },
  //   { id: 13, source: 1, target: 6, relation: "供应链", value: 2 },
  // ];
  nodes.forEach((item) => {});
  // 生成 nodes map
  let nodesMap = genNodesMap(nodes);
  let nodesData = [];
  for (let key in nodesMap) {
    nodesData.push(nodesMap[key]);
  }
  let linkMap = genLinkMap(tempEdges);
  // 构建 links（source 属性必须从 0 开始）
  let edges = genLinks(tempEdges);
  // 设置一个颜色比例尺
  // let colorScale = d3
  //   .scaleOrdinal()
  //   .domain(d3.range(nodesData.length))
  //   .range(d3.schemeCategory10);
  // 新建一个力导向图
  let forceSimulation = d3
    .forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody())
    .force("collide", d3.forceCollide(100).strength(0.2).iterations(5))
    .force("center", d3.forceCenter());
  // 生成节点数据
  forceSimulation.nodes(nodesData);
  // 生成边数据
  forceSimulation
    .force("link")
    .links(edges)
    .distance(function (d) {
      // 每一边的长度
      return (
        d.value * 150 * scale +
        MentorCircleR(d.source.keywords.length) +
        MentorCircleR(d.target.keywords.length)
      );
    });
  // 设置图形中心位置
  forceSimulation
    .force("center")
    .x(width / 2)
    .y(height / 2);
  // 箭头
  var marker = g
    .append("g")
    .attr("class", "showLine")
    .append("marker")
    .attr("id", "resolved")
    // .attr("markerUnits","strokeWidth")// 设置为strokeWidth箭头会随着线的粗细发生变化
    .attr("markerUnits", "userSpaceOnUse")
    .attr("viewBox", "0 -5 10 10") // 坐标系的区域
    .attr("refX", 44) // 箭头坐标
    .attr("refY", 0)
    .attr("markerWidth", 10) // 标识的大小
    .attr("markerHeight", 10)
    .attr("orient", "auto") // 绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr("stroke-width", 2) // 箭头宽度
    .append("path")
    .attr("d", "M0,-5L10,0L0,5") // 箭头的路径
    .attr("fill", edgeColor); // 箭头颜色
  // 绘制边
  let links = g
    .append("g")
    .selectAll("path")
    .data(edges)
    .enter()
    .append("path")
    .attr("d", (link) => genLinkPath(link)) // 遍历所有数据。d表示当前遍历到的数据，返回绘制的贝塞尔曲线
    .attr("id", (d, i) => {
      return "edgepath" + d.id;
    }) // 设置id，用于连线文字
    .style("stroke", edgeColor) // 颜色
    .style("stroke-width", 2) // 粗细
    .attr("class", "lines")
    .attr("marker-end", "url(#resolved)"); // 根据箭头标记的id号标记箭头
  // 边上的文字
  let linksText = g
    .append("g")
    .selectAll("text")
    .data(edges)
    .enter()
    .append("text")
    .attr("class", "linksText")
    .text(function (d) {
      return d.relations;
    })
    .style("font-size", 14)
    // .style("text-anchor", "start")
    // .attr("transform", "rotate(45)")//_________________
    .attr("fill-opacity", 0);
  // 创建分组
  let gs = g
    .append("g")
    .selectAll(".circleText")
    .data(nodesData)
    .enter()
    .append("g")
    .attr("class", "singleNode")
    .attr("id", function (d) {
      return "singleNode" + d.id;
    })
    .style("cursor", "pointer")
    .attr("transform", function (d) {
      let cirX = d.x;
      let cirY = d.y;
      return "translate(" + cirX + "," + cirY + ")";
    });
  // 鼠标交互
  gs.on("mouseover", function (event, d, i) {
    // 显示连接线上的文字
    // toggleLineText(d, true);
    toggleLine(links, d, true);
    toggleNode(gs, d, true);
  })
    .on("mouseout", function (event, d, i) {
      // 隐去连接线上的文字
      // toggleLineText(d, false);
      toggleLine(links, d, false);
      toggleNode(gs, d, false);
    })
    .on(
      "click",
      function (event, d, i) {
        event.preventDefault();
        linksText.style("fill-opacity", function (edge) {
          if (edge.source === d) {
            return 1;
          }
        });
        // toggleCircle(d3.select(this), d);
      },
      true
    )
    .call(d3.drag().on("start", started).on("drag", dragged).on("end", ended));
  svg.on(
    "click",
    function (event) {
      nodes.forEach((d) => (d.clickFlag = false));
      var target = event.srcElement, //  获取事件发生源
        data = d3.select(target).datum(); //  获取事件发生源的数据
      removeSingle();
      if (!data) {
        // document.getElementById("circle8").innerText = "";
      }
    },
    true
  );
  forceSimulation.on("tick", ticked);
  function toggleLineText(currNode, isHover) {
    if (isHover) {
      linksText.style("fill-opacity", function (edge) {
        if (edge.source === currNode) {
          return 1;
        }
      });
    } else {
      linksText.style("fill-opacity", function (edge) {
        if (edge.source === currNode || edge.target === currNode) {
          return 0;
        }
      });
    }
  }
  function toggleLine(linkLine, currNode, isHover) {
    if (isHover) {
      // 加重连线样式
      links
        .style("opacity", 0.1)
        .filter((link) => isLinkLine(currNode, link))
        .style("opacity", 1)
        .classed("link-active", true);
    } else {
      links.style("opacity", 1).classed("link-active", false);
    }
  }
  /*
  function showMyList() {
    var e = { id: 10, name: "河北" };
    var h = { id: 11, name: "河南" };
    var f = { id: 13, source: 9, target: 10, relation: "222", value: 2 };
    nodes.push(e);
    nodes.push(h);
    tempEdges.push(f);
    nodesMap = genNodesMap(nodes);
    let nodesData = [];
    for (let key in nodesMap) {
      nodesData.push(nodesMap[key]);
    }
    linkMap = genLinkMap(tempEdges);
    edges = genLinks(tempEdges);
    updateData();
  }
  
  function updateData() {
    links = links
      .data(edges, function (d) {})
      .join("path")
      .attr("id", (d, i) => {
        return "edgepath" + d.id;
      }) // 设置id，用于连线文字
      .style("stroke", edgeColor) // 颜色
      .style("stroke-width", 2) // 粗细
      .attr("class", "lines")
      .attr("marker-end", "url(#resolved)") // 根据箭头标记的id号标记箭头
      .merge(links);
    linksText = linksText
      .data(edges)
      .join("text")
      .attr("class", "linksText")
      .text(function (d) {
        return d.relations;
      })
      // .style("text-anchor", "start")
      // .attr("transform", "rotate(45)")
      .style("font-size", 14)
      .attr("fill-opacity", 0);
    gs = gs
      .data(nodesData, function (d) {})
      .join("g")
      .attr("class", "singleNode")
      .attr("id", function (d) {
        return "singleNode" + d.id;
      })
      .style("cursor", "pointer")
      .merge(gs)
      .call(
        d3.drag().on("start", started).on("drag", dragged).on("end", ended)
      );
    gs.append("circle")
      .attr("fill", function (d) {
        return colorScale[d.school];
      })
      .attr("r", 35)
      .attr("stroke", edgeColor)
      .attr("stroke-width", 3);
    gs.on("mouseover", function (event, d, i) {
      // 显示连接线上的文字
      toggleLineText(d, true);
      toggleLine(links, d, true);
      toggleNode(gs, d, true);
    })
      .on("mouseout", function (event, d, i) {
        // 隐去连接线上的文字
        toggleLineText(d, false);
        toggleLine(links, d, false);
        toggleNode(gs, d, false);
      })
      .on(
        "click",
        function (event, d, i) {
          linksText.style("fill-opacity", function (edge) {
            if (edge.source === d) {
              return 1;
            }
          });
          toggleCircle(d3.select(this), d);
        },
        true
      );
    gs.append("text")
      .attr("y", -20)
      .attr("dy", 10)
      .attr("text-anchor", "middle")
      .style("font-size", 12)
      .attr("x", function ({ name }) {
        return textBreaking(d3.select(this), name);
      });
    gs.append("title").text((node) => {
      return node.name;
    });
    forceSimulation.nodes(nodesData);
    forceSimulation.force("link").links(edges);
    forceSimulation.alpha(0.8).restart();
  }
  function getLineTextAngle(d, bbox) {
    if (d.target.x < d.source.x) {
      const { x, y, width, height } = bbox;
      const rx = x + width / 2;
      const ry = y + height / 2;
      return "rotate(180 " + rx + " " + ry + ")";
    } else {
      return "rotate(0)";
    }
  }
  */
  function toggleNode(nodeCircle, currNode, isHover) {
    if (isHover) {
      // 提升节点层级
      // nodeCircle.sort((a, b) => a.id === currNode.id ? 1 : -1);
      // this.parentNode.appendChild(this);
      nodeCircle
        .style("opacity", 0.5)
        .filter((node) => isLinkNode(currNode, node))
        .style("opacity", 1);
    } else {
      nodeCircle.style("opacity", 1);
    }
  }
  function removeSingle() {
    d3.select(".singleCircle").remove();
  }
  function toggleCircle(current, d) {
    var currentD = d;
    if (d.clickFlag) {
      removeSingle();
      // document.getElementById("circle8").innerText = "";
    }
    d.clickFlag = true;
    // document.getElementById("circle8").innerText = d.name;
    var data = [
      {
        population: 30,
        value: "X",
        type: "delete",
      },
      {
        population: 30,
        value: "收起",
        type: "showOn",
      },
      {
        population: 30,
        value: "展开",
        type: "showOff",
      },
    ];
    var sum = d3.sum(
      data.map(function (d) {
        return d.population;
      })
    );
    for (let i in data) {
      data[i].Percentage = ((data[i].population / sum) * 100).toFixed(0) + "%";
    }
    var width = 300,
      height = 300,
      margin = { left: 30, top: 30, right: 30, bottom: 30 },
      svg_width = width + margin.left + margin.right,
      svg_height = height + margin.top + margin.bottom,
      font_size = 15;
    var g = current
      .append("g")
      .attr("class", "singleCircle")
      .attr("width", width)
      .attr("height", height);
    var Pie = g.append("g");

    var arc_generator = d3
      .arc()
      .innerRadius(width / 6.5)
      .outerRadius(width / 4);
    var angle_data = d3.pie().value(function (d) {
      return d.population;
    });
    var pieData = angle_data(data);
    var pieAngle = pieData.map(function (p) {
      return ((p.startAngle + p.endAngle) / 2 / Math.PI) * 180;
    });

    // var color=d3.schemeCategory10;

    //生成内部圆环
    Pie.selectAll("path")
      .data(angle_data(data))
      .enter()
      .append("path")
      .attr("d", arc_generator)
      .style("fill", function (d, i) {
        switch (i) {
          case 0:
            return "#898778";
          case 1:
            return "#d1d091";
          case 2:
            return "#b1aaf1";
        }
      })
      // .style("stroke", "black")
      .attr("class", "path")
      .attr("type", function (d) {
        return d.data.type;
      })
      .on("click", function (event, d) {
        if (d.data.type === "delete") {
          deleteNode(currentD);
        } else if (d.data.type === "showOn") {
          ManipulateNodes(currentD, "none");
        } else {
          onChangeMentor(currentD.name);
          ManipulateNodes(currentD, "block");
        }
        event.stopPropagation();
      });
    var arc_label = d3
      .arc()
      .innerRadius(width / 4)
      .outerRadius(width / 2);

    Pie.selectAll(".arc_label")
      .data(angle_data(data))
      .enter()
      .append("path")
      .attr("d", arc_label)
      .attr("class", "arc_label")
      .style("fill", "none");
    const labelFontSize = 12;
    const labelValRadius = 170 * 0.35 - labelFontSize * 0.35; // 计算正确半径 文字位置
    const labelValRadius1 = 170 * 0.35 + labelFontSize * 0.35;

    const labelsVals = current
      .select(".singleCircle")
      .append("g")
      .classed("labelsvals", true);

    // 定义两条路径以使标签的方向正确
    labelsVals
      .append("def")
      .append("path")
      .attr("id", "label-path-1")
      .attr(
        "d",
        `m0 ${-labelValRadius} a${labelValRadius} ${labelValRadius} 0 1,1 -0.01 0`
      );
    labelsVals
      .append("def")
      .append("path")
      .attr("id", "label-path-2")
      .attr(
        "d",
        `m0 ${-labelValRadius1} a${labelValRadius1} ${labelValRadius1} 0 1,0 0.01 0`
      );

    labelsVals
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .style("font-size", labelFontSize)
      .style("fill", "white")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .append("textPath")
      .attr("href", function (d, i) {
        const p = pieData[i];
        const angle = pieAngle[i];
        if (angle > 90 && angle <= 270) {
          // 根据角度选择路径
          return "#label-path-2";
        } else {
          return "#label-path-1";
        }
      })
      .attr("startOffset", function (d, i) {
        const p = pieData[i];
        const angle = pieAngle[i];
        let percent = ((p.startAngle + p.endAngle) / 2 / 2 / Math.PI) * 100;
        if (angle > 90 && angle <= 270) {
          // 分别计算每条路径的正确百分比
          return 100 - percent + "%";
        }
        return percent + "%";
      })
      .text(function (d) {
        return d.value;
      })
      .on(
        "click",
        function (event, d) {
          if (d.type === "delete") {
            deleteNode(currentD);
          } else if (d.type === "showOn") {
            ManipulateNodes(currentD, "none");
          } else {
            // showMyList()
          }
          event.stopPropagation();
        },
        true
      );
  }
  //删除当前节点下一级没有其他关系的节点
  function ManipulateNodes(curr, type) {
    // document.getElementById("circle8").innerText = "";
    // var removeIndex = nodesData.findIndex(node=>node.id == curr.id)
    // nodesData.splice(removeIndex,1)
    // nodes.splice(removeIndex,1)
    d3.select(this).attr("display", type);
    let relationNode = [],
      relationList = [],
      hasRelationList = [];
    var clickNode = curr.id; //点击节点的名字
    d3.selectAll(".lines").each(function (e) {
      if (e.source.id == curr.id || e.target.id == curr.id) {
        hasRelationList.push(e);
      } else {
        relationList.push(e); //出去跟删除节点有关系的其他关系
      }
      //需要删除的节点相关的节点
      if (e.source.id == curr.id) {
        relationNode.push(e.target);
      }
      //需要删除的节点相关的节点
      if (e.target.id == curr.id) {
        relationNode.push(e.source);
      }
    });
    var tempNodeList = JSON.parse(JSON.stringify(relationNode));
    tempNodeList = uniqObjInArray(tempNodeList);
    //区分下级节点是否是孤节点
    tempNodeList.forEach(function (item, index) {
      var hasLine = relationList.findIndex(
        (jtem) => jtem.target.id == item.id || jtem.source.id == item.id
      );
      if (hasLine >= 0) {
        item.notSingle = true;
      }
    });
    tempNodeList.forEach(function (item, index) {
      if (!item.notSingle) {
        d3.select("#singleNode" + item.id).attr("display", type);
        //d3.select("#singleNode" + item.id).remove();
      }
    });
    var otherTempNode = [];
    tempNodeList = tempNodeList.map((item) => {
      if (!item.notSingle) {
        otherTempNode.push(item);
      }
    });
    hasRelationList.forEach((item) => {
      otherTempNode.forEach((jtem) => {
        if (jtem.id == item.source.id || jtem.id == item.target.id) {
          //d3.select("#edgepath" + item.id).remove();
          d3.select("#edgepath" + item.id).attr("display", type);
        }
      });
    });
    d3.selectAll(".singleNode").each(function (d, i) {
      var temp = d.id;
      //删除当前需要隐藏的节点
      if (temp == clickNode) {
        removeSingle();
      }
    });
    d3.selectAll(".linksText").each(function (e) {
      if (e.source === curr || e.target === curr) {
        //d3.select(this).remove();
        d3.select(this).attr("display", type);
      }
    });
    gs.style("opacity", 1);
    links.style("opacity", 1).classed("link-active", false);
  }
  //删除当前及下一级没有其他关系的节点
  function deleteNode(curr) {
    // document.getElementById("circle8").innerText = "";
    var removeIndex = nodesData.findIndex((node) => node.id == curr.id);
    nodesData.splice(removeIndex, 1);
    nodes.splice(removeIndex, 1);
    d3.select(this).remove();
    let relationNode = [],
      relationList = [];
    var clickNode = curr.id; //点击节点的名字
    d3.selectAll(".lines").each(function (e) {
      if (e.source.id == curr.id || e.target.id == curr.id) {
        //d3.select(this).remove();
        d3.select(this).attr("display", "none");
      } else {
        relationList.push(e); //出去跟删除节点有关系的其他关系
      }
      //需要删除的节点相关的节点
      if (e.source.id == curr.id) {
        relationNode.push(e.target);
      }
      //需要删除的节点相关的节点
      if (e.target.id == curr.id) {
        relationNode.push(e.source);
      }
    });
    var tempNodeList = JSON.parse(JSON.stringify(relationNode));
    tempNodeList = uniqObjInArray(tempNodeList);
    //区分下级节点是否是孤节点
    tempNodeList.forEach(function (item, index) {
      var hasLine = relationList.findIndex(
        (jtem) => jtem.target.id == item.id || jtem.source.id == item.id
      );
      if (hasLine >= 0) {
        item.notSingle = true;
      }
    });
    tempNodeList.forEach(function (item, index) {
      if (!item.notSingle) {
        // d3.select("#singleNode" + item.id).remove();
        d3.select("#singleNode" + item.id).attr("display", "none");
      }
    });
    d3.selectAll(".singleNode").each(function (d, i) {
      var temp = d.id;
      //删除当前需要隐藏的节点
      if (temp == clickNode) {
        removeSingle();
        // d3.select(this).remove();
        d3.select(this).attr("display", "none");
      }
    });
    d3.selectAll(".linksText").each(function (e) {
      if (e.source === curr || e.target === curr) {
        // d3.select(this).remove();
        d3.select(this).attr("display", "none");
      }
    });
    gs.style("opacity", 1);
    links.style("opacity", 1).classed("link-active", false);
  }

  // 关联节点去重重组
  function uniqObjInArray(objarray) {
    let len = objarray.length;
    let tempJson = {};
    let res = [];
    for (let i = 0; i < len; i++) {
      //取出每一个对象
      tempJson[JSON.stringify(objarray[i])] = true;
    }
    let keyItems = Object.keys(tempJson);
    for (let j = 0; j < keyItems.length; j++) {
      res.push(JSON.parse(keyItems[j]));
    }
    return res;
  }
  function isLinkLine(node, link) {
    return link.source.id === node.id;
  }
  function isLinkNode(currNode, node) {
    if (currNode.id === node.id) {
      return true;
    }
    return (
      linkMap[currNode.id + "-" + node.id] ||
      linkMap[node.id + "-" + currNode.id]
    );
  }
  function largerNode(nodes, currNode, isHover) {
    if (isHover) {
      gs.style("stroke-width", 1)
        .filter((node) => isNode(currNode, node))
        .style("stroke-width", 10);
    } else {
      gs.style("stroke-width", 1);
    }
  }
  function isNode(node, cNode) {
    return true;
  }
  // 绘制节点
  var mentorNode = gs
    .append("circle")
    .attr("r", (d) => MentorCircleR(d.keywords.length))
    .attr("id", function (d) {
      return "circle" + d.id;
    })
    .attr("fill", function (d, i) {
      const { name, id, school, type, keywords, x, y, vx, vy, vz } = d;
      // console.log(d);
      // console.log(name, id, school, type, keywords, x, y, vx, vy, vz);
      drawKeyWord(d, i, d.x, d.y);
      return colorScale[d.school];
    })
    .attr("stroke", edgeColor)
    .attr("stroke-width", 3);

  // 文字
  var nodeText = gs
    .append("text")
    // .attr('x', -10)
    .attr("y", -20)
    .attr("dy", 10)
    .attr("text-anchor", "middle")
    .style("font-size", 12)
    .attr("x", function ({ name }) {
      return textBreaking(d3.select(this), name);
    });
  gs.append("title").text((node) => {
    return node.name;
  });

  function drawKeyWord(dx, i, x, y) {
    // const { name, id, x, y } = dx;
    // console.log(x, y);
    let node = d3
      .select(".vis-map")
      .select("#singleNode" + dx.id)
      .selectAll(".keyword")
      .data(dx.keywords)
      .enter()
      .append("circle")
      .attr("class", "keyword")
      .attr("text", dx.keywords)
      .attr("fill", keywColor)
      .attr(
        "transform",
        (d, i) =>
          `translate(${keywordOffset(dx.keywords.length, i).x},${
            keywordOffset(dx.keywords.length, i).y
          })`
      )
      .attr("r", KeywordCircleR)
      .attr("stroke", edgeColor)
      .on("mouseover", function (event, d, i) {
        keywHightlight(d, true);
        setShow(d, dx);
        event.stopPropagation();
        // .filter((link) => isLinkLine(currNode, link))
        // .style("opacity", 1)
        // .classed("link-active", true);
        // d3.select(this).attr("stroke-width", 2).attr("stroke", "red");
      })
      .on("mouseout", function (event, d, i) {
        keywHightlight(d, false);
        setShow("", dx);
        // d3.select(this).attr("stroke-width", 1).attr("stroke", edgeColor);
      })
      .on("click", function (event, d, i) {
        event.stopPropagation();

        showPaperList(d, dx.name);
      });

    var lineGenerator = d3.line();
    // var pathString = lineGenerator(data);
    d3.select(".vis-map")
      .select("#singleNode" + dx.id)
      .selectAll(".keywordPath")
      .data(dx.keywords)
      .enter()
      .append("path")
      .attr("stroke", edgeColor)
      .attr("stroke-width", 1)
      .attr("d", (d, i) => {
        const x = keywordOffset(dx.keywords.length, i).x;
        const y = keywordOffset(dx.keywords.length, i).y;
        const edge = Math.sqrt(x * x + y * y);
        // console.log("angle is:", angle);
        return lineGenerator([
          [
            (MentorCircleR(dx.keywords.length) * x) / edge,
            (MentorCircleR(dx.keywords.length) * y) / edge,
          ],
          [x - (KeywordCircleR * x) / edge, y - (KeywordCircleR * y) / edge],
        ]);
      }); // 遍历所有数据。d表示当前遍历到的数据，返回绘制的贝塞尔曲线
    // .style("stroke", edgeColor) // 颜色
    // .style("stroke-width", 2) // 粗细
    // .attr("class", "lines")
    // .attr("marker-end", "url(#resolved)");

    // 根据箭头标记的id号标记箭头
    // .attr("text", function (d) {
    //   console.log(d);
    //   return textBreaking(d3.select(this), d);
    // });
  }
  function setShow(target, dx) {
    d3.selectAll(".vis-map > *")
      .selectAll("#singleNode" + dx.id)
      .selectAll("rect")
      .remove();
    d3.selectAll(".vis-map > *")
      // .selectAll("#singleNode" + dx.id)
      .selectAll(".keywordText")
      .remove();
    d3.select(".vis-map")
      .select("#singleNode" + dx.id)
      .selectAll(".keywordRect")
      .data(dx.keywords)
      .enter()
      .append("rect")
      .attr(
        "transform",
        (d, i) =>
          `translate(${keywordOffset(dx.keywords.length, i).x + 20},${
            keywordOffset(dx.keywords.length, i).y
          })`
      )
      .attr("fill", "black")
      .attr("display", (d) => (target === d ? "block" : "none"))
      .attr("width", 70)
      .attr("height", 25)
      .attr("rx", 5)
      .attr("ry", 5);

    d3.select(".vis-map")
      .select("#singleNode" + dx.id)
      .selectAll(".keywordText")
      .data(dx.keywords)
      .enter()
      .append("text")
      .attr("class", "keywordText")
      .attr("font-size", 12)
      .attr("fill", "white")
      .attr("display", (d) => (target === d ? "block" : "none"))
      .attr(
        "transform",
        (d, i) =>
          `translate(${keywordOffset(dx.keywords.length, i).x + 30},${
            keywordOffset(dx.keywords.length, i).y + 15
          })`
      )
      .text((d) => d);
  }
  function genLinkMap(relations) {
    const hash = {};
    relations.map(function ({ source, target, relation }) {
      const key = source + "-" + target;
      if (hash[key]) {
        hash[key] += 1;
        hash[key + "-relation"] += "、" + relation;
      } else {
        hash[key] = 1;
        hash[key + "-relation"] = relation;
      }
    });
    return hash;
  }
  function genLinks(relations) {
    const indexHash = {};
    return relations.map(function ({ id, source, target, relation, value }, i) {
      const linkKey = source + "-" + target;
      const count = linkMap[linkKey];
      if (indexHash[linkKey]) {
        indexHash[linkKey] -= 1;
      } else {
        indexHash[linkKey] = count - 1;
      }
      return {
        id,
        source: nodesMap[source],
        target: nodesMap[target],
        relation,
        value,
        relations: linkMap[linkKey + "-relation"],
        count: linkMap[linkKey],
        index: indexHash[linkKey],
      };
    });
  }
  // 生成关系连线路径
  function genLinkPath(link) {
    const count = link.count;
    const index = link.index;
    let sx = link.source.x;
    let tx = link.target.x;
    let sy = link.source.y;
    let ty = link.target.y;
    return "M" + sx + "," + sy + " L" + tx + "," + ty;
  }
  function genNodesMap(nodes) {
    const hash = {};
    nodes.map(function ({ id, name, school, type, keywords }) {
      hash[id] = {
        id,
        name,
        school,
        type,
        keywords,
      };
    });
    return hash;
  }
  // 处理节点文字换行
  function textBreaking(d3text, text) {
    const len = text.length;
    if (len <= 3) {
      d3text
        .append("tspan")
        .attr("x", 0)
        .attr("y", -3)
        .style("fill", circleWordColor)
        .text(text);
    } else {
      const topText = text.substring(0, 3);
      const midText = text.substring(3, 7);
      let botText = text.substring(7, len);
      let topY = -22;
      let midY = 8;
      let botY = 34;
      if (len <= 9) {
        topY += 10;
        midY += 10;
      } else {
        botText = text.substring(7, 9) + "...";
      }
      d3text.text("");
      d3text
        .append("tspan")
        .attr("x", 0)
        .attr("y", topY)
        .style("fill", circleWordColor)
        .text(function () {
          return topText;
        });
      d3text
        .append("tspan")
        .attr("x", 0)
        .attr("y", midY)
        .style("fill", circleWordColor)
        .text(function () {
          return midText;
        });
      d3text
        .append("tspan")
        .attr("x", 0)
        .attr("y", botY - 7)
        .style("fill", circleWordColor)
        .text(function () {
          return botText;
        });
    }
  }
  // ticked
  function ticked() {
    // 连线路径
    links.attr("d", (link) => genLinkPath(link));
    // 连线文字位置
    linksText
      .attr("x", function (d) {
        return (d.source.x + d.target.x) / 2;
      })
      .attr("y", function (d) {
        return (d.source.y + d.target.y) / 2;
      });
    // 节点位置
    gs.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  }
  // drag
  function started(event, d) {
    if (!event.active) {
      forceSimulation.alphaTarget(0.8).restart(); // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0, 1]
    }
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function ended(event, d) {
    if (!event.active) {
      forceSimulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
};
export default draw;
