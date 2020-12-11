import React from 'react';
import GradeTable from './GradeTable'
import GradeTableInstructor from './GradeTableInstructor'

class GradesPage extends React.Component {
    constructor(props) {
        super(props);
        let userGrades = [];
        if (!this.props.userObj.is_instructor) {
            for (let i = 0; i < this.props.selectedCourse.assignments.length; i++) {
                for (let j = 0; j < this.props.selectedCourse.assignments[i].grades.length; j++) {
                    if (this.props.selectedCourse.assignments[i].grades[j].userid === this.props.userObj.userid) {
                        userGrades.push({
                            assignment_name: this.props.selectedCourse.assignments[i].assignment_name,
                            grade: this.props.selectedCourse.assignments[i].grades[j].grade

                        })
                    }
                }
            }
        } else {
            let students = this.props.selectedCourse.students;
            let assignments = this.props.selectedCourse.assignments;

            for (let i = 0; i < students.length; i++) {
                let grade = {};
                grade.userid = students[i];
                grade.grades = [];
                for (let j = 0; j < assignments.length; j++) {
                    for (let k = 0; k < assignments[j].grades.length; k++) {
                        console.log(students[i], assignments[j].grades[k].userid)
                        if (students[i] === assignments[j].grades[k].userid) {
                            grade.grades.push(assignments[j].grades[k].grade)
                        }
                    }
                }
                console.log(grade);
                userGrades.push(grade);
            }
        }

        console.log(userGrades);
        this.state = {
            assignments: this.props.selectedCourse.assignments,
            students: this.props.selectedCourse.students,
            data: userGrades,
            hasGradebook: true,
            isstudent: true

        }
    }
    componentDidMount = async () => {
        // get most recent list of assignments
        
        this.updateData()

    }

    componentDidUpdate = async (prevProps, prevState) => { // updates current assignmentlist
        if (prevProps.selectedCourse.course_name === this.props.selectedCourse.course_name) {
            //do nothing
        } else {

           
            this.updateData()
        }
        
    }
    updateData = async () => {
        let response = await fetch("/courses/" + this.props.selectedCourse.course_name);
        response = await response.json();
        const obj = JSON.parse(response);
        /* this.setState({
            assignments: obj.assignments,
            students: obj.students,
        }, () => console.log(this.state.assignments, obj.assignments)); */
        let userGrades = [];
        if (!this.props.userObj.is_instructor) {

            for (let i = 0; i < obj.assignments.length; i++) {
                for (let j = 0; j < obj.assignments[i].grades.length; j++) {
                    if (obj.assignments[i].grades[j].userid === this.props.userObj.userid) {
                        userGrades.push({
                            assignment_name: obj.assignments[i].assignment_name,
                            grade: obj.assignments[i].grades[j].grade

                        })
                    }
                }
            }
        }
        else {
            let students = obj.students;
            let assignments = obj.assignments;

            for (let i = 0; i < students.length; i++) {
                let grade = {};
                grade.userid = students[i];
                grade.grades = [];
                for (let j = 0; j < assignments.length; j++) {
                    for (let k = 0; k < assignments[j].grades.length; k++) {
                        console.log(students[i], assignments[j].grades[k].userid)
                        if (students[i] === assignments[j].grades[k].userid) {
                            grade.grades.push(assignments[j].grades[k].grade)
                        }
                    }
                }
                console.log(grade);
                userGrades.push(grade);
            }
        }

        this.setState({
            data: userGrades,
            assignments: obj.assignments,
            students: obj.students
        })
    }

    render() {
        return (
            
            <div className="feedpage" id="gradePage">
                <center>
                    <h1>Gradebook for {this.props.selectedCourse.course_name}</h1>

                    {this.props.userObj.is_instructor ?
                        <div>

                            <GradeTableInstructor data={this.state.data} selectedCourse={this.props.selectedCourse}></GradeTableInstructor>
                        </div>
                        :
                        <div>

                            <GradeTable data={this.state.data}></GradeTable>
                        </div>
                    }

                </center>
            </div>
        );
    }
}

export default GradesPage;