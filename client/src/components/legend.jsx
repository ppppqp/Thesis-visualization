import React, { Component } from 'react';
//import colorScale from '../colorScale';
import * as d3 from "d3"
import draw from './drawLegend'
import { selectAll } from 'd3';
import Notice from './Notice'

import "./legend.css"
import Axios from "axios";

class Legend extends Component {
  keywordInfo={info:[]};
  state = {
    open: false,
  }
  componentDidMount() {
    //draw(this.props);
    //this.findMax()
  }

  componentDidUpdate(){
    
  }
  
  handleClickToOpen = () => {
    this.setState({open: true});
  };
  
  handleToClose = () => {
    this.setState({open: false});
  };
  findMax(){
    const {data, selectedYear} = this.props;
    let maxNum = 0;
    for(let key in data){
      if( key !=="year" &&  maxNum < data[key]) maxNum = data[key];
    }
    return maxNum;
  }
  scaleLength(t){
    const {data} = this.props;
    const maxNum = this.findMax();
    const scale = d3.scaleLinear().domain([0, maxNum]).range([0,250])
    return scale(data[t] === undefined ? 0 : data[t]);
  }
  Hover(t){
    document.querySelector("#"+t).style.opacity = 0.5
  }
  Leave(t){
    console.log("Leave")
    document.querySelector("#"+t).style.opacity = 1
    console.log(document.querySelector("#"+t))
    console.log("opacity set to 1")
  }
  async Click(keyw){

    await Axios.get("http://localhost:3001/getLegend", {
      params: { keyw: keyw, year: this.props.selectedYear, topic:this.props.selectedTopic },
    }).then((response) => {
      this.keywordInfo={
        school: this.props.selectedTopic,
        keyword: keyw,
        info: []
      }
      const data = response.data;
      for(let d of data){
        this.keywordInfo.info.push({
          title: d.title,
          mentor: d.mentor,
        })
      }
    });
    this.setState({open: true})
  }
  render() {
    let{data} = this.props;
    let list = []
    for(let k in data){
      if(k != "year" & data[k]>0) list.push(k)
    }
    var colorScale = d3
    .scaleOrdinal()
    .domain(list) //TODO
    .range(["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"]);
    return(
      <div className="Legend-vis">
        {
          list.map((t)=>{
            let color ={};
            color["bgcolor"] = colorScale(t);
            return (
              <div class ="row">
                <div class = "colorbox" id = {t} onClick={()=>this.Click(t) } onMouseEnter={()=>this.Hover(t)} onMouseLeave = {()=>this.Leave(t)}>
                  <div class = "color" style = {{background: colorScale(t, "T"), width: this.scaleLength(t)+"px"}}></div>
                </div>
                <div class = "name">{t}{'('+data[t]+')'}</div>
             </div>
          );
          })
        }
        <Notice open={this.state.open} handleToClose={this.handleToClose} keywordInfo={this.keywordInfo} />
      </div>
    )
  }
}
 
export default Legend;