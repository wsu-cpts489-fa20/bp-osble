import React from 'react'
// Code from https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
export default class GradeTable extends React.Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function () {
        return Object.keys(this.props.data[0]);
    }

    getHeader = function () {
        var keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })

    }

    getRowsData = function () {
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
        })

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

const RenderRow = (props) => {

    return props.keys.map((key, index) => {
        return <td key={props.data[key]}>{props.data[key]}</td>
    })

}
