import React from 'react';
import AppMode from './../AppMode.js';

class UserForm extends React.Component {
  constructor(props) {
  super(props);
  //Create date object for today, taking time zone into consideration
  
  //store date as ISO string
  if (this.props.mode === AppMode.USERS_LOGUSER || this.props.mode === AppMode.USERS ) {
    //If logging a new round, the starting state is a default round with
    //today's date.
    this.state = { 
                  sId: "",
                  role: "student",
                  class: this.props.selectedCourse.course_name,
                  
                  faIcon: "fa fa-save",
                  btnLabel: "Save User Data"}
  } else {
    //if editing an existing round, the starting state is the round's
    //current data
    let thisUser = {...this.props.startData};
    //delete thisUser.id;
    thisUser.faIcon = "fa fa-edit";
    thisUser.btnLabel = "Update user Data";
    this.state = thisUser;
  }
}
  
  
    handleChange = (event) => {
        const name = event.target.name;
        
        this.setState({[name]: event.target.value});
    }
  
  
    //handleSubmit -- When the user clicks on the button to save/update the
    //round, start the spinner and invoke the parent component's saveRound
    //method to do the actual work. Note that saveRound is set to the correct
    //parent method based on whether the user is logging a new round or editing
    //an existing round.
    handleSubmit = (event) => {
        //start spinner
        this.setState({faIcon: "fa fa-spin fa-spinner",
                        btnLabel: (this.props.mode === AppMode.USERS_LOGUSER ? 
                                    "Saving..." : "Updating...")});
        //Prepare current round data to be saved
        let userData = this.state;
        delete userData.faIcon;
        delete userData.btnLabel;
        //call saveRound on 1 second delay to show spinning icon
        setTimeout(this.props.saveUser,1000,userData); 
        event.preventDefault(); 
        }
  

    
  
    render() {
      return (
        <form className="padded-page" onSubmit={this.handleSubmit}>
          <center>
            
            <p></p>
            <label>
              Student ID:
              <input name="sId" className="form-control form-center" type="text"
                value={this.state.sId} onChange={this.handleChange}
                placeholder="Student ID or email" size="50" maxLength="50" />
            </label>
          <p></p>
          <label>Class:
          <select name="class" value={this.state.class} 
            className="form-control form-center" onChange={this.handleChange}>
            <option value="1">{this.state.class}</option>
            
          </select> 
          </label>
          <p></p>
          <label>Role:
          <select name="role" value={this.state.role} 
            className="form-control form-center" onChange={this.handleChange}>
            
            <option value="student">Student</option>
          </select> 
          </label>
          
          <p></p>
          <button type="submit" style={{width: "70%",fontSize: "36px"}} 
            className="btn btn-primary btn-color-theme">
              <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
          </button>
          </center>
        </form>
      );
    }
}

export default UserForm;