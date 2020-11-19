import React from 'react';


class CoursesSettingsPage extends React.Component {

    render() {
        return (
        <div className="padded-page">
            <center>
            <h1 >Courses</h1>
            <h2>This page is under construction.</h2>
            <img src="https://dl.dropboxusercontent.com/s/qpjhy9x9gwdxpob/SpeedScoreLogo64Trans.png" 
             height="200" width="200"/>
            <p style={{fontStyle: "italic"}}>Version CptS 489 React Demo</p>
            </center>
            <label>
                {/* Label for Prefix */}
                
            </label>
            <br/>
            <label>
                {/* Label for CourseNumber */}
            </label>
            <br/>
            <label>
                {/* Label for CourseName */}
            </label>
            <br/>
            <label>
                {/* Label for CourseTerm */}
            </label>
            <br/>
            <label>
                {/* Label for CourseYear */}
            </label>
            <label>
                {/* Label for CourseStartDate */}
            </label>
            <br/>
            <label>
                {/* Label for CourseEndDate */}
            </label>
            <br/>
            <label>
                {/* Label for CourseTimeZone */}
            </label>
            <br/>
            <label>
                {/* Label for CourseMeetingTimes */}
            </label>
            <br/>
            <label>
                {/* Label for CourseBreaksAndHolidays */}
            </label>
            <label>
                {/* Label for CourseSettingCheckBoxes */}
            </label>
            <br/>
            <label>
                {/* Label for CourseLatePolicy */}
            </label>
            <br></br>
        </div>
        );
    }   
}

export default CoursesSettingsPage;