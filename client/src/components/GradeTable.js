import React from 'react'
// Code from https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
export default class GradeTable extends React.Component {

    constructor(props) {
        super(props);
        
    }

    getKeys = function () {
        return Object.keys(this.props.data[0]);
    }

    getHeader = function () {
        
        let headerRow =[<th>Assignment:</th>, <th>Grade:</th>];
       /*  for (let i = 0; i < this.props.data.length; i++)
        {
            headerRow.push(<td key={i}>{this.props.data[i].assignment_name }</td>)
        } */
        return headerRow;
        

    }

    getRowsData = function () {
        let row = []
        for (let i = 0; i < this.props.data.length; i++)
        {
        row.push([<td key={i}>{this.props.data[i].assignment_name }</td>,<td key={i}>{this.props.data[i].grade }</td>])
        }
        
            return <tr>{row}</tr>
        

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


