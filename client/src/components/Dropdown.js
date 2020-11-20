import React from 'react';
import AppMode from '../AppMode';
import '../styles/Dropdown.css';

class Dropdown extends React.Component {
constructor(props){
 super(props);

};


logOut = () =>{
  this.props.changeMode(AppMode.LOGIN);
}



  render() {
    return (
        <div  className="modal-dropdown" role="dialog" style = {{width:"200px"}} >

          { this.props.displayMenu ?  this.props.type == "profile" ? (
        <ul className = "maindropdown">
         <li className = "dropitem"><a className="active" href="#View Profile" onClick={() =>this.props.changeMode(AppMode.MAIL)}>Mail(0)</a></li>
         <li className = "dropitem"><a href="#Settings" onClick={() =>this.props.changeMode(AppMode.PROFILE)}>View Profile</a></li>
         <li className = "dropitem"><a href="#Settings" onClick={() =>this.props.changeMode(AppMode.USER_SETTINGS)}>Settings</a></li>
         <li className = "dropitem" onClick={this.logOut}><a href="#Log Out">Log Out </a></li>
          </ul>
        ):
        (
          <ul className = "maindropdown">
           <li className = "dropitem"><a className="active" href="#Create Page" onClick={() =>this.props.changeMode(AppMode.FIND_COURSE)}>Find Course</a></li>
           <li className = "dropitem"><a href="#Create Course" onClick={() =>this.props.changeMode(AppMode.COURSE_SETTINGS)}>Create Course</a></li>
           <li className = "dropitem"><a href="#Delete Course" onClick={() =>this.props.changeMode(AppMode.DELETE_COURSE)}>Delete Course </a></li>
            </ul>
          )
        :
        (
          null
        )
        }

       </div>

    );
  }
}

export default Dropdown;