import React from "react";

export default class Course extends React.Component {
    //style={{position:"absolute",left:"10rem"}}
    render() {
        return (
            <tr key={this.props.key} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td><button className="postitembutton" >+</button></td>
                <td >{<div style={{ marginTop: ".7rem" }}>{this.props.coursename}</div>}</td>
                <td >{<div style={{ marginTop: ".7rem" }}>{this.props.coursenumber}</div>}</td>
                <td >{<div style={{ marginTop: ".7rem" }}>{this.props.semester}</div>}</td>
                <td>{<div style={{ marginTop: ".7rem" }}>{this.props.instructor}</div>}</td>
            </tr>

        )
    }
};