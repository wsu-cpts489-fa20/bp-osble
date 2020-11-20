import React from 'react';
import UsersList from './UsersList'
class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:
            {
                'Instructors': { 1: "Hermes", 2: "Jacob" },
                'TAs': { 3: "Joe", 4: "Kyle" },
                'Students': { 5: "Sean", 6: "John" }


            }

            ,
            courseId: 1

        }
        this.getUserLists = this.getUserLists.bind(this);
    }

    getUserLists = function () {
        var roles = Object.keys(this.state.data);
        var classData = this.state.data;
        return roles.map((role, index) => {
            return <UsersList data={classData[role]} type={role} />
        })
    }
    render() {
        return (
            <div className="feedpage">
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
                    {this.getUserLists()}

                </center>
            </div>
        );
    }
}

export default UsersPage;