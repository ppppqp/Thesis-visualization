import React, { Component } from "react";
import { select, csv, map } from "d3";
import { Layout } from "antd";
import Axios from "axios";
import "./dashboardT.css";
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

import Year from "./components/year";
const { Sider, Content, Footer } = Layout;

export default class DashboardT extends Component {
  componentDidMount() {
    this.getData();
    this.updateGraph();
  }
  state = {
    data: [],
    Keys: [],
    dataE: [],
    dataV: [],
    dataRecom: [],
    selectedMentor: ["董笑菊"],
    selectedTopic: allTopic,
    selectedYear: "2018",
    dataTheme: [
      { year: 2019 },
      { year: 2018 },
      { year: 2017 },
      { year: 2016 },
      { year: 2015 },
    ],
    dataLegend: {},
    dataRecomKey: {},
  };
  changeYearHandle = async (target) => {
    await this.setState({ selectedYear: target.toString() });
    Axios.post("http://localhost:3001/changeYear", {
      selectedYear: this.state.selectedYear,
    }).then(() => {
      // alert("success");
    });
    Axios.get("http://localhost:3001/getYear", {
      params: { year: this.state.selectedYear },
    }).then((response) => {
      console.log(response);
    });
    await this.updateLegend();
    await this.updateGraph();
  };
  changeTopicHandle = async (target) => {
    if (target === "全选") this.setState({ selectedTopic: allTopic });
    else await this.setState({ selectedTopic: [target] });
    await this.updateTheme();
    await this.updateGraph();
  };
  changeMentorHandle = async (target) => {
    await this.setState({ selectedMentor: [target] });
    await this.updateTheme();
    await this.updateGraph();
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
  updateGraph() {
    const { selectedTopic } = this.state;
    let recomSet = {};

    const target = selectedTopic[0];
    const index = allTopic.indexOf(target); //TODO

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
      dataTheme,
      dataLegend,
      dataRecom,
      dataRecomKey,
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
        <section>
          <div class="mainbox">
            <div class="column">
              <div class="panel profile">
                <div class="boxhead">查询 Search</div>
                <Search
                  onChangeTopic={this.changeTopicHandle}
                  onChangeMentor={this.changeMentorHandle}
                  isMentor={isMentor}
                />
                <Year onChangeYear={this.changeYearHandle} />
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="column">
              <div class="panel themeriver">
                <div class="boxhead">Cloud</div>
                <Cloud selectedTopic={selectedTopic} />
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="column">
              <div class="panel info">
                <div class="boxhead">Keyword Barchart</div>
                <Legend
                  selectedTopic={selectedTopic[0]}
                  selectedMentor={selectedMentor}
                  data={dataLegend}
                  selectedYear={selectedYear}
                  isMentor={isMentor}
                />
                {/* <Info
                  selectedYear={selectedYear}
                  selectedMentor={selectedMentor}
                  selectedTopic={selectedTopic}
                /> */}

                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
          <div class="mainbox">
            <div class="column">
              <div class="panel recommend">
                <div class="boxhead">School Relation</div>
                <Recommend
                  data={dataRecom}
                  keys={dataRecomKey}
                  fulldata={data}
                  selectedYear={selectedYear}
                />
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="column">
              <div class="panel graph">
                <div class="boxhead">Keyword Themeriver</div>
                <ThemeRiver
                  data={dataTheme}
                  width={1150}
                  height={600}
                  isMentor={isMentor}
                  selectedYear={selectedYear}
                  onChangeMentor={this.changeMentorHandle}
                  onChangeYear={this.changeYearHandle}
                  onChangeTopic={this.changeTopicHandle}
                />
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </section>
        <script src="dist/main.js"></script>
      </div>
    );
  }
}
