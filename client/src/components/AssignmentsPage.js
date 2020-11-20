import React from "react";
import '../styles/FeedItem.css';
import Assignment from './Assignment.js'
export default class AssignmentsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assignments: [ // the json object should lbe formatted like this
                { assignment: "Assignment 1", duedate: "11/18/2020 11:59 PM", didsubmit: false, latestactivity: "" },
                { assignment: "Assignment 2", duedate: "11/23/2020 11:59 PM", didsubmit: true, latestactivity: "Submitted 11/18/2020 10:43 PM" }

            ]
        };


    }
    createntries = (entry) => {
        return <Assignment assignment={entry.assignment} duedate={entry.duedate} didsubmit={entry.didsubmit} latestactivity={entry.latestactivity}></Assignment>
    }
    render() {
        var JSONassignments = this.state.assignments;
        var JSXassignments = JSONassignments.map(this.createntries)
        return (
            <div className = "feedpage">
                <h1 style={{ margin: "1.5rem", fontSize: "30px" }}>Assignments</h1>
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ width: "25rem", paddingLeft: "1.5rem" }}>Assignment</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                            <th>Latest Activity</th>
                        </tr>

                    </thead>
                    <tbody>
                        {JSXassignments}

                    </tbody>

                </table>

            </div>

        )
    }
};