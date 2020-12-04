import React from 'react'
// Code from https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
export default class GradeTable extends React.Component {

    constructor(props) {
        super(props);

        this.getRowsData = this.getRowsData.bind(this);

    }

    getRowsData = function () {
        var items = this.props.data;
        return items.map((row, index) => {
            return <RenderRow key={index} data={row} />
        })

    }
    renderTable = () => {
        let table = [];
        for (let r = 0; r < this.props.data.length; ++r) {
            table.push(
                <tr key={r}>
                    <td>{this.props.data[r].date.substring(0, 10)}</td>
                    <td>{this.props.data[r].senderId}</td>
                    <td>{this.props.data[r].subject}</td>


                </tr>
            );
        }
        return table;
    }

    render() {
        return (
            <div className="padded-page">
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th class="inbox_time_header">Date:</th>
                            <th class="inbox_from_header">From:</th>
                            <th class="inbox_subject_header">Subject:</th>
                        </tr>

                    </thead>
                    <tbody>
                        {Object.keys(this.props.data).length === 0 ?
                            <tr>
                                <td colSpan="5" style={{ fontStyle: "italic" }}>Inbox Empty</td>
                            </tr> : this.renderTable()
                        }
                    </tbody>
                </table>
            </div>

        );
    }
}

const RenderRow = (props) => {


    return <tr key={props.key}>
        <td>{props.data.date}</td>
        <td>{props.data.senderId}</td>
        <td>{props.data.subject}</td>
    </tr>

}
