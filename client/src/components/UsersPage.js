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
    addUser = async (e) => {
        var course_name = this.props.selectedCourse.course_name;
        userid = this._inputElement.value
        var newpost = {
            userid: this.props.userObj.userid, 
            createdby: this.props.userObj.first_name + " " + this.props.userObj.last_name,
            post_content: this._inputElement.value,
            key: Date.now(),
            replies: []
        } 
        this._inputElement.value = "";

        console.log(course_name, userid);
        e.preventDefault();
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
           //this.props.refreshOnUpdate(AppMode.FEED);
            //this.props.done("New account created! Enter credentials to log in.", false);
            //this.setState({ posts: newposts });
            
        } else { //Unsuccessful account creation
            //Grab textual error message
            const resText = await res.text();
            //this.props.done(resText, false);
        }
        //this.setState({ posts: newposts });
        
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
                        <button onClick={this.props.menuOpen ? null : () =>
                        this.editUser(r)} > Add User</button>
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