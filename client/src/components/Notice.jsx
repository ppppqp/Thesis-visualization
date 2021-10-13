import React, { Component } from 'react';
import {Dialog} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const noticeInfo = (keywordInfo) =>{
    if(keywordInfo.info.length===0){
        return <div>{`No recorded paper with keyword ${keywordInfo.keyword}. Should appear in other years.`}</div>
    }
    else return (<table>
        <tr>
          <th>Title</th> <th>Mentor</th>
        </tr>
        {keywordInfo.info.map(info=><tr>
          <td>{info.title}</td><td>{info.mentor}</td>
        </tr>)}
      </table>)
}
class Notice extends Component {
    render() { 
        return (<Dialog open={this.props.open} onClose={this.props.handleToClose}>
            <DialogTitle>{"Detailed Info"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Keyword: {this.props.keywordInfo.keyword}
                {noticeInfo(this.props.keywordInfo)}
                {}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleToClose} 
                      color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>);
    }
}
 
export default Notice;