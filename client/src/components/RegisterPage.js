import React from 'react';
import AppMode from "./../AppMode.js"

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.confirm_emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirm_passwordRef = React.createRef();
        this.fnameRef = React.createRef();
        this.confirm_fnameRef = React.createRef();
        this.lnameRef = React.createRef();
        this.confirm_lnameRef = React.createRef();
        this.IDRef = React.createRef();
        this.confirmIDRef = React.createRef();

        this.state = {
            email: "",
            confirm_email: "",
            password: "",
            confirm_password: "",
            first_name: "",
            last_name: "",
            confirm_last_name: "",
            confirm_first_name: "",
            school: "Washington State University",
            id: 0,
            confirm_id: 0,
            validated: true,
        };
    }

    createAccount = async (event) => {
        let userData = {
            userid: this.state.id,
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            school: this.state.school,
            is_instructor: false,
            is_admin: this.state.id == 101 ||this.state.id == 102 || this.state.id == 103 ? true : false,
        }
        const url = '/users/' + this.state.id; 
        let res;
        res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(userData)
        });
        console.log(res.status);
        if (res.status == 201) { //successful account creation!
            this.props.changeMode(AppMode.LOGIN);
            //this.props.done("New account created! Enter credentials to log in.", false);
        } else { //Unsuccessful account creation
            //Grab textual error message
            const resText = await res.text();
            //this.props.done(resText, false);
        }

        //this.props.changeMode(AppMode.LOGIN);
    }
    
    handleRegister = (event) => {
        event.preventDefault();
        if (this.state.email == this.state.confirm_email &&
            this.state.password == this.state.confirm_password &&
            this.state.first_name == this.state.confirm_first_name &&
            this.state.last_name == this.state.confirm_last_name &&
            this.state.id == this.state.confirm_id) {
            this.createAccount();
        }

    }

    handleOnChange = (event) => {
        if (event.target.name == "email") {
            this.setState({ email: event.target.value });
        }

        else if (event.target.name == "confirm_email") {
            this.setState({ confirm_email: event.target.value });
        }
        else if (event.target.name == "password") {
            this.setState({ password: event.target.value });
        }
        else if (event.target.name == "confirm_password") {
            this.setState({ confirm_password: event.target.value });
        }
        else if (event.target.name == "first_name") {
            this.setState({ first_name: event.target.value });
        }
        else if (event.target.name == "last_name") {
            this.setState({ last_name: event.target.value });
        }
        else if (event.target.name == "confirm_last_name") {
            this.setState({ confirm_last_name: event.target.value });
        }
        else if (event.target.name == "confirm_first_name") {
            this.setState({ confirm_first_name: event.target.value });
        }
        else if (event.target.name == "school") {
            this.setState({ school: event.target.value });
        }
        else if (event.target.name == "id") {
            this.setState({ id: event.target.value });
        }
        else if (event.target.name == "confirm_id") {
            this.setState({ confirm_id: event.target.value });
        }

    }

    render() {
        return (
            <div className="osblepage">
                <center>
                    <img src="https://i.imgur.com/lBOwYfO.png" style={{ position: "relative", right: ".7rem" }}></img>
                    <p className="paragraph" style={{ color: 'white', fontWeight: 'bold' }}>
                        Create a New Account &nbsp; <span className="fa fa-question-circle"></span></p>
                    <p className="paragraph" style={{ color: 'white', fontWeight: 'bold' }}>Login Information</p>

                    <div className="modal-body">
                        <form onSubmit={this.handleRegister}>
                            <label className="form-label">
                                Email address
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="email"
                                    type="email"
                                    size="35"
                                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                    required={true}
                                    ref={this.emailRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Confirm email address
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="confirm_email"
                                    type="email"
                                    size="35"
                                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                    required={true}
                                    ref={this.confirm_emailRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Password
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="password"
                                    type="password"
                                    id="passwordReg"
                                    size="35"
                                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                    required={true}
                                    ref={this.passwordRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Confirm password
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="confirm_password"
                                    type="password"
                                    size="35"
                                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                    required={true}
                                    ref={this.confirm_passwordRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <p className="paragraph" style={{ color: 'white', fontWeight: 'bold' }}>Identification</p>
                            <label className="form-label">
                                First name
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="first_name"
                                    type="text"
                                    size="35"
                                    required={true}
                                    ref={this.fnameRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Last name
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="last_name"
                                    type="text"
                                    size="35"
                                    required={true}
                                    ref={this.lnameRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Confirm last name
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="confirm_last_name"
                                    id="confirm_last_name"
                                    type="text"
                                    size="35"
                                    required={true}
                                    ref={this.confirm_lnameRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Confirm first name
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text form-center"
                                    name="confirm_first_name"
                                    type="text"
                                    size="35"
                                    required={true}
                                    ref={this.confirm_fnameRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <p className="paragraph form-label">School Information</p>
                            <p style={{ color: 'white' }}>Don't see your school in the list? Request that it be added</p>
                            <label className="form-label">
                                <select name="school" style={{ width: "600px" }}
                                    className="form-control form-center" onChange={this.handleOnChange}>
                                    <option value="Washington State University">Washington State University</option>
                                    <option value="University of Washington">University of Washington</option>
                                    <option value="Western Washington University">Western Washington University</option>
                                    <option value="Seattle University">Seattle University</option>
                                </select>
                            </label>
                            <br />
                            <label className="form-label">
                                Student, Faculty, or Staff ID Number
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text"
                                    name="id"
                                    type="number"
                                    size="35"
                                    required={true}
                                    ref={this.IDRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Confirm Student, Faculty, or Staff ID Number
                 <input style={{ width: "600px" }}
                                    autocomplete="off"
                                    className="form-control form-text"
                                    name="confirm_id"
                                    type="number"
                                    size="35"
                                    required={true}
                                    ref={this.confirmIDRef}
                                    onChange={this.handleOnChange} />
                            </label>
                            <br></br>
                            <button className="register-btn" role="submit" type="submit">Register</button>
                        </form>
                    </div>
                </center>
            </div>
        );
    }
}

export default RegisterPage;