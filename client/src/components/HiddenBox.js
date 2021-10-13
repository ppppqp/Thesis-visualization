import React, { Component } from "react";
import "./HiddenBox.css";
import { forEach } from "lodash";
import Notice from "./Notice";
import Axios from "axios";
class HiddenBox extends Component {
  state = {
    open: false,
  };
  keywordInfo = { info: [] };
  handleClickToOpen = () => {
    this.setState({ open: true });
  };

  handleToClose = () => {
    this.setState({ open: false });
  };
  async click(k, topic) {
    //alert(topic);
    await Axios.get("http://localhost:3001/getLegend", {
      params: {
        keyw: k,
        year: this.props.selectedYear,
        topic: topic,
      },
    }).then((response) => {
      this.keywordInfo = {
        school: topic,
        keyword: k,
        info: [],
      };
      const data = response.data;
      for (let d of data) {
        this.keywordInfo.info.push({
          title: d.title,
          mentor: d.mentor,
        });
      }
    });
    this.setState({ open: true });
  }

  render() {
    let show = "none";
    const { keys, topic } = this.props;
    if (this.props.chosen === this.props.id) show = "block";
    return (
      <div class="hidden" style={{ display: show }}>
        {/* <span class="badge bg-primary">Keyword</span> */}
        <ul class="list">
          {keys[topic].map((k) => {
            return (
              <li class="item" key={k} onClick={() => this.click(k, topic)}>
                {k}
              </li>
            );
          })}
        </ul>
        <Notice
          open={this.state.open}
          handleToClose={this.handleToClose}
          keywordInfo={this.keywordInfo}
        />
      </div>
    );
  }
}

export default HiddenBox;
