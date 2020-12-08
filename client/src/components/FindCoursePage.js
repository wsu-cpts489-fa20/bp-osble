import React from 'react';
import { async } from 'regenerator-runtime';
import Course from './Course.js'
class FindCoursePage extends React.Component {
    loadCourse = async () =>{
        let response = await fetch("/courses/");
        response = await response.json();
        const obj = JSON.parse(response);
        var index = 0;
        let courses = [...this.state.courses];
        for(index; index<obj.length; index++){
            courses.push({coursename: obj[index].course_name, coursenumber: obj[index].prefix + ' '+ obj[index].course_number,
                        semester: obj[index].term, instructor: obj[index].instructor})
        }

        this.setState({courses: courses});
        
    }
    constructor(props) {
        super(props);
        this.loadCourse();
        this.state = {
            courses: []
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