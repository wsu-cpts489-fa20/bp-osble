import React from 'react'
// Code from https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
export default class GradeTableInstructor extends React.Component {

    constructor(props) {
        super(props);
        
    }

   

    getHeader = function () {
        
        let headerRow =[<th>Assignment:</th>];
        for (let i = 0; i < this.props.selectedCourse.assignments.length; i++)
        {
            headerRow.push(<th key={i}>{this.props.selectedCourse.assignments[i].assignment_name }</th>)
        }
        return headerRow;
        

    }

    getRowsData = function () {
        let rows = []
        for( let j = 0; j < this.props.data.length; j++){

        let row = [<th>{this.props.data[j].userid}:</th>];
        for (let i = 0; i < this.props.data[j].grades.length; i++)
        {
            row.push(<th key={i}>{this.props.data[j].grades[i] }</th>)
        }
        rows.push(<tr>{row}</tr>)
    }
        
            return rows;
        

    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>

        );
    }
}


