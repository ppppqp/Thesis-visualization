import React, { Component } from 'react';
class Add extends Component {
  state = {  }
  onClick(){
    let{onChangeTopic, onChangeMentor, isMentor} = this.props;
    var datalist = document.querySelector("#addNodeForm");
    if(!isMentor) onChangeTopic(datalist.value);
    else onChangeMentor(datalist.value)
    console.log(datalist.value)
  }
  render() { 
    return (<div class = "inputGroup">
     <label for="addNodeForm" class="form-label"></label>
      <input class="form-control" list="datalistOptions" id="addNodeForm" placeholder="搜索学院"/>
      <button type="button" class="btn btn-primary" onClick={()=>this.onClick()}>Search</button>
    </div>
    )
  }

}
 
export default Add;