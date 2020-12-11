import React from 'react';
import { async } from 'regenerator-runtime';
import AppMode from '../AppMode';
import '../styles/courseSettings.css';

class CourseSettingsPage extends React.Component {

    updateCourse = async (event) => {
        alert("Course succesfully updated");
        this.props.changeMode(AppMode.FEED);
    }

    cancelReturnHomepage = async (event) => {
        this.props.changeMode(AppMode.FEED);
    }

    render() {
        return (
        <div className="feedpage" id="createSettingsPage">
            <center>
                <div className="courseSettingsWrapper">
                    <center>
                    <h1 >Create Course</h1>
                    </center>
                    <div className="classInfoWrapper">
                        <label className="form-label-prefix">
                            {/* Label for Prefix */}
                            Prefix
                            <input
                            autoComplete="on"
                            className="form-control-form-text enterPrefix"
                            name="Prefix-Number"
                            id="UniqueCoursePrefix"
                            type="text"
                            required={true}
                            ></input>
                        </label>
                        <br/>
                        <label>
                            {/* Label for CourseNumber */}
                            Course Number
                            <input
                            autoComplete="on"
                            className="form-control-form-text enterCourseNumber"
                            name="Course-Number"
                            id="CourseNumber"
                            type="text"
                            required={true}
                            ></input>
                        </label>
                        <br/>
                        <label>
                            {/* Label for CourseName */}
                            Course Name
                            <input
                            autoComplete="on"
                            className="form-control-form-text enterCourseName"
                            name="Course-Name"
                            id="CourseName"
                            type="text"
                            required={true}
                            ></input>
                        </label>
                        <br/>
                        <label>
                            {/* Label for CourseTerm */}
                            Term
                            <input
                            autoComplete="on"
                            className="form-control-form-text enterCourseTerm"
                            name="Course-Term"
                            id="CourseTerm"
                            type="text"
                            required={true}
                            ></input>
                        </label>
                        <br/>
                        <label>
                            {/* Label for CourseYear */}
                            Year
                            <input
                            autoComplete="on"
                            className="form-contorl-form-text .enterCourseYear"
                            name="Course-Year"
                            id="CourseYear"
                            type="text"
                            required={true}
                            ></input>
                        </label>
                    </div>
                    <br/>
                    <div className="classScheduleWrapper">
                            <label>
                                {/* Label for CourseStartDate */}
                                Start Date
                                <input
                                className="form-control"
                                name="Start-Date"
                                id="CourseStartDate"
                                ></input>
                            </label>
                            <label>
                                {/* Label for CourseEndDate */}
                                End Date
                                <input
                                className="form-control"
                                name="End-Date"
                                id="CourseEndDate"
                                ></input>
                            </label>
                        <br/>
                        <label>
                            {/* Label for CourseTimeZone */}
                            Time zone
                            <input
                            name="Course-Time-Zone"
                            id="CourseTimeZone"
                            ></input> 
                        </label>
                        <br/>
                        <label>
                            {/* Label for CourseMeetingTimes */}
                            Meeting Times
                        </label>
                        <br/>
                        <label>
                            {/* Label for CourseBreaksAndHolidays */}
                            Holidays
                            <label>
                                Allow students to reply to threads posted in activity feed
                                <input
                                    name="Allow-Replies-To-Threads"
                                    id="AllowRepliesToThreads"
                                    type="checkbox"
                                ></input>
                            </label>
                        </label>
                    </div>
                    <br/>
                    <div className="additionalCourseSettingsWrapper">
                        <label>
                            {/* Label for CourseSettingCheckBoxes */}
                            Course Settings
                            <label>
                                Allow students to post new threads in activity feed
                                <input
                                    name="Post-New-Threads"
                                    id="PostNewThreads"
                                    type="checkbox"
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Allow students to reply to threads posted in activity feed
                                <input
                                    name="Students-Reply-To-Threads"
                                    id="ReplyToThreads"
                                    type="checkbox"
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Allow students to post events in course calendar
                                <input
                                    name="Students-Post-Events"
                                    id="StudentsPostEvents"
                                    type="checkbox"
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Require an instructor to approve students(s) calendar events before they appear in the course calendar
                                <input
                                    name="Instructor-Approve-Event"
                                    id="InstructorApproveEvent"
                                    type="checkbox"
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Course is inactive(only instrutors/observers can log in)
                                <input
                                    name="Course-Is-Inactive"
                                    id="CourseIsInactive"
                                    type="checkbox" 
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Hide the OSBLE Mail icons for this course
                                <input
                                    name="Hide-Osble-Mail"
                                    id="HideOsbleMail"
                                    type="checkbox"
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Set course as a 'programming' oriented course
                                <input
                                    name="Programming-Oriented"
                                    id="ProgrammingOriented"
                                    type="checkbox"
                                ></input>
                            </label>
                            <br/>
                            <label>
                                Amount of weeks into the future to show events in calendar
                                <input
                                name="Show-Weeks-Into-Future"
                                id="ShowWeeksIntoFuture"
                                type="text"
                                ></input>
                            </label>
                        </label>
                    </div>
                    <br/>
                    <div className="latePolicyWrapper">
                    <label>
                        {/* Label for CourseLatePolicy */}
                        Late Policy
                        <label>
                            Students may submit assignments up to
                            <input
                            className="Late-Assignment-Limit"
                            id="LateAssignmentLimit"
                            ></input>
                        </label>
                        <label>
                            minutes late at no penalty, after which a penalty of
                            <input
                            className="Late-Assignment-Penalty"
                            id="LateAssignmentPenalty"
                            ></input>
                        </label>
                        <label>
                            percent per
                            <input
                            className="Late-Assignment-Penalty-Percentage"
                            id="LateAssignmentPenaltyPecentage"
                            ></input>
                        </label>
                        <label>
                            hour late will be applied. Assignments that submitted more than
                            <input
                            className="Max-Late-Assignment-Limit"
                            id="MaxLateAssignmentLimit"
                            ></input>
                        </label>
                        <label>
                            hours after the due date and time will recive an automatic 0.
                        </label>
                    </label>
                    </div>
                    <br></br>
                    {/* Button for updating course */}
                    <button
                    className="Comfirmation-Update-Course-Btn courseConfirmBtn"
                    role="submit"
                    id="ComfirmUpdateCourseBtn"
                    type="submit"
                    color="#191970"
                    onClick={this.updateCourse}
                    >Update Course</button>
                    
                    {/* Button for canceling changes and returning to homepage */}
                    <button
                    className="Return-To-Homepage-Btn"
                    role="submit"
                    id="ReturnToHomepageBtn"
                    type="submit"
                    color="#191970"
                    onClick={this.cancelReturnHomepage}
                    >Return to Homepage</button>
                </div>
            </center>
        </div>
        );
    }   
}

export default CourseSettingsPage;