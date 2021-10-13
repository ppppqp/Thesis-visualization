import React, { Component } from "react";
import { select, csv, map, count } from "d3";
import { Layout } from "antd";
import Axios from "axios";
import "./dashboardR.css";
import Pool from "./pool";
import weight from "./graphWeight";
import { forEach, range } from "lodash";
import ThemeRiver from "./charts/ThemeRiver/index";
import Search from "./components/search";
import allTopic from "./data/allTopic";
import Legend from "./components/legend";
import Info from "./components/info";
import Recommend from "./components/recommend";
import Scatter from "./charts/Graph/index";
import Cloud from "./components/cloud";
import detailedKey from "./detailedKey";
import Line from "./charts/Line/index";
import Map from "./charts/Map/index";
import mentorRelation from "./mentorRelation";
import MapBox from "./components/MapBox";
import Flow from "./charts/Sankey/index";
import { Tooltip } from "react-bootstrap";
// import { bootstrap } from "bootstrap";
const { Sider, Content, Footer } = Layout;

export default class DashboardR extends Component {
  componentDidMount() {
    this.getData();
    this.updateGraph();
    this.updateMap();
    this.updateFlow();
  }
  state = {
    data: [],
    Keys: [],
    dataE: [],
    dataV: [],
    dataRecom: [],
    selectedMentor: ["明新国", "史占中", "孙小明", "顾孟迪", "吕巍"],
    selectedMentorL: [],
    selectedTopic: allTopic,
    selectedYear: "2019",
    dataTheme: [
      { year: 2019 },
      { year: 2018 },
      { year: 2017 },
      { year: 2016 },
      { year: 2015 },
    ],
    dataLegend: {},
    dataRecomKey: {},
    mapNode: [],
    mapEdge: [],
    flowNode: [],
    flowLink: [],
  };
  changeYearHandle = (target) => {
    this.setState({ selectedYear: target.toString() });
    Axios.post("http://localhost:3001/changeYear", {
      selectedYear: this.state.selectedYear,
    }).then(() => {
      alert("success");
    });
    Axios.get("http://localhost:3001/getYear", {
      params: { year: this.state.selectedYear },
    }).then((response) => {
      // console.log(response);
    });
    //this.updateLegend();
    //this.updateGraph();
  };
  changeTopicHandle = (target) => {
    if (target === "全选") this.setState({ selectedTopic: allTopic });
    else this.setState({ selectedTopic: [target] });
    this.updateTheme();
    this.updateGraph();
  };
  changeMentorHandle = async (target) => {
    this.setState({ selectedMentor: [target] });
    // this.updateTheme();
    // this.updateGraph();
    await this.updateMap();
  };
  appendMentorHandle = (target) => {
    const mentorL = this.state.selectedMentorL;
    if (mentorL.indexOf(target) === -1) mentorL.push(target);
    else mentorL.splice(mentorL.indexOf(target), 1);
    console.log("mentorL", mentorL);
    this.setState({ selectedMentorL: mentorL });
    this.updateFlow();
  };
  resetMentorLHandle = async () => {
    await this.setState({ selectedMentorL: [] });
    await this.updateFlow();
  };
  getData() {
    csv("./data_brief.csv").then((data) => {
      data.forEach((d) => {
        d.school = d.school.slice(5);
        if (d.school === "上海交大-密西根大学联合学院")
          d.school = "上海交大密西根学院";
        if (d.school === "上海交通大学上海高级金融学院")
          d.school = "上海高级金融学院";
        /*let arr = [];
        if (d.keyword[d.keyword.length - 1] === ";")
          d.keyword.slice(0, d.keyword.length - 1);
        if (d.keyword.indexOf(";") !== -1) arr = d.keyword.split(";");
        //get rid of the last ";"
        else if (d.keyword.indexOf("") !== -1) arr = d.keyword.split(",");
        for (let i = 0; i < arr.length; i++) {
        */
        //  arr[i] = arr[i].replace(/\s*/g, "");
        //}
        //d.keyword = arr;
      });
      this.setState({ data: data });

      this.updateGraph();
      this.updateTheme();
    });
    let Keys = [];
    csv("./Keys2.csv").then((data) => {
      Keys = data;
      this.setState({ Keys: Keys });
    });
  }
  eliminateNan(index, range, newDataTheme, value) {
    for (let i = 0; i < range; i++) {
      if (i !== index && !newDataTheme[i].hasOwnProperty(value))
        newDataTheme[i][value] = 0;
    }
  }
  async updateTheme() {
    let { data, selectedTopic, selectedMentor } = this.state;
    const isMentor = this.props.match.path === "/Mentor";
    let key = isMentor ? "mentor" : "school";
    let yearRange = ["2019", "2018"];
    let newDataTheme = [{ year: 2019 }, { year: 2018 }];
    let list = [];
    for (let year of yearRange) {
      const response = await Axios.get("http://localhost:3001/getTheme", {
        params: {
          year: year,
          topic: this.state.selectedTopic[0],
        },
      });
      let data = response.data;
      for (let i = 0; i < 8; i++) {
        //console.log(data[i]);
        if (list.indexOf(data[i].keyw) == -1) list.push(data[i].keyw);
      }
      for (let i = 0; i < 8; i++)
        newDataTheme[this.getYearIndex(year)][data[i].keyw] = data[i].num;
    }
    for (let year of yearRange) {
      for (let item of list) {
        if (!newDataTheme[this.getYearIndex(year)].hasOwnProperty(item))
          newDataTheme[this.getYearIndex(year)][item] = 0;
      }
    }
    this.setState({ dataTheme: newDataTheme });
    /*
    let filtered = data.filter((d) => {
      return isMentor
        ? selectedMentor[0] === d["mentor"]
        : selectedTopic.indexOf(d["school"]) != -1;
    });

    filtered.forEach((d) => {
      var temp;
      if (!newDataTheme[this.getYearIndex(d.year)].hasOwnProperty(d[key]))
        newDataTheme[this.getYearIndex(d.year)][d[key]] = 1;
      else newDataTheme[this.getYearIndex(d.year)][d[key]]++;
      this.eliminateNan(this.getYearIndex(d.year), 5, newDataTheme, d[key]);
    });
    */

    this.updateLegend();
  }
  updateLegend() {
    const { dataTheme, selectedYear } = this.state;
    if (selectedYear === "2019") this.setState({ dataLegend: dataTheme[0] });
    if (selectedYear === "2018") this.setState({ dataLegend: dataTheme[1] });
    if (selectedYear === "2017") this.setState({ dataLegend: dataTheme[2] });
    if (selectedYear === "2016") this.setState({ dataLegend: dataTheme[3] });
    if (selectedYear === "2015") this.setState({ dataLegend: dataTheme[4] });
  }
  async updateMap() {
    const { selectedMentor, selectedYear } = this.state;
    const mentorNode = [];
    const mentor = selectedMentor[0];
    const year = selectedYear;
    let count = 0;
    const mentorEdge = [];
    const allMentor = [mentor];
    // console.log(mentorRelation[mentor]);
    for (let m of mentorRelation[mentor]) {
      // console.log(m);
      allMentor.push(m.name);
    }
    for (let m of allMentor) {
      // for every mentor of interest
      const response = await Axios.get("http://localhost:3001/getMentor", {
        params: {
          year,
          mentorOI: m,
        },
      });
      const data = response.data;
      // console.log(data);
      const keywordList = [];
      // keywordList = ["aaa;bbb;ccc"]

      for (let i of data) {
        keywordList.push(i.keyword);
      }
      // console.log(keywordList);
      const temp = [];
      for (let keyword of keywordList) {
        // filter the keywords in the pool
        Pool.filter((d) => {
          if (keyword.indexOf(d) > -1 && temp.indexOf(d) == -1) temp.push(d);
        });
      }
      //temp = ["aaa", "bbb", "ccc"]
      mentorNode.push({
        id: count,
        name: m,
        school: "aaa",
        type: 0,
        keywords: temp,
      });
      if (count > 0)
        mentorEdge.push({
          id: count,
          source: 0,
          target: count,
          relation: "相关",
          value: 1,
        });
      count++;
    }

    this.setState({ mapNode: mentorNode, mapEdge: mentorEdge });
  }
  async updateFlow() {
    const { selectedMentorL, selectedYear } = this.state;
    let index = 0;
    let mentorIndex = {},
      schoolIndex = {},
      keywIndex = {},
      nodes = [],
      links = [];
    let keywPool = [];
    let mentorHasOne = {}; // dealing with hierarchy
    for (let m of selectedMentorL) {
      // for every mentor of interest
      mentorHasOne[m] = false;
      const response = await Axios.get("http://localhost:3001/getMentor", {
        params: {
          year: selectedYear,
          mentorOI: m,
        },
      });
      const data = response.data;
      const school = data[0].school;

      // add school/mentor
      if (schoolIndex[school] === undefined) {
        nodes.push({ name: school });
        schoolIndex[school] = index;
        index++;
      }
      if (mentorIndex[m] === undefined) {
        nodes.push({ name: m });
        mentorIndex[m] = index;
        index++;
      }
      links.push({
        source: schoolIndex[school],
        target: mentorIndex[m],
        value: 2,
      });

      const keywordList = [];
      // keywordList = ["aaa;bbb;ccc"]
      for (let i of data) {
        keywordList.push(i.keyword);
      }
      const temp = [];
      for (let keyword of keywordList) {
        // filter the keywords in the pool
        Pool.filter((d) => {
          if (keyword.indexOf(d) > -1 && temp.indexOf(d) == -1) temp.push(d);
        });
      }
      for (let d of temp) {
        // filter the keywords in the pool
        if (keywIndex[d] !== undefined) {
          //already has keyw node
          mentorHasOne[m] = true;
          links.push({
            source: mentorIndex[m],
            target: keywIndex[d],
            value: 2,
          });
        } else {
          // not exist, check in pool
          const res = keywPool.filter((k) => k.keyword === d);
          if (res.length > 0) {
            // keyword found in previous search
            mentorHasOne[m] = true;
            const prevRecord = res[0];
            nodes.push({ name: d });
            keywIndex[d] = index;
            links.push({
              source: mentorIndex[prevRecord.mentor],
              target: index,
              value: 2,
            });
            links.push({
              source: mentorIndex[m],
              target: index,
              value: 2,
            });
            index++;
          } else keywPool.push({ mentor: m, keyword: d });
        }
      }
    }
    for (let m in mentorHasOne) {
      if (mentorHasOne[m] === false) {
        nodes.push({ name: "null" });
        links.push({
          source: mentorIndex[m],
          target: index,
          value: 2,
        });
        index++;
      }
    }
    this.setState({ flowNode: nodes, flowLink: links });
  }
  updateGraph() {
    const isMentor = this.props.match.path === "/Mentor";
    const { data, selectedYear, selectedTopic, Keys } = this.state;
    let edgeSet = [],
      verticeSet = [];
    let recomSet = {};

    const target = selectedTopic[0];
    const index = allTopic.indexOf(target); //TODO
    let count = 1;
    verticeSet.push({
      name: target,
      value: 10,
    });

    let keysSorted = Object.keys(weight[index]).sort(function (a, b) {
      return weight[index][b] - weight[index][a];
    });
    for (let i = 0; i < 8; i++) {
      recomSet[keysSorted[i]] = weight[index][keysSorted[i]];
    }
    this.setState({ dataRecom: recomSet });
    const temp = detailedKey[allTopic.indexOf(selectedTopic[0])];
    this.setState({
      dataRecomKey: temp,
    });
    for (let key in weight[index]) {
      if (weight[index][key] > 0) {
        verticeSet.push({
          name: key,
          value: 3,
        });
        edgeSet.push({
          source: 0,
          target: count,
          value: Math.sqrt(2 / weight[index][key]),
        });
        count++;
      }
    }
    this.setState({ dataV: verticeSet });
    this.setState({ dataE: edgeSet });
  }
  getYearIndex(selectedYear) {
    if (selectedYear === "2019") return 0;
    if (selectedYear === "2018") return 1;
    if (selectedYear === "2017") return 2;
    if (selectedYear === "2016") return 3;
    if (selectedYear === "2015") return 4;
  }
  render() {
    let {
      data,
      selectedYear,
      selectedTopic,
      selectedMentor,
      dataV,
      dataE,
      dataTheme,
      dataLegend,
      dataRecom,
      dataRecomKey,
      mapNode,
      mapEdge,
      selectedMentorL,
    } = this.state;

    const isMentor = this.props.match.path === "/Mentor";
    var name;
    var dataScatterV = [];
    var dataScatterE = [];
    if (!isMentor) {
      name = selectedTopic;
      dataTheme.forEach((d) => {
        if (d.year == String(selectedYear)) {
          for (let key in d) {
            let temp = {};
            temp["name"] = key;
            temp["value"] = d[key];
            dataScatterV.push(temp);
          }
        }
      });
    } else {
    }
    return (
      <div>
        <section class="relationView">
          <div class="section1">
            <div class="mainbox">
              {/* <div class="column">
                <div class="panel profile">
                  <div class="boxhead">查询 Search</div>
                  <Search
                    onChangeTopic={this.changeTopicHandle}
                    onChangeMentor={this.changeMentorHandle}
                    isMentor={isMentor}
                  />
                  <div class="panel-footer"></div>
                </div>
              </div> */}

              <div class="column">
                <div class="panel info">
                  <div class="boxhead">
                    Sankey Graph
                    <button
                      className="clearButton btn btn-warning"
                      onClick={() => this.resetMentorLHandle()}
                    >
                      clear Sankey
                    </button>
                  </div>

                  {/* <Scatter
                    dataV={dataV}
                    dataE={dataE}
                    selectedTopic={selectedTopic}
                  />  */}
                  <Flow
                    data={{
                      nodes: this.state.flowNode,
                      links: this.state.flowLink,
                    }}
                  />
                  <div class="panel-footer"></div>
                </div>
              </div>
            </div>
            {/* <div class="mainbox">
              <div class="column">
                <div class="panel recommend">
                  <div class="boxhead">Recommendation</div>
                  <Recommend
                    data={dataRecom}
                    keys={dataRecomKey}
                    fulldata={data}
                  />
                  <div class="panel-footer"></div>
                </div>
              </div>
            </div> */}
          </div>
          <div class="section2">
            <div class="mainbox">
              <div class="column">
                <div class="panel graph">
                  <div class="boxhead">Knowledge Graph</div>
                  <MapBox
                    mapNode={mapNode}
                    mapEdge={mapEdge}
                    onChangeMentor={this.changeMentorHandle}
                    selectedMentor={selectedMentor}
                    selectedMentorL={selectedMentorL}
                    onAppendMentorL={this.appendMentorHandle}
                  />
                  <div class="panel-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <script src="dist/main.js"></script>
      </div>
    );
  }
}
