import React from 'react';
import { async } from 'regenerator-runtime';
import Course from './Course.js'
class FindCoursePage extends React.Component {
    
    constructor(props) {
        super(props);
        this.loadCourse();
        this.state = {
            courses: []
        };

    }

    loadCourse = async () =>{
        let response = await fetch("/courses/");
        response = await response.json();
        const obj = JSON.parse(response);
        var index = 0;
        let courses = [...this.state.courses];
        for(index; index<obj.length; index++){
            courses.push({coursename: obj[index].course_name, coursenumber: obj[index].prefix + ' '+ obj[index].course_number,
                        semester: obj[index].term, instructor: obj[index].instructor,instructor_id :obj[index].instructor_id})
        }

        this.setState({courses: courses});
        
    }
    createntries = (entry) => {
        return <Course coursename={entry.coursename} coursenumber={entry.coursenumber} semester={entry.semester} instructor={entry.instructor}></Course>
    }

    addStudent = (index) =>{
        if(this.props.userObj.userid != this.state.courses.instructor_id){
            this.updateEnrolledStudents(this.state.courses[index].coursename);
        }

    }
    // getCourse = (id) =>{
    //     let response = await fetch("/courses/"+id);
    //     response = await response.json();
    //     return JSON.parse(response);
    // }

    updateEnrolledStudents = async(id) =>{
        let response = await fetch("/courses/"+id);
        response = await response.json();
        const obj = JSON.parse(response);
        await obj.students.push({userid:this.props.userObj.userid});
        console.log(obj.students);

        const url = '/courses/' + id
      const res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: 'PUT',
        body: JSON.stringify(obj)}); 
        if (res.status == 200) { //successful account creation!
       
        } else { //Unsuccessful account update
            //Grab textual error message
           
        }

    }

    renderTable = () => {
        let table = [];
        for (let r = 0; r < this.state.courses.length; ++r) {
          table.push(
            <tr key={r}>
              <td id={"userAdmin"+r}><button className="postitembutton"  onClick={() =>this.addStudent(r)} >+</button></td>
              <td id={"findCourse-CourseName"+r} style={{ marginTop: ".7rem" }}>{this.state.courses[r].coursename}</td>
              <td id={"findCourse-CourseNumber"+r} style={{ marginTop: ".7rem" }}>{this.state.courses[r].coursenumber}</td>
              <td id={"findCourse-CourseTerm"+r} style={{ marginTop: ".7rem" }}>{this.state.courses[r].semester}</td>
              <td id={"findCourse-CourseInstructor"+r} style={{ marginTop: ".7rem" }}>{this.state.courses[r].instructor}</td>
            </tr> 
          );
        }
        return table;
        }
      
        //render--render the entire rounds table with header, displaying a "No
        //Rounds Logged" message in case the table is empty.
        render() {
          return(
          <div className="padded-page" id="adminPage">
            <h1 style={{ margin: "1.5rem", fontSize: "30px" }}>Search For Courses</h1>
            <table className="table table-hover">
              <thead className="thead-light">
              <tr>
                <th>Join</th>
                <th>Course Name</th>
                <th>Course Number</th>
                <th>Semester</th>
                <th>Instructor</th>
              </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.courses).length === 0 ? 
                <tr>
                <td colSpan="5" style={{fontStyle: "italic"}}>No courses found</td>
                </tr> : this.renderTable()
                }
              </tbody>
            </table>
          </div>
          );
        }

    // render() {
    //     var JSONcourses = this.state.courses;
    //     var JSXcourses = JSONcourses.map(this.createntries)
    //     return (
    //         <div className="feedpage">
    //             <h1 style={{ margin: "1.5rem", fontSize: "30px" }}>Search For Courses</h1>
    //             <table className="table table-hover">
    //                 <thead className="thead-light">
    //                     <tr>
    //                         <th style={{width:"7rem",paddingLeft:"1.5rem"}}>Join</th>
    //                         <th>Course Name</th>
    //                         <th>Course Number</th>
    //                         <th>Semester</th>
    //                         <th>Instructor</th>
    //                     </tr>
                        
    //                 </thead>
    //                 <tbody>
    //                     {JSXcourses}
                        
    //                 </tbody>
                    
    //             </table>
                
    //         </div>
    //     );
    // }
}

export default FindCoursePage;