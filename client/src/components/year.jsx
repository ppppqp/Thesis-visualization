import React, { Component } from 'react';
import "./year.css"
class Year extends Component {
  state = {  }
  Select(){
    var obj = document.getElementById("year"); //定位id
    var index = obj.selectedIndex; // 选中索引
    var text = obj.options[index].text; // 选中文本
    var value = obj.options[index].value; // 选中值
    this.props.onChangeYear(value)
  }
  render() {
    let yearRange = ["2018", "2019"] 
    return ( 
      <select class="form-select" aria-label="Default select example" id = "year"  onChange = {()=>this.Select()}>

        {
          yearRange.map((year)=>{
            return <option value={year}>{year}</option>
          })
        }
      </select>
     );
  }
}
 
export default Year;