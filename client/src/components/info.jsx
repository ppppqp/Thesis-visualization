import React, { Component } from 'react';
import "./info.css"
class Info extends Component {
  state = {  }
  render() { 
    const {selectedYear, selectedMentor, selectedTopic} = this.props;
    return ( 
      <div class = "Info">
        <div class = "yearDisplay">Year: {selectedYear}</div>
        
      </div>
    );
  }
}
 
export default Info;