import React from 'react';
import { async } from 'regenerator-runtime';
import AppMode from "./../AppMode.js"
class Admin extends React.Component {

    constructor() {
      super();
      this.loadUsers();
      this.state = {users:[],
          showConfirmDelete: false};
    }

    loadUsers = async () =>{
      console.log("Loading all users to admin page...")
        let response = await fetch("/users/");
        response = await response.json();
        const obj = JSON.parse(response);
        var index = 0;
        let users = [];
        for(index; index<obj.length; index++){
            users.push({first_name: obj[index].first_name,
                        last_name: obj[index].last_name,
                        userid: obj[index].userid,
                        email: obj[index].email,
                        is_instructor: obj[index].is_instructor,
                        school: obj[index].school,
                        is_admin: obj[index].is_admin,
                        password: obj[index].password,
                      _id: obj[index]._id})
        }

        this.setState({users: users});
        
    }
  
  
    //confirmDelete -- Triggered when the user clicks the delete button
    //for a given round. The id paam is the unique property that 
    //identifies the round. Set the state variable representing the id
    //of the round to be deleted and then present a dialog box asking
    //the user to confirm the deletion.
    deleteUser = (id) => {
      //this.props.setDeleteId(id);
      //this.setState({showConfirmDelete: true});
    }
    changeRoleCallBack = (userData,id) =>{
        this.updateUser(userData,id);
    
    }

    changeRole = (index) => {
        let userData = {
            userid: this.state.users[index].userid,
            email: this.state.users[index].email,
            password: this.state.users[index].password,
            first_name: this.state.users[index].first_name,
            last_name: this.state.users[index].last_name,
            school: this.state.users[index].school,
            is_instructor: this.state.users[index].is_instructor == true ? false: true,
            is_admin: this.state.users[index].is_admin,
            //  _id: this.state.users[index]._id
          }


        this.changeRoleCallBack(userData,userData.email);
        this.loadUsers();
        
    }

    updateUser = async (newData,id) =>{
       
      const url = '/users/' + id
      const res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: 'PUT',
        body: JSON.stringify(newData)}); 
    if (res.status == 200) { //successful account creation!
       
    } else { //Unsuccessful account update
        //Grab textual error message
       
    }
    }
  
  
    //renderTable -- render an HTML table displaying the rounds logged
    //by the current user and providing buttons to view/edit and delete each round.
    renderTable = () => {
    let table = [];
    for (let r = 0; r < this.state.users.length; ++r) {
      table.push(
        <tr key={r}>
          <td id={"userAdmin"+r}>{this.state.users[r].first_name + " "+this.state.users[r].last_name}</td>
          <td id={"userId"+r}>{this.state.users[r].userid}</td>
          <td>{this.state.users[r].email}</td>
          <td id={"userRole"+r}>{String (this.state.users[r].is_instructor)}&nbsp;
          <button onClick={() => this.changeRole(r)} id={"changeRoleBtn"+r}>
                <span className="fa fa-pencil"></span></button>
                </td>
          <td><button onClick={() => this.deleteUser(r)}>
                <span className="fa fa-trash"></span></button> </td>
        </tr> 
      );
    }
    return table;
    }
  
    //render--render the entire rounds table with header, displaying a "No
    //Rounds Logged" message in case the table is empty.
    render() {
      return(
      <div className="padded-page" id="adminPage">
        <h1></h1>
        <table className="table table-hover">
          <thead className="thead-light">
          <tr>
            <th>NAME</th>
            <th>ID</th>
            <th>EMAIL ADDRESS</th>
            <th>INSTRUCTOR ROLE</th>
            <th>DELETE</th>
          </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.users).length === 0 ? 
            <tr>
            <td colSpan="5" style={{fontStyle: "italic"}}>No users registered</td>
            </tr> : this.renderTable()
            }
          </tbody>
        </table>
      </div>
      );
    }
  }
  
  export default Admin;