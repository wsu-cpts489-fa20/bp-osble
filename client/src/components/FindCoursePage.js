import React from 'react';
import Course from './Course.js'
class FindCoursePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [ // the json object should lbe formatted like this
                { coursename: "Introduction to Parallel Computing", coursenumber: "CPTS 411", semester: "Fall 2020", instructor: "Ananth Kalyanaraman" },
                { coursename: "Web Development", coursenumber: "CPTS 489", semester: "Fall 2020", instructor: "Chris Handhousen" },
                { coursename: "Introduction to Data Mining", coursenumber: "CPTS 315", semester: "Fall 2020", instructor: "Ananth Jillepalli" },
            ]
        };


    }
    createntries = (entry) => {
        return <Course coursename={entry.coursename} coursenumber={entry.coursenumber} semester={entry.semester} instructor={entry.instructor}></Course>
    }
    render() {
        var JSONcourses = this.state.courses;
        var JSXcourses = JSONcourses.map(this.createntries)
        return (
            <div className="feedpage">
                <h1 style={{ margin: "1.5rem", fontSize: "30px" }}>Search For Courses</h1>
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th style={{width:"7rem",paddingLeft:"1.5rem"}}>Join</th>
                            <th>Course Name</th>
                            <th>Course Number</th>
                            <th>Semester</th>
                            <th>Instructor</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {JSXcourses}
                        
                    </tbody>
                    
                </table>
                
            </div>
        );
    }
}

export default FindCoursePage;