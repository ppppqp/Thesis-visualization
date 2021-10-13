import * as d3 from "d3";
import Axios from "axios";
import colorScale from "../../colorScale";
import mentorPosition from "../../position_json";
const draw = ({
  mapNode,
  scale,
  width,
  height,
  Ox,
  Oy,
  Oscale,
  onChangeMentor,
  selectedMentor,
  onAppendMentorL,
  selectedMentorL,
}) => {
  // color scale
  Ox = Ox * scale;
  Oy = Oy * scale;
  const edgeColor = "#999";
  const edgeColorH = "red";
  const edgeColorHL = "blue";
  // const colorScale = {
  //   安泰经济与管理学院: "#e8d4d4",
  //   化学化工学院: "#F7B5A2",
  //   机械动力与工程学院: "#B9E4DD",
  //   aaa: "#F7B5A2",
  // };

  const circleColor = "#e8d4d4";
  const circleWordColor = "#111";

  const MentorCircleR = (length) => {
    if (length <= 8) return 25 * scale;
    else return ((2 * length) / Math.PI) * 5 * scale;
  };
  const MentorEdgeLength = 200 * scale;
  const keywEdgeLength = (length) => MentorCircleR(length) * 1.5;
  const KeywordCircleR = 20 * scale;

  let margin = { top: 10, bottom: 10, left: 10, right: 10 };
  d3.selectAll(".vis-whole-map > *").remove();
  let svg = d3
    .select(".vis-whole-map")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  svg
    .call(
      d3.zoom().on("zoom", function (event) {
        // console.log(event.transform);
        const transform = `translate(${Ox + event.transform.x}, ${
          Oy + event.transform.y
        }) scale(${Oscale * event.transform.k})`;
        g.attr("transform", transform)
          .attr("Ox", Ox + event.transform.x)
          .attr("Oy", Oy + event.transform.y)
          .attr("Oscale", Oscale * event.transform.k);
      })
    )
    .on("dblclick.zoom", null);
  let g = svg
    .append("g")
    .attr("transform", `translate(${Ox}, ${Oy}) scale(${Oscale})`)
    .attr("Ox", Ox)
    .attr("Oy", Oy)
    .attr("Oscale", Oscale)
    .attr("class", "container");
  // 准备数据
  // 节点集;transform="translate(435.29639556332233,81.34556908343316) scale(0.3626802323806052)"
  mapNode = [
    {
      id: 0,
      name: "周洁如",
      school: "安泰经济与管理学院",
      size: 2,
      position: {
        x: 15,
        y: 20,
      },
      keywords: ["神经网络", "可视化", "aaa", "bbb"],
    },
    {
      id: 1,
      name: "江平开",
      school: "化学化工学院",
      size: 2,
      position: {
        x: 10,
        y: 29,
      },
      keywords: ["神经网络", "可视化", "abbb"],
    },
    {
      id: 2,
      name: "吕巍",
      school: "安泰经济与管理学院",
      size: 2,
      position: {
        x: 450,
        y: 120,
      },
      keywords: ["神经网络", "可视化"],
    },
    {
      id: 3,
      name: "张鹏翥",
      school: "化学化工学院",
      size: 2,
      position: {
        x: 482,
        y: 566,
      },
      keywords: ["神经网络", "bcaa"],
    },
    {
      id: 4,
      name: "蒋炜",
      school: "安泰经济与管理学院",
      size: 2,
      position: {
        x: 230,
        y: 833,
      },
      keywords: ["神经网络", "可视化", "abcc", "aaa", "bbb"],
    },
    {
      id: 5,
      name: "田澎",
      school: "机械动力与工程学院",
      size: 2,
      position: {
        x: 295,
        y: 467,
      },
      keywords: ["神经网络", "可视化", "aaa", "bbb"],
    },
    {
      id: 6,
      name: "黄丞",
      school: "机械动力与工程学院",
      size: 2,
      position: {
        x: 554,
        y: 765,
      },
      keywords: ["神经网络", "可视化"],
    },
    {
      id: 7,
      name: "周颖",
      school: "安泰经济与管理学院",
      size: 2,
      position: {
        x: 732,
        y: 231,
      },
      keywords: ["神经网络", "可视化"],
    },
    {
      id: 8,
      name: "顾琴轩",
      school: "安泰经济与管理学院",
      size: 2,
      position: {
        x: 876,
        y: 279,
      },
      keywords: ["神经网络", "可视化"],
    },
    {
      id: 9,
      name: "费一文",
      school: "化学化工学院",
      size: 2,
      position: {
        x: 1000,
        y: 29,
      },
      keywords: ["神经网络", "可视化"],
    },
  ];
  let nodes = mentorPosition;
  // let nodes = mapNode;
  // console.log(mapNode);
  // 边集'
  // let tempEdges = mapEdge;
  // console.log(mapEdge);
  let tempEdges =
    mapNode.length == 0
      ? []
      : [
          { id: 1, source: 0, target: 1, relation: "渠道管理", value: 2 },
          { id: 2, source: 0, target: 2, relation: " 营销策略", value: 2 },
          { id: 3, source: 0, target: 3, relation: "企业模式", value: 2 },
          { id: 4, source: 0, target: 4, relation: "社交网络", value: 2 },
        ];

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

  // 绘制边
  // let links = g
  //   .append("g")
  //   .selectAll("path")
  //   .data(edges)
  //   .enter()
  //   .append("path")
  //   .attr("d", (link) => genLinkPath(link)) // 遍历所有数据。d表示当前遍历到的数据，返回绘制的贝塞尔曲线
  //   .attr("id", (d, i) => {
  //     return "edgepath" + d.id;
  //   }) // 设置id，用于连线文字
  //   .style("stroke", edgeColor) // 颜色
  //   .style("stroke-width", 2) // 粗细
  //   .attr("class", "lines")
  //   .attr("marker-end", "url(#resolved)"); // 根据箭头标记的id号标记箭头
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
      let cirX = d.position.x;
      let cirY = d.position.y;
      return "translate(" + cirX + "," + cirY + ")";
    });
  // 鼠标交互
  gs.on("mouseover", function (event, d, i) {
    // 显示连接线上的文字
    // toggleLine(links, d, true);
    toggleNode(gs, d, true);
  })
    .on("mouseout", function (event, d, i) {
      // 隐去连接线上的文字
      // toggleLine(links, d, false);
      toggleNode(gs, d, false);
    })
    .on(
      "click",
      function (event, d, i) {
        console.log(d.name);
        onChangeMentor(d.name);
      },
      true
    )
    .on("contextmenu", function (event, d, i) {
      onAppendMentorL(d.name);
      event.preventDefault();
    })
    .call(d3.drag().on("start", started).on("drag", dragged).on("end", ended));
  svg.on(
    "click",
    function (event) {
      nodes.forEach((d) => (d.clickFlag = false));
      var target = event.srcElement, //  获取事件发生源
        data = d3.select(target).datum(); //  获取事件发生源的数据
      removeSingle();
    },
    true
  );

  function toggleLine(linkLine, currNode, isHover) {
    if (isHover) {
      // 加重连线样式
      // links
      //   .style("opacity", 0.1)
      //   .filter((link) => isLinkLine(currNode, link))
      //   .style("opacity", 1)
      //   .classed("link-active", true);
    } else {
      // links.style("opacity", 1).classed("link-active", false);
    }
  }
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

    // var color=d3.schemeCategory10;

    // 定义两条路径以使标签的方向正确
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
    // links.style("opacity", 1).classed("link-active", false);
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
    // links.style("opacity", 1).classed("link-active", false);
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
    .attr("r", (d) => MentorCircleR(d.size))
    .attr("cx", (d) => d.position.x * 80 * scale)
    .attr("cy", (d) => d.position.y * 80 * scale)
    .attr("id", function (d) {
      return "circle" + d.id;
    })
    .attr("fill", function (d, i) {
      const { name, id, school, size, keywords, x, y, vx, vy, vz } = d;
      // console.log(d);
      // console.log(name, id, school, type, keywords, x, y, vx, vy, vz);
      return colorScale(d.school.slice(5), "T");
    })
    .attr("stroke", (d) => {
      if (d.name === selectedMentor[0]) return edgeColorH;
      // console.log("selectedMentorL", selectedMentorL);
      if (selectedMentorL.indexOf(d.name) > -1) {
        console.log("here");
        return edgeColorHL;
      }
      return edgeColor;
    })
    .attr("stroke-width", (d) =>
      d.name === selectedMentor[0] || selectedMentorL.indexOf(d.name) > -1
        ? 15
        : 3
    );

  // 文字
  // var nodeText = gs
  //   .append("text")
  //   // .attr('x', -10)
  //   .attr("y", -20)
  //   .attr("dy", 10)
  //   .attr("text-anchor", "middle")
  //   .attr("x", (d) => d.position.x)
  //   .attr("y", (d) => d.position.y)
  //   .style("font-size", 12)
  //   .attr("x", function ({ name }) {
  //     return textBreaking(d3.select(this), name);
  //   });
  gs.append("title").text((node) => {
    return node.name;
  });

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
    nodes.map(function ({ id, name, school, size, position, keywords }) {
      hash[id] = {
        id,
        name,
        school,
        size,
        position,
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
    // links.attr("d", (link) => genLinkPath(link));
    // 连线文字位置
    // 节点位置
    gs.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  }
  // drag
  function started(event, d) {
    if (!event.active) {
      // forceSimulation.alphaTarget(0.8).restart(); // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0, 1]
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
      // forceSimulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
};
export default draw;

// coursera-dl -u panqiping@outlook.com -p Peterpan61 --video-resolution 720p --download-quizzes --download-notebooks --cauth  k-YowgyTjx7qO1675wqByXaAiq_RLs2U9ifp6iCx9pWb8cyiCt3q5XPOUnIG3jQFHuHjC7vsp0Yi6Ant7lImHA.GyM5kFE6tr95bCQUbKXRDA.nKYJO2RX-Ypifv7YqUQrMFBiIBjOpAdyq-ihsnOVohW3FU4AMl8S_2Ic6CD7K0IEy2lwuA_YMMwqW5NaG1VkBgggneIEOtonf3_94J6hRErnB9cUKxFsnXGQlShzcqo9ziY14cWAu6lYhR4fq7saGQHsTCeRXISutx-eJQMnvgix3CmLKXMITzf-RW42EmRpozZzSMDi_Li4axYKqVr8gNnq-sZZ0JTs1LnAE9l7iCZLc6XTfy2lU5kU8-2Am03w2F8D9Negy3_CBYkWpz0XGEcAkSwnpFjKiqn3fpD1DGXsvt2mRu_AA_LIGhS3vyafLc8eJjvjppZHdqaiyacLsCPXgzXucLyEwPSM2kdd6hLfCYKAhQQxbLeZCs6MXYM5Jq9eSj2kakzyM6dVThZL4iK5YW46OuIVdMLCf7MIfng  nlp-sequence-models
