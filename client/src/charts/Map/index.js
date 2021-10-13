import React, { Component } from "react";
import draw from "./vis";
import Notice from "../../components/Notice";
export default class Map extends Component {
  keywordInfo = { info: [] };
  state = {
    open: false,
  };
  keywordInfo = { info: [] };
  handleClickToOpen = (keywordInfo) => {
    this.keywordInfo = keywordInfo;
    this.setState({ open: true });
  };

  handleToClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    draw({ ...this.props, handleClickToOpen: this.handleClickToOpen });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);
    if (prevProps !== this.props)
      draw({ ...this.props, handleClickToOpen: this.handleClickToOpen });
  }

  render() {
    //draw(this.props);
    return (
      <>
        <div className="vis-map" overflow="scroll" />
        <Notice
          open={this.state.open}
          handleToClose={this.handleToClose}
          keywordInfo={this.keywordInfo}
        />
      </>
    );
  }
}
