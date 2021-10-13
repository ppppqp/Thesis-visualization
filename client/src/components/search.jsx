import { Divider } from 'antd';
import React, { Component } from 'react';
import * as d3 from "d3";
import "./search.css"
class Search extends Component {
  state = {  }
  componentDidMount(){
  }

  onClick(){
    let{onChangeTopic, onChangeMentor, isMentor} = this.props;
    var datalist = document.querySelector("#exampleDataList");
    if(!isMentor) onChangeTopic(datalist.value);
    else onChangeMentor(datalist.value)
    console.log(datalist.value)
  }
  render() { 
    //console.log(this.props);
    const{isMentor} = this.props;
    //const isMentor = this.props.match.path === "/Mentor";
    if(!isMentor)
    return (<div class = "inputGroup">
     <label for="exampleDataList" class="form-label"></label>
      <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="搜索学院"/>
      <datalist id="datalistOptions">
        <option value = "全选"></option>
        <option value="安泰经济与管理学院"/>
        <option value="化学化工学院"/>
        <option value="药学院"/>
        <option value="船舶海洋与建筑工程学院"/>
        <option value="生命科学技术学院"/>
        <option value="农业与生物学院"/>
        <option value="物理与天文学院"/>
        <option value="电子信息与电气工程学院(计算机系)"/>
        <option value="电子信息与电气工程学院(电气系)"/>
        <option value="凯原法学院"/>
        <option value="电子信息与电气工程学院(电子系)"/>
        <option value="环境科学与工程学院"/>
        <option value="塑料成型技术与装备研究院"/>
        <option value="生物医学工程学院"/>
        <option value="马克思主义学院"/>
        <option value="高等教育研究院"/>
        <option value="国际与公共事务学院"/>
        <option value="数学科学学院"/>
        <option value="南加州大学文化创意产业学院"/>
        <option value="外国语学院"/>
        <option value="中美物流研究院"/>
        <option value="设计学院"/>
        <option value="人文学院"/>
        <option value="媒体与传播学院"/>
        <option value="电子信息与电气工程学院(微纳电子系)"/>
        <option value="电子信息与电气工程学院(微电子学院)"/>
        <option value="材料科学与工程学院"/>
        <option value="电子信息与电气工程学院(网络空间安全学院)"/>
        <option value="电子信息与电气工程学院(软件学院)"/>
        <option value="系统生物医学研究院"/>
        <option value="电子信息与电气工程学院(自动化系)"/>
        <option value="电子信息与电气工程学院"/>
        <option value="上海交大-巴黎高科卓越工程师学院"/>
        <option value="电子信息与电气工程学院(仪器系)"/>
        <option value="航空航天学院"/>
        <option value="上海交大密西根学院"/>
        <option value="人文艺术研究院"/>
        <option value="微纳科学技术研究院"/>
        <option value="科学史与科学文化研究院"/>
        <option value="国际教育学院"/>
      </datalist>
      <button type="button" class="btn btn-primary" onClick={()=>this.onClick()}>Search</button>
    </div>);
    else return(
      <div class = "inputGroup">
     <label for="exampleDataList" class="form-label"></label>
      <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."/>
      <button type="button" onClick={()=>this.onClick()}>Search</button>
    </div>
    )
  }
}
 
export default Search;