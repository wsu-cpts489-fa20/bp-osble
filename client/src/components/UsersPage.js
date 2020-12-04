import React from 'react';
import UsersList from './UsersList'
class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:
            {
                'Instructors': [{ id: 'hermes@wsu.edu', name: "Hermes Obiang" }],
                'TAs': [{ id: 'Joshua@wsu.edu', name: "Joshua Stallworth" }],
                'Students': [{ id: 'sean@wsu.edu', name: "Sean Washington" }, { id: 'Leonard@wsu.edu', name: "Leonard Brkanac" }]


            }

            ,
            courseId: 1

        }
        this.data ={
            'Instructors': [{ id: 'hermes@wsu.edu', name: "Hermes Obiang" }],
            'TAs': [{ id: 'Joshua@wsu.edu', name: "Joshua Stallworth" }],
            'Students': [{ id: 'sean@wsu.edu', name: "Sean Washington" }, { id: 'Leonard@wsu.edu', name: "Leonard Brkanac" }]


        }
        this.deleteId = "";
        this.editId = "";
        this.state = { errorMsg: "" };
        this.getUserLists = this.getUserLists.bind(this);
    }
    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.deleteId = val;
        this.setState({ errorMsg: "" });
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.editId = val;
        this.setState({ errorMsg: "" });
    }

    editUser = async (newData) => {
        /*  const url = '/rounds/' + this.props.userObj.id + '/' + 
             this.props.userObj.rounds[this.editId]._id;
         const res = await fetch(url, {
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 },
             method: 'PUT',
             body: JSON.stringify(newData)}); 
         const msg = await res.text();
         if (res.status != 200) {
             this.setState({errorMsg: msg});
             this.props.changeMode(AppMode.ROUNDS);
         } else {
             this.props.refreshOnUpdate(AppMode.ROUNDS);
         } */
    }
    deleteUser = async () => {
        /* const url = '/rounds/' + this.props.userObj.id + '/' + 
            this.props.userObj.rounds[this.deleteId]._id;
        const res = await fetch(url, {method: 'DELETE'}); 
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: "An error occurred when attempting to delete round from database: " 
            + msg});
            this.props.changeMode(AppMode.ROUNDS);
        } else {
            this.props.refreshOnUpdate(AppMode.ROUNDS);
        }   */
    }


    getUserLists = function () {
        var roles = Object.keys(this.state.data);
        var classData = this.state.data;
        return roles.map((role, index) => {
            return <UsersList data={classData[role]}
                type={role}
                setEditId={this.setEditId}
                setDeleteId={this.setDeleteId}
                deleteRound={this.deleteRound}
                changeMode={this.props.changeMode}
                menuOpen={this.props.menuOpen} />

        })
    }
    render() {
        return (
            <div className="feedpage" id="userPage">
                <center>
                    <h1> Roster</h1>


                    <div id="add_update_users" style={{ display: 'block' }}>
                        <h4>
                            Add Single User
                        </h4>
                        <div>
                            <a href="/Roster/Create">Add By School ID</a>&nbsp;&nbsp;
                <a href="/Roster/CreateByEmail">Add By Email</a>&nbsp;&nbsp;
            </div>
                    </div>
                    <UsersList data={this.data["Instructors"]}
                type="Instructors"
                setEditId={this.setEditId}
                setDeleteId={this.setDeleteId}
                deleteRound={this.deleteRound}
                changeMode={this.props.changeMode}
                menuOpen={this.props.menuOpen} />

                <UsersList data={this.data["TAs"]}
                type="TAs"
                setEditId={this.setEditId}
                setDeleteId={this.setDeleteId}
                deleteRound={this.deleteRound}
                changeMode={this.props.changeMode}
                menuOpen={this.props.menuOpen} />
                <UsersList data={this.data["Students"]}
                type="Students"
                setEditId={this.setEditId}
                setDeleteId={this.setDeleteId}
                deleteRound={this.deleteRound}
                changeMode={this.props.changeMode}
                menuOpen={this.props.menuOpen} />

                </center>
            </div>
        );
    }
}

export default UsersPage;