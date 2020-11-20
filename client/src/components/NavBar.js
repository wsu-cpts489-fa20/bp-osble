import React from 'react';
import AppMode from '../AppMode';
import Dropdown from './Dropdown'
import '../styles/Navbar.css';
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.namewidth = React.createRef()
    this.state = {
      displayMenu: false,
      type: "",
      coursedropdown: false,
      userdropdown: false,
    };

  }


  toggleShowDropdown = (newType) => {
    this.setState(prevState => ({ displayMenu: !prevState.displayMenu }));
    this.setType(newType);
  }

  switchMode = (newMode) => {
    this.props.changeMode(newMode);
  }

  setType = (newType) => {
    this.setState({ type: newType });
  }

  renderStudentMode = () => {
    return (
      <div>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span className={this.props.mode == AppMode.FEED ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.FEED)}>
          &nbsp;{this.props.dashboard}&nbsp;
      </span>
        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.ASSIGNMENTS ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.ASSIGNMENTS)}>
          &nbsp;{this.props.assignments}&nbsp;
      </span>
        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.GRADES ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.GRADES)}>
          &nbsp;{this.props.grades}&nbsp;
      </span>
      </div>
    );
  }

  renderInstructorMode = () => {
    return (
      <div>
        &nbsp;&nbsp;&nbsp;
        <button className={this.props.mode == AppMode.FEED ? "btn btn-primary navbutton selected" : "btn btn-primary navbutton"} onClick={() => this.switchMode(AppMode.FEED)}>Dashboard</button>
        <button className={this.props.mode == AppMode.ASSIGNMENTS ? "btn btn-primary navbutton selected" : "btn btn-primary navbutton"} onClick={() => this.switchMode(AppMode.ASSIGNMENTS)}>Assignments</button>
        <button className={this.props.mode == AppMode.GRADES ? "btn btn-primary navbutton selected" : "btn btn-primary navbutton"} onClick={() => this.switchMode(AppMode.GRADES)}>Grades</button>
        <button className={this.props.mode == AppMode.USERS ? "btn btn-primary navbutton selected" : "btn btn-primary navbutton"} onClick={() => this.switchMode(AppMode.USERS)}>Users</button>
        <button className={this.props.mode == AppMode.COURSE_SETTINGS ? "btn btn-primary navbutton selected" : "btn btn-primary navbutton"} onClick={() => this.switchMode(AppMode.COURSE_SETTINGS)}>Course Settings</button>
        <button className={this.props.mode == AppMode.ANALYTICS ? "btn btn-primary navbutton selected" : "btn btn-primary navbutton"} onClick={() => this.switchMode(AppMode.ANALYTICS)}>Analytics</button>
      </div>

      /*
      <div>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span className={this.props.mode == AppMode.FEED ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.FEED)}>
          &nbsp;&nbsp;{this.props.dashboard}&nbsp;
      </span>
        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.ASSIGNMENTS ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.ASSIGNMENTS)}>
          &nbsp;{this.props.assignments}&nbsp;
      </span>
        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.GRADES ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.GRADES)}>
          &nbsp;{this.props.grades}&nbsp;
      </span>

        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.USERS ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.USERS)}>
          &nbsp;{this.props.users}&nbsp;
      </span>

        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.COURSE_SETTINGS ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.COURSE_SETTINGS)}>
          &nbsp;{this.props.settings}&nbsp;
      </span>

        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className={this.props.mode == AppMode.ANALYTICS ? "navbar-title item-selected" : "navbar-title"} onClick={() => this.switchMode(AppMode.ANALYTICS)}>
          &nbsp;{this.props.analytics}&nbsp;
      </span>
      </div>
      */

    );
  }
  togglecoursedropdown = () => {
    this.setState(prevstate => ({ coursedropdown: !prevstate.coursedropdown, userdropdown: false }));
  }
  toggleuserdropdown = () => {
    this.setState(prevstate => ({ userdropdown: !prevstate.userdropdown, coursedropdown: false }));
  }
  gotopage = (string) => {
    if (string == "deletecourse") {
      this.props.changeMode(AppMode.DELETE_COURSE);
    }
    else if (string == "findcourse") {
      this.props.changeMode(AppMode.FIND_COURSE);
    }
    else if (string == "mail") {
      this.props.changeMode(AppMode.MAIL);
    }
    else if (string == "profile") {
      this.props.changeMode(AppMode.PROFILE);
    }
    else if (string == "settings") {
      this.props.changeMode(AppMode.USER_SETTINGS);
    }
    else if (string == "logout") {
      this.props.changeMode(AppMode.LOGIN);
    }
    else if (string == "createcourse") {
      this.props.changeMode(AppMode.COURSE_SETTINGS);
    }

    this.setState({
      coursedropdown: false,
      userdropdown: false
    });
  }
  renderRightItems = () => {

    return (

      <div>
        <button className="btn btn-primary navbutton" style={{ width: "7.5rem" }} onClick={this.togglecoursedropdown}>CPTS 489
        &nbsp;
        <span className={this.state.coursedropdown == true ? "navbar-title fa fa-angle-left" : "navbar-title fa fa-angle-down"}></span>
        </button>

        <button className="btn btn-primary navbutton" ref={this.namewidth} onClick={this.toggleuserdropdown}>Leonard Brkanac
        &nbsp;
        <span className={this.state.userdropdown == true ? "navbar-title fa fa-angle-left" : "navbar-title fa fa-angle-down"}></span></button>
        <button className="btn btn-primary navbutton" onClick={() => this.switchMode(AppMode.MAIL)}>Mail</button>
        <button className="btn btn-primary navbutton" onClick={() => this.switchMode(AppMode.HELP)}>Help</button>

        {this.state.coursedropdown ?
          <div style={{ display: "flex", flexDirection: "column", top: "61px" }} className="mydropdownnav">
            <button className="btn btn-primary navdropdown" style={{ width: "7.5rem", borderRadius: "0px" }} onClick={() => this.gotopage("findcourse")} >Find Course</button>
            <button className="btn btn-primary navdropdown" style={{ width: "7.5rem", borderRadius: "0px" }} onClick={() => this.gotopage("createcourse")}>Create Course</button>
            <button className="btn btn-primary navdropdown" style={{ width: "7.5rem", borderRadius: "0px" }} onClick={() => this.gotopage("deletecourse")}>Delete Course</button>
          </div>
          :
          null
        }

        {this.state.userdropdown ?
          <div style={{ display: "flex", flexDirection: "column", top: "61px" }} className="mydropdownnav moveright">
            <button className="btn btn-primary navdropdown" style={{ width: this.namewidth.current.offsetWidth - 5, borderRadius: "0px" }} onClick={() => this.gotopage("mail")}>Mail</button>
            <button className="btn btn-primary navdropdown" style={{ width: this.namewidth.current.offsetWidth - 5, borderRadius: "0px" }} onClick={() => this.gotopage("profile")}>Profile</button>
            <button className="btn btn-primary navdropdown" style={{ width: this.namewidth.current.offsetWidth - 5, borderRadius: "0px" }} onClick={() => this.gotopage("settings")}>Settings</button>
            <button className="btn btn-primary navdropdown" style={{ width: this.namewidth.current.offsetWidth - 5, borderRadius: "0px" }} onClick={() => this.gotopage("logout")}>Log Out</button>
          </div>
          :
          null
        }
      </div>
      /*
      <div>
        <span className="navbar-title" onClick= {() =>this.toggleShowDropdown("course")}>&nbsp;CptS 489
        <Dropdown 
          displayMenu={this.state.displayMenu}
          type={this.state.type}
          changeMode={this.props.changeMode}/>&nbsp;</span>
        <span className="navbar-title fa fa-angle-down">&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <img src="osble2.png" height='60' width='60' className="navbar-items"/>
        <span className="navbar-title" onClick= {() =>this.toggleShowDropdown("profile")}>Hermes Obiang 
        <Dropdown 
          displayMenu={this.state.displayMenu}
          type={this.state.type}
          changeMode={this.props.changeMode}/>&nbsp;</span>
        <span className="navbar-title fa fa-angle-down">&nbsp;&nbsp;</span>

        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="navbar-title fa fa-envelope" onClick={() =>this.switchMode(AppMode.MAIL)}>&nbsp;Mail(0)&nbsp;</span>

        <span>&nbsp;&nbsp;&nbsp;</span>

        <span className="navbar-title fa fa-question-circle" onClick={() =>this.switchMode(AppMode.HELP)}>&nbsp;Help&nbsp;&nbsp;</span>
      </div>
      */
    );

  }

  renderDropdown = () => {
    return (<Dropdown />);
  }


  render() {
    return (
      <div style={{ padding: "5px" }}>
        <div className="navbar">
          <span className="navbar-items">
            <img src="osble3.png" alt="osble Logo" height="50px" onClick={() => this.switchMode(AppMode.FEED)} width="100px" className="navbar-items" />
            {/* {this.renderStudentMode()} */}
            {this.renderInstructorMode()}
          </span>
          <span className="navbar-items-right">
            {this.renderRightItems()}
          </span>
        </div>

      </div>
    );
  }
}

export default NavBar;
