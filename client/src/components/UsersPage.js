import React from 'react';
import UsersList from './UsersList.js'
import UserForm from './UserForm.js'
import AppMode from './../AppMode.js';
class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.selectedCourse.students

        }
        this.data = {
            'Instructors': [{ id: 'hermes@wsu.edu', name: "Hermes Obiang" }],
            'TAs': [{ id: 'Joshua@wsu.edu', name: "Joshua Stallworth" }],
            'Students': [{ id: 'sean@wsu.edu', name: "Sean Washington" }, { id: 'Leonard@wsu.edu', name: "Leonard Brkanac" }]


        }
        this.deleteId = "";
        this.deleteRole= "";
        this.editId = "";
        this.editRole ="";
        this.state = { errorMsg: "" };
        this.getUserLists = this.getUserLists.bind(this);
    }

    addUser = async (e) => {
        var course_name = this.props.selectedCourse.course_name;
        var userid = e.sId;
        
        
        
        

        console.log(course_name, userid);
        
        const url = '/courses/' + this.props.selectedCourse.course_name+'/addUser/'+ userid;
        
        let res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT'
            
        });

        console.log(res.status)
        if (res.status === 200) { //successful account creation!
           //this.updateEntries();
           this.props.refreshOnUpdate(AppMode.USERS);
            //this.props.done("New account created! Enter credentials to log in.", false);
            //this.setState({ posts: newposts });
            
        } else { //Unsuccessful account creation
            //Grab textual error message
            const resText = await res.text();
            //this.props.done(resText, false);
        }
        //this.setState({ posts: newposts });
        
    }
    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val, role) => {
        this.deleteId = val;
        this.deleteRole= role;
        this.setState({ errorMsg: "" });
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val,role) => {
        this.editId = val;
        this.editRole= role;
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
        switch (this.props.mode) {
            case AppMode.USERS:
                return (
                    <>
                        {this.state.errorMsg != "" ? <div className="status-msg"><span>{this.state.errorMsg}</span>
                            <button className="modal-close" onClick={this.closeErrorMsg}>
                                <span className="fa fa-times"></span>
                            </button></div> : null}
                        <h1> Roster</h1>


                        <div id="add_update_users" style={{ display: 'block' }}>
                            <h4>
                                Add Single User
                        </h4>
                        <div>
                        <button onClick={ () =>
                        this.props.changeMode(AppMode.USERS_LOGUSER)} > Add User</button>
            </div>
                        </div>

                        
                        <UsersList data={this.state.data}
                            type="Students"
                            setEditId={this.setEditId}
                            setDeleteId={this.setDeleteId}
                            deleteUser={this.deleteUser}
                            changeMode={this.props.changeMode}
                            menuOpen={this.props.menuOpen} />
                    </>
                );
            case AppMode.USERS_LOGUSER:
                return (
                    <UserForm
                        mode={this.props.mode}
                        startData={{}}
                        saveUser={this.addUser}
                        selectedCourse = {this.props.selectedCourse} />
                );
            case AppMode.USERS_EDITUSER:
                let thisUser = this.data[this.editRole][this.editId];
                console.log(thisUser);
                return (
                    <UserForm
                        mode={this.props.mode}
                        startData={thisUser}
                        saveUser={this.editUser} 
                        selectedCourse = {this.props.selectedCourse}/>
                );

                /* return (
                    <UserForm
                        mode={this.props.mode}
                        startData={thisUser}
                        saveUser={this.editUser} />
                ); */
        }
        
    }
}

export default UsersPage;