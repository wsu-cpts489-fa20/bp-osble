import React from 'react';
import { async } from 'regenerator-runtime';
import AppMode from '../AppMode';
class UserSettingsPage extends React.Component {
    constructor(props){
        super(props);
        // this.origAccountInfo = null;
        // this.fnameRef = React.createRef();
        // this.lnameRef = React.createRef();
        // this.emailRef = React.createRef();
        // this.confirm_emailRef = React.createRef();
        // this.IDRef = React.createRef();
        // this.confirmIDRef = React.createRef();
        // this.passwordRef = React.createRef();
        // this.confirm_passwordRef = React.createRef();
        // this.newPasswordRef = React.createRef();
        // this.confirm_newPasswordRef = React.createRef();
        // this.profilePicRef = React.createRef();

        this.state = {
            email: "",
            confirm_email: "",
            password: "",
            confirm_password: "",
            first_name: "",
            last_name: "",
            id: 0,
            confirm_id: 0,
        };
    }

    async componentDidMount(){
        if(!this.props.create){
            const url = '/users/' + this.state.id; 
            const res = await fetch(url);
            const json = await res.json();
            const userData = JSON.parse(json);
            this.origAccountInfo = userData; //This determines whether update can occur
            this.origAccountInfo.passwordRepeat = userData.password;
            this.setState({
                           email: userData.email,
                           first_name: userData.first_name,
                           last_name: userData.last_name,
                           //profilePicURL: userData.profilePicURL,
                           password: userData.password,
                           passwordRepeat: userData.password,
                           securityQuestion: userData.securityQuestion,
                           securityAnswer: userData.securityAnswer});
        }
    }

    checkDataValidity = ()=>{
        //
    }

    handleChange=(event)=>{
        const formUpdated = (this.origAccountInfo == null ? true : this.formIsUpdated(event.target.name,event.target.value));
        const self = this;
        this.setState({[event.target.name]: event.target.value,
            formUpdated: formUpdated},this.checkDataValidity);
    }

    formIsUpdated = (updateField,updateVal) => {
        if (this.origAccountInfo[updateField] != updateVal) {return true;}
        if (updateField != "email" &&
            this.state.email !== this.origAccountInfo.email)
            {return true;}
        if (updateField != "first_name" && 
             this.state.first_name != this.origAccountInfo.first_name) 
             {return true;}
        if (updateField != "last_name" && 
             this.state.last_name != this.origAccountInfo.last_name) 
             {return true;}
        if (updateField != "password" &&
            this.state.password !== this.origAccountInfo.password)
            {return true;}
        if (updateField != "passwordRepeat" &&
            this.state.passwordRepeat !== this.origAccountInfo.passwordRepeat)
            {return true;}
        if (updateField != "securityQuestion" &&
            this.state.securityQuestion !== this.origAccountInfo.securityQuestion)
            {return true;}
        if (updateField != "securityAnswer" &&
            this.state.securityAnswer !== this.origAccountInfo.securityAnswer)
            {return true;}
        return false;
    }

    handleSubmit = async(event) =>{
        let userData = {
            userid: this.state.id,
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
        }
        const url = '/users/' + this.state.accountName;
        let res;
        res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(userData)}); 
        if (res.status == 201) { //successful account creation!
            //this.props.done("User Account Updated!",false);
            this.props.changeMode(AppMode.PROFILE);
        } else { //Unsuccessful account update
            //Grab textual error message
            const resText = await res.text();
            //this.props.done(resText,false);
        }
    }

    // handleSubmit =() =>{
    //     this.props.changeMode(AppMode.PROFILE);
    // }

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
                    value={this.state.first_name}
                    onChange={this.handleChange}
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
                    value={this.state.last_name}
                    onChange={this.handleChange}
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
                    value={this.state.email}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    />
                </label>
                <p></p>
                <button className="profileSubmitButton" onClick={this.handleSubmit}>Change Email</button>
                <br/>

                <h2 className="setting-header">Change Student/Faculty ID<span className="fa fa-question-circle"></span></h2>
                <label>
                    Student/Faculty ID:
                    <input
                    className="form-control form-text form-center"
                    name="schoolID"
                    size="30"
                    placeholder="Enter Student/Faculty ID"
                    type="number"
                    value={this.state.userid}
                    onChange={this.handleChange}
                    />
                </label>
                <br/>
                <label>
                    Repeat Student/Faculty ID:
                    <input
                    className="form-control form-text form-center"
                    name="schoolID"
                    size="30"
                    placeholder="Verify Student/Faculty ID"
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
                    value={this.state.password}
                    onChange={this.handleChange}
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
                    value={this.state.passwordRepeat}
                    onChange={this.handleChange}
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