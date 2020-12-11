import React from 'react';
import GradeTable from './GradeTable'

class GradesPage extends React.Component {
    constructor(props) {
        super(props);
        let userGrades = [];
        for(let i = 0; i < this.props.selectedCourse.assignments.length; i++)
        {
            for ( let j = 0 ; j < this.props.selectedCourse.assignments[i].grades.length; j++)
            {
                if (this.props.selectedCourse.assignments[i].grades[j].userid === this.props.userObj.userid)
                {
                    userGrades.push({
                        assignment_name: this.props.selectedCourse.assignments[i].assignment_name,
                        grade: this.props.selectedCourse.assignments[i].grades[j].grade

                    })
                }
            }
        }
        console.log(userGrades);
        this.state = {
            data : userGrades,
            hasGradebook : true,
            isstudent: true

        }
    }
    render() {
        return (
            <div className="feedpage" id="gradePage">
                <center>
        <h1>Gradebook for {this.props.selectedCourse.course_name}</h1>
                    <button id="gbOptions" class="btn btn-primary" data-toggle="modal" data-target="#gbOptionsModal">Gradebook Options</button>
                    {this.props.userObj.is_instructor ?
                    <div>
                        
                        <GradeTable data = {this.state.data}></GradeTable>
                    </div>
                    :
                    <div>
                        
                        <GradeTable data = {this.state.data}></GradeTable>
                    </div>
                }
                
                </center>
            </div>
        );
    }
}

export default GradesPage;