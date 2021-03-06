import React from 'react'

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showConfirmDelete: false };
        
    }
    editUser = (id) => {
        this.props.setEditId(id);
        //this.props.changeMode(AppMode.ROUNDS_EDITROUND);
    }


    deleteUser = () => {
        this.props.deleteUser();
        this.setState({ showConfirmDelete: false });
    }


    //confirmDelete -- Triggered when the user clicks the delete button
    //for a given round. The id paam is the unique property that 
    //identifies the round. Set the state variable representing the id
    //of the round to be deleted and then present a dialog box asking
    //the user to confirm the deletion.
    confirmDelete = (id) => {
        this.props.setDeleteId(id);
        this.setState({ showConfirmDelete: true });
    }
    renderTable = () => {
        let table = [];
        if (!this.props.data)
        {
            return table
        }
        for (let r = 0; r < this.props.data.length; ++r) {
            table.push(
                <tr key={r}>
                    
                    <td>{this.props.data[r].userid}</td>
                    <td>{this.props.data[r].first_name+ " " + this.props.data[r].last_name}</td>
                    <td>{this.props.data[r].email}</td>
                    
                    <td><button onClick={this.props.menuOpen ? null :
                        () => this.confirmDelete(r)}>
                        <span className="fa fa-trash"></span></button></td>
                </tr>
            );
        }
        return table;
    }

    render() {
        return (
            <div >
                <h2>{this.props.type}</h2>
                <table className="table table-hover">
                    <thead className="thead-light"><tr>
                        <th>ID </th>
                        <th>Name </th>
                        <th>Email</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderTable()}</tbody>

                </table>
            </div>

        );
    }

}

