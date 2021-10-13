import React, { Component } from "react";
import draw from "./vis";

export default class MapWhole extends Component {
  componentDidMount() {
    draw(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);
    draw(this.props);
  }

  render() {
    //draw(this.props);
    return <div className="vis-whole-map" overflow="scroll" />;
  }
}
