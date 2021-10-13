import React, { Component } from 'react';
import draw from './drawCloud.js';
class Cloud extends Component {
  componentDidMount(){
    draw(this.props);
  }
  componentDidUpdate(){
    draw(this.props);
  }
  render() { 

    return ( <div class = "cloud-vis"></div> );
  }
}
 
export default Cloud;