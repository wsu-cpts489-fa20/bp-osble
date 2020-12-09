import React from "react";

export default class Assignment extends React.Component {
    //style={{position:"absolute",left:"10rem"}}
    state = {
        assignmentid: this.props.assignmentid
    }
    render() {
        return (
            <tr key={this.props.key} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td >{<div style={{ marginTop: "1rem",marginLeft:".8rem" }}>{this.props.assignment}</div>}</td>
                <td >{<div style={{ marginTop: "1rem" }}>{this.props.duedate}</div>}</td>
                <td >{<div style={{ marginTop: ".35rem" }}>{this.props.didsubmit ? <button onClick={() => { this.props.showModal(this.state.assignmentid) }} style={{width:"5rem",marginLeft:"0px"}} className="postitembutton" >Resubmit</button>:<button style={{width:"5rem",marginLeft:"0px"}} className="postitembutton" onClick={() => { this.props.showModal(this.state.assignmentid) }}>Submit</button>}</div>}</td>
                <td>{<div style={{ marginTop: "1rem" }}>{this.props.latestactivity}</div>}</td>
            </tr>

        )
    }
};