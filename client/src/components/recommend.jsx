import React, { Component } from 'react';
import colorScale from '../colorScale';
import * as d3 from "d3";
import "./recommend.css"
import HiddenBox from "./HiddenBox";
class Recommend extends Component {
  state = {
    id: -1,
    selected: 0
    }
  findMax(){
    const {data} = this.props;
    let maxNum = 0;
    for(let key in data){
      if(maxNum < data[key]) maxNum = data[key];
    }
    return maxNum;
  }
  onClick(id){
    if(this.state.selected === 1){
      this.setState({id:-1});
      this.setState({selected: 0});
    }
    else {
      this.setState({id:id});
      this.setState({selected: 1});
    }
  }

  onHover(id){
    const selector = "#"+"rec"+id;
    const element = document.querySelector(selector);
    element.style.opacity = "0.8";
  }
  onLeave(id){
    const selector = "#"+"rec"+id;
    const element = document.querySelector(selector);
    element.style.opacity = "1";
  }
  scaleLength(t){
    const {data} = this.props;
    const maxNum = this.findMax();
    const scale = d3.scaleLinear().domain([0, maxNum]).range([0,400])
    return scale(data[t] === undefined ? 0 : data[t]);
  }
  render() {
    let{data, keys,isMentor, fulldata} = this.props;
    let domain = [];
    for(let key in data){
         domain.push(key);
    }
    console.log('keys in recommend', keys);
    console.log('topic in recommend', domain);
    return( <div className = "Recommend-vis">
      {
        domain.map((t)=>{
          console.log('see', keys[t])
          return(
            <div>
              <div class = "row">
                <div class = "colorbox">
                  <div class = "color"
                        id = {"rec" + domain.indexOf(t)} 
                        onClick={()=>this.onClick(domain.indexOf(t))} 
                        onMouseOver={()=>this.onHover(domain.indexOf(t))}
                        onMouseLeave = {()=>this.onLeave(domain.indexOf(t))}
                        style = {{background: colorScale(t, "T"), width: this.scaleLength(t)+"px"}}>{data[t]}
                  </div>
                  </div>
                <div class = "name">{t}</div>
              </div>
                {<HiddenBox id = {domain.indexOf(t)} chosen = {this.state.id} topic = {t} keys = {keys} fulldata={fulldata} selectedYear={this.props.selectedYear}>
              </HiddenBox> }
            </div>
          )
        })
      }
    </div>
    );
  }
    // let{data} = this.props;
    // let domain = [];
    // for(let key in data){
    //   domain.push(key);
    // }
    // return( 
    //   <div className="Recommend-vis">
    // )}
}

export default Recommend;

/* {
          domain.map((t)=>{
            return (
              <div>
              <div class ="row">
                <div class = "colorbox">
                  <div class = "color"
                       id = {"rec" + domain.indexOf(t)} 
                       onClick={()=>this.onClick(domain.indexOf(t))} 
                       onMouseOver={()=>this.onHover(domain.indexOf(t))}
                       onMouseLeave = {()=>this.onLeave(domain.indexOf(t))}
                       style = {{background: colorScale(t, "T"), width: this.scaleLength(t)+"px"}}>{data[t]}</div>
                </div>
                <div class = "name">{t}</div>
             </div>
             <div>
             <HiddenBox id = {"box" + domain.indexOf(t)}>
             </HiddenBox>
             </div>
          );
          })
        }
      </div>
    );
  } */