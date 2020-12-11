import React from "react";

var newgrade = null;
export default class SubmissionModal extends React.Component {
    //style={{position:"absolute",left:"10rem"}}

    state = {
        currentgrades: [],
    }

    getGrades = () => {
        console.log(this.props.assignments, this.props.assignmentid);
    }
    componentDidMount() {

        //this.getGrades();
        for (let i = 0; i < this.props.assignments.length; i += 1) {
            if (this.props.assignments[i]._id === this.props.assignmentid) {
                this.setState({
                    currentgrades: this.props.assignments[i].grades
                }, () => console.log(this.state.currentgrades))
            }
        }
    }

    updateGrade = (userid, date, content, oldgrade) => {
        console.log(userid, date, content, oldgrade,newgrade,this.props.assignmentid, this.props.selectedCourse.course_name);
        const url = '/courses/updategrade/' + this.props.selectedCourse.course_name;
        let body;
        if (newgrade === null) {
            body = { userid: userid, assignmentid: this.props.assignmentid, grade: oldgrade, submit_date: date, submission_content: content };
        } else {
            body = { userid: userid, assignmentid: this.props.assignmentid, grade: newgrade, submit_date: date, submission_content: content };
        }
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(console.log("Grade updated Succesfully"))
            
        newgrade = null;

        this.props.updateEntries();


    }
    createntries = (entry) => {
        return <tr key={this.props.key} style={{ borderBottom: "1px solid #dee2e6" }}>
            <td >{<div style={{ marginTop: ".7rem" }}>{entry.userid}</div>}</td>
            <td >{<div style={{ marginTop: ".7rem" }}>{entry.submit_date === "" ? "N/A" : entry.submit_date}</div>}</td>
            <td >{<div style={{ marginTop: ".7rem" }}>{entry.submission_content}</div>}</td>
            <td>{<input style={{ marginTop: ".7rem" }} defaultValue={entry.grade < 0 ? 0 : entry.grade} onChange={(event) => { newgrade = event.target.value }}  ></input>}</td>
            <td><button className="postitembutton" onClick={() => { this.updateGrade(entry.userid, entry.submit_date, entry.submission_content, entry.grade) }} style={{ width: "4rem" }} >Update</button></td>
        </tr>

    }

    render() {
        var JSONgrades = this.state.currentgrades;
        var JSXgrades = JSONgrades.map(this.createntries)
        return (
            <div className="modal" role="dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <p className="modal-title">Submissions</p>
                        <button className="btn btn-primary" onClick={this.props.showSubmissions}>
                            &times;</button>
                    </div>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>Student ID</th>
                                <th>Date Submitted</th>
                                <th>Content</th>
                                <th>Grade</th>
                                <th style={{ width: "10rem", paddingLeft: "1.5rem" }}>Update Grade</th>
                            </tr>

                        </thead>
                        <tbody>
                            {JSXgrades}

                        </tbody>

                    </table>



                </div>

            </div>

        )
    }
};