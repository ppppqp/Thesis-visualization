import React, { Component } from 'react';
import Map from "../charts/Map/index";
import MapWhole from "../charts/MapWhole/index"
import mentorPosition from "../position_json";
import "./MapBox.css"
// const onChangeMentor = (tar{
//     // this.props.onChangeMentor(target);
//     const {selectedMentor} = this.props;
//     const index = mentorPosition.findIndex((d)=>d.name == selectedMentor[0])
//     const position = mentorPosition[index].position;
//     const init_Ox = position.x+200;
//     const init_Oy = position.y+200;
//     this.setState({Ox: init_Ox, Oy: init_Oy});
// }
class MapBox extends Component {
    state = {
        selected:false,
        Ox: 380,
        Oy: 465,
        Oscale: 0.28,
    }
    componentDidUpdate(prevProps){
        console.log(prevProps);
        const prevMentor = prevProps.selectedMentor[0];
        if(prevMentor != this.props.selectedMentor[0]){
            const selected = this.state.selected;
            const scaleMap = (selected) ? 1 : 0.5;
            const selectedMentor = this.props.selectedMentor;
            const index = mentorPosition.findIndex((d)=>d.name == selectedMentor[0])

            console.log("index", mentorPosition[index].name)
            const position = mentorPosition[index].position;
            let init_Ox, init_Oy;
            init_Ox = (380*2-(position.x*40))/2
            init_Oy = (465*2-(position.y*40))/2
            console.log('relative position', init_Ox, init_Oy)
            console.log('position: ', position.x, position.y)
            this.setState({Ox: init_Ox, Oy: init_Oy});
        }//740 910   380 465
    }

    switch(){
        // const selected = this.state.selected;
        // const scaleMap = (selected) ? 1 : 0.5;
        // const Ox = document.querySelector(".vis-whole-map").querySelector("g").getAttribute("Ox")/scaleMap;
        // const Oy = document.querySelector(".vis-whole-map").querySelector("g").getAttribute("Oy")/scaleMap;
        // console.log('Ox', Ox);
        // const Oscale = document.querySelector(".vis-whole-map").querySelector("g").getAttribute("Oscale");
        // this.setState({selected: !selected, Ox, Oy, Oscale});
        // alert(this.state.selected)
    }

    render() { 
        const{Ox,Oy,Oscale} = this.state;
        const scaleMap = (this.state.selected) ? 1 : 0.5;
        // const scaleMapWhole = (this.state.selected) ? 0.3 ;
        const scaleMapWhole = (this.state.selected) ? 0.5 : 1;
        const width = 720;
        const height =  890;
        // console.log(Ox, Oy);
        if(scaleMap === 1)
        return ( 
        <div>
            {/* <button className = "switchButton btn btn-primary" onClick ={()=>this.switch()}>switch</button> */}
            <div className="row">
                <div className ="col-4 smallBox"><MapWhole scale = {scaleMapWhole} width = {width*scaleMapWhole} height = {height*scaleMapWhole} Ox={Ox} Oy={Oy} Oscale={Oscale} {...this.props}/></div>
                <div className="col-8 bigBox"><Map scale = {scaleMap} width = {width*scaleMap} height = {height*scaleMap} {...this.props} /></div>
            </div>
        </div>
        );
        else return(
            <div>
                {/* <button className = "switchButton btn btn-primary" onClick ={()=>this.switch()}>switch</button> */}
                <div className="row">
                <div className ="col-8 bigBox"><MapWhole scale = {scaleMapWhole} width = {width*scaleMapWhole} height = {height*scaleMapWhole} Ox={Ox} Oy={Oy} Oscale={Oscale} {...this.props}/></div>
                <div className="col-4 smallBox"><Map scale = {scaleMap} width = {width*scaleMap} height = {height*scaleMap} {...this.props}/></div>
                </div>
            </div>
        );
        
    }
}
 
export default MapBox;