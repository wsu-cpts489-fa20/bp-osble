import React from "react";
import '../styles/FeedItem.css';
import Assignment from './Assignment.js'
import AssignmentProf from './AssignmentProf.js'
import SubmissionModal from './SubmissionModal.js'
export default class AssignmentsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assignments: [],
            createAssignment: false,
            showModal: false,
            showSubmissions: false,
            curassignmentid: "",
        };
        // old assignment format assignment: "Assignment 1", duedate: "11/18/2020 11:59 PM", didsubmit: false, latestactivity: ""


    }

    updateGrade = async (e) => {
        this.setState({
            showModal: false
        })
        var submission_content = e.target[0].value;
        e.preventDefault();
        const url = '/courses/updategrade/' + this.props.selectedCourse.course_name;
        let body = { userid: this.props.userObj.userid, assignmentid: this.state.curassignmentid, grade: -1, submit_date: '12/7/2020', submission_content: submission_content };
        let res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        });
        if (res.status == 200) { //successful account creation!
            console.log("GRADE UPDATED");
            //this.props.done("New account created! Enter credentials to log in.", false);
        } else { //Unsuccessful account creation
            //Grab textual error message
            const resText = await res.text();
            //this.props.done(resText, false);
        }


    }
    showModal = (assignmentid) => {

        this.setState({
            curassignmentid: assignmentid
        }, () => this.setState(prevstate => ({ showModal: !prevstate.showModal })))



    }
    showSubmissions = (assignmentid) => {

        this.setState({
            curassignmentid: assignmentid
        })

        this.setState(prevstate => ({ showSubmissions: !prevstate.showSubmissions }))
    }

    /*
    const assignmentSchema = new Schema({
        assignment_name: String,
        assignment_content: String,
        instructor: String,
        due_date: Number,
        grades: [gradeSchema] // each student will be:
      
      });
      */
    createAssignment = async (e) => {
        var curClass = this.props.selectedCourse.course_name // name of currently selected class
        var newGrades = []
        var assignmentName = e.target[0].value;
        var assignmentText = e.target[2].value;
        var assignmentDue = e.target[1].value;
        e.preventDefault();
        let response = await fetch("/courses/" + curClass);
        response = await response.json();
        const obj = JSON.parse(response);
        var studentarray = obj.students;
        for (const student in studentarray) {
            newGrades.push({
                userid: studentarray[student],
                grade: -2, // -2 means didnt submit, -1 means did submit, anything >=0 is a grade
                submission_content: "", // this is where we will store submissions
                submit_date: ""
            })
        }
        let assignmentData = {
            assignment_name: assignmentName,
            assignment_content: assignmentText,
            instructor_id: this.props.userObj.userid,
            due_date: assignmentDue,
            grades: newGrades
        }
        const url = '/assignments/' + curClass; // should be 
        let res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(assignmentData)
        });
        if (res.status == 200) { //successful account creation!
            this.updateEntries();
            //this.props.done("New account created! Enter credentials to log in.", false);
        } else { //Unsuccessful account creation
            //Grab textual error message
            const resText = await res.text();
        }



    }
    updateEntries = async () => {
        let response = await fetch("/courses/" + this.props.selectedCourse.course_name);
        response = await response.json();
        const obj = JSON.parse(response);
        this.setState({
            assignments: obj.assignments
        });
    }
    createntries = (entry) => {
        if (this.props.userObj.is_instructor === true) {
            return <AssignmentProf showSubmissions={this.showSubmissions} assignmentid={entry._id} assignment={entry.assignment_name} duedate={entry.due_date} didsubmit={false} latestactivity={""}></AssignmentProf>
        } else {// will need to retrieve the grade object corresponding to assignment and student in the current class for didsubmit and latestactivity
            return <Assignment showModal={this.showModal} assignmentid={entry._id} assignment={entry.assignment_name} duedate={entry.due_date} didsubmit={false} latestactivity={""}></Assignment>
        }

    }
    toggleCreate = (e) => {
        this.setState(prevstate => ({ createAssignment: !prevstate.createAssignment }))
    }
    getAssignments = async () => {
        if(this.props.selectedCourse != null){
            let response = await fetch("/courses/" + this.props.selectedCourse.course_name);
            response = await response.json();
            const obj = JSON.parse(response);
            this.setState({assignments: obj.assignments});
        }
        
        //return [{ assignment: "Assignment 1", duedate: "11/18/2020 11:59 PM", didsubmit: false, latestactivity: "" },
        //{ assignment: "Assignment 2", duedate: "11/23/2020 11:59 PM", didsubmit: true, latestactivity: "Submitted 11/18/2020 10:43 PM" }]
    }
    componentDidMount = async () => {
        // get most recent list of assignments
        if(this.props.selectedCourse != null){
        let response = await fetch("/courses/" + this.props.selectedCourse.course_name);
        response = await response.json();
        const obj = JSON.parse(response);
        this.setState({assignments: obj.assignments}, () => console.log(this.state.assignments, obj.assignments));
        }

    }

    componentDidUpdate = async (prevProps, prevState) => { // updates current assignmentlist
        if (prevProps.selectedCourse.course_name === this.props.selectedCourse.course_name) {
            //do nothing
        } else {

            this.setState({
                assignments: this.props.selectedCourse.assignments
            })
        }
    }

    render() {
        //this.getAssignments();
        var JSONassignments = this.state.assignments;
        var JSXassignments = JSONassignments.map(this.createntries)
        return (
            <div className="feedpage" id="assignmentPage">
                <h1 style={{ margin: "1.5rem", fontSize: "30px" }}>Assignments</h1>
                {
                    this.state.showModal ?
                        <div className="modal" role="dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <p className="modal-title">Create Submission</p>
                                    <button className="btn btn-primary" onClick={this.showModal}>
                                        &times;</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.updateGrade}>
                                        <textarea style={{ width: "90%", height: "500px" }}></textarea>
                                        <div className="modal-footer">

                                            <button type="submit" className="btn btn-primary" >
                                                Submit</button>

                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                        :
                        null
                }
                {
                    this.state.showSubmissions ?
                        <SubmissionModal updateEntries={this.updateEntries} selectedCourse={this.props.selectedCourse} assignments={this.state.assignments} assignmentid={this.state.curassignmentid} showSubmissions={this.showSubmissions}></SubmissionModal>
                        :
                        null
                }

                {this.props.userObj.is_instructor ?
                    <div>
                        <button onClick={this.toggleCreate}>Create Assignment</button>
                        {this.state.createAssignment ?
                            <div>
                                <form onSubmit={this.createAssignment}>
                                    <input type="text" name="assignmentName" required={true} placeholder="Assignment Name" />
                                    <input type="text" required={true} placeholder="Due: mm/dd/yyyy" />
                                    <textarea name="assignmentText" type="text" required={true} placeholder="Enter Assignment Details here..."></textarea>
                                    <button type="submit" className="btn btn-primary" >Create</button>
                                </form>
                            </div>
                            :
                            null
                        }
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{ width: "25rem", paddingLeft: "1.5rem" }}>Assignment</th>
                                    <th>Due Date</th>
                                    <th>View Submissions</th>
                                </tr>

                            </thead>
                            <tbody>
                                {JSXassignments}

                            </tbody>

                        </table>
                    </div>
                    :
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
                }


            </div>

        )
    }
};