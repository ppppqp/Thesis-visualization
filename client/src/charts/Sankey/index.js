import React, { Component } from "react";
import MysteriousSankey from "./vis";
import "./sankey.css";
const helpInfo = (
  <div
    style={{
      "font-size": 15,
      color: "#bbb",
    }}
  >
    No mentor selected. Please select from the middle graph with right click.
  </div>
);
export default class Flow extends Component {
  state = {
    data: null,
    width: 0,
    height: 0,
    highlightIndex: [],
    showIndex: [],
  };
  svgRef = React.createRef();

  componentDidMount() {
    this.measureSVG();
    window.addEventListener("resize", this.measureSVG);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measureSVG);
  }
  changeHighlight = (indexs) => {
    this.setState({ highlightIndex: indexs });
  };
  changeShow = (indexs) => {
    this.setState({ showIndex: indexs });
  };
  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();

    this.setState({
      width,
      height,
    });
  };

  render() {
    const { data, width, height } = this.props;
    return (
      <div className="vis-flow" overflow="scroll">
        {data.nodes.length !== 0 || helpInfo}
        <svg
          width="800"
          height="600"
          ref={this.svgRef}
          style={{ position: "absolute" }}
          transform={"rotate(90) translate(150,120)"}
        >
          <MysteriousSankey
            data={data}
            width={width}
            height={height}
            highlightIndex={this.state.highlightIndex}
            changeHighlight={this.changeHighlight}
            showIndex={this.state.showIndex}
            changeShow={this.changeShow}
          />
        </svg>
      </div>
    );
    // return <div className="vis-flow" overflow="scroll" />;
  }
}
