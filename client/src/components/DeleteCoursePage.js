import React from 'react';
import { async } from 'regenerator-runtime';
import AppMode from '../AppMode.js';

class DeleteCoursePage extends React.Component {


    deleteCourse = async (event) => {
        alert("Course succesfully deleted");
        this.props.changeMode(AppMode.FEED);
    }

    cancelDeleteCourse = async (event) => {
        this.props.changeMode(AppMode.FEED);
    }

    render() {
        return (
        <div className="feedpage">
            <center>
            <h1 >Delete Course</h1>
            <h2>You are about to delete the course titled "Class Input Here". Deleting a course is permanent and cannot be undone. Any assignments, submissions, grades, and event data associated with this course will also be removed from the system. If you would like to continue, please click the "Continue" button below.</h2>
            </center>
            <center>
            <label className="form-deletion-comfirmation-label">
                {/* Label for ComfirmDeleteCourseBtn */}
                <button
                className="Comfirmation-Deletion-Btn"
                role="submit"
                id="ComfirmDeletionOfCourseBtn"
                type="submit"
                color="#191970"
                onClick={this.deleteCourse}
                >Delete</button>
            </label>
            <label>
                {/* Label for CancelDeleteCourseBtn */}
                <button
                className="Cancel-Deletion-Btn"
                role="submit"
                id="CancelDeletionOfCourseBtn"
                type="submit"
                color="#191970"
                onClick={this.cancelDeleteCourse}
                >Cancel</button>
            </label>
            </center>
        </div>
        );
    }   
}

function deleteCourse() {
    alert("Course successfully deleted");    
    this.props.changeMode(AppMode.FEED);
}

export default DeleteCoursePage;