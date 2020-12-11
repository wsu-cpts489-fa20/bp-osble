import React from "react";

export default class AssignmentProf extends React.Component {
    //style={{position:"absolute",left:"10rem"}}
    state = {
        assignmentid: this.props.assignmentid
    }
    render() {
        return (
            <tr key={this.props.key} style={{ borderBottom: "1px solid #dee2e6" }}>
                
                <td >{<div style={{ marginTop: "1rem",marginLeft:".8rem" }}>{this.props.assignment}</div>}</td>
                <td >{<div style={{ marginTop: "1rem" }}>{this.props.duedate}</div>}</td>
                <td >{<div style={{ marginTop: ".35rem" }}><button style={{width:"5rem",marginLeft:"0px"}} onClick={() => this.props.showSubmissions(this.state.assignmentid)} className="postitembutton" >View</button></div>}</td>
            </tr>

        )
    }
};