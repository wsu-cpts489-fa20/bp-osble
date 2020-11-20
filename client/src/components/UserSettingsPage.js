import React from 'react';
import AppMode from '../AppMode';
class UserSettingsPage extends React.Component {
    handleSubmit =() =>{
        this.props.changeMode(AppMode.PROFILE);
    }
    render() {
        return (
        <div id='settingPage' className="feedpage">
            <center>
            <h2 className="setting-header">User Settings<span className="fa fa-question-circle"></span></h2>
            </center>
            <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input
                    className="form-control form-text form-center"
                    name="firstName"
                    size="30"
                    placeholder="First Name"
                    type="text"
//                    onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label>
                    Last Name:
                    <input
                    className="form-control form-text form-center"
                    name="lastName"
                    size="30"
                    placeholder="Last Name"
                    type="text"
//                    onChange={this.handleChange}
                    />
                </label>
                <p></p>
                <button className="profileSubmitButton" onClick={this.handleSubmit}>Change Name</button>
                <br/>

                <h2 className="setting-header">Reset Email<span className="fa fa-question-circle"></span></h2>
                <label>
                    Email:
                    <input
                    className="form-control form-text form-center"
                    name="firstName"
                    size="30"
                    placeholder="Enter New Email"
                    type="email"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
//                    onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label>
                    Repeat Email:
                    <input
                    className="form-control form-text form-center"
                    name="email"
                    size="30"
                    placeholder="Verify New Email"
                    type="email"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
//                    onChange={this.handleChange}
                    />
                </label>
                <p></p>
                <button className="profileSubmitButton" onClick={this.handleSubmit}>Change Email</button>
                <br/>

                <h2 className="setting-header">Change School ID<span className="fa fa-question-circle"></span></h2>
                <label>
                    School ID:
                    <input
                    className="form-control form-text form-center"
                    name="schoolID"
                    size="30"
                    placeholder="Enter School ID"
                    type="number"
//                    onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label>
                    Repeat School ID:
                    <input
                    className="form-control form-text form-center"
                    name="schoolID"
                    size="30"
                    placeholder="Verify School ID"
                    type="number"
//                    onChange={this.handleChange}
                    />
                </label>
                <p></p>
                <button className="profileSubmitButton" onClick={this.handleSubmit}>Change ID</button>
                <br/>
            
                <h2 className="setting-header">Reset Password<span className="fa fa-question-circle"></span></h2>
                <label>
                    Current Password:
                    <input
                    className="form-control form-text form-center"
                    name="password"
                    size="30"
                    placeholder="Enter Current Password"
                    type="password"
                    pattern=
                     "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    />
                </label>
                <br/>
                <label>
                    New Password:
                    <input
                    className="form-control form-text form-center"
                    name="password"
                    size="30"
                    placeholder="Enter New Password"
                    type="password"
                    pattern=
                     "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
//                    onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label>
                    Repeat New Password:
                    <input
                    className="form-control form-text form-center"
                    name="password"
                    size="30"
                    placeholder="Verify New Password"
                    type="password"
                    pattern=
                     "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
//                    onChange={this.handleChange}
                    />
                </label>
                <p></p>
                <button className="profileSubmitButton" onClick={this.handleSubmit}>Change Password</button>
                <br/>
                
                <h2 className="setting-header">Change Profile Picture<span className="fa fa-question-circle"></span></h2>
                <label>
                    <p></p>
                    Current Profile Picture:
                    <img src="osble2.png" height="60" width="60"/>
                    <input
                     className="form-control form-text form-center"
                     name="profilePic"
                     type="file"
                     accept="image/x-png,image/gif,image/jpeg" 
//                     ref={this.profilePicRef}
//                     value={this.state.profilePic}
//                     onChange={this.handleChange}
                     />
                </label>
                <p></p>
                <button className="profileSubmitButton" onClick={this.handleSubmit}>Change Picture</button>
            </form>
            </div>
        </div>
        );
    }   
}

export default UserSettingsPage;