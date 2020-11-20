import React from 'react';
import AppMode from '../AppMode';
import Dropdown from './Dropdown'

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayMenu: false,
      type: ""
    };
  }


  toggleShowDropdown = (newType) => {
    this.setState(prevState => ({displayMenu: !prevState.displayMenu}));
    this.setType(newType);
  }

  switchMode = (newMode) =>{
    this.props.changeMode(newMode);
  }

  setType = (newType) =>{
    this.setState({type: newType});
  }

  renderStudentMode = () =>{
    return(
      <div>
       <span>&nbsp;&nbsp;&nbsp;</span>
      <span className={ this.props.mode == AppMode.FEED ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.FEED)}>
        &nbsp;{this.props.dashboard}&nbsp;
      </span>
      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.ASSIGNMENTS ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.ASSIGNMENTS)}>
        &nbsp;{this.props.assignments}&nbsp;
      </span>
      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.GRADES ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.GRADES)}>
        &nbsp;{this.props.grades}&nbsp;
      </span>
      </div>
    );
  }


  renderInstructorMode = () =>{
    return(
      <div>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span className={ this.props.mode == AppMode.FEED ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.FEED)}>
        &nbsp;&nbsp;{this.props.dashboard}&nbsp;
      </span>
      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.ASSIGNMENTS ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.ASSIGNMENTS)}>
        &nbsp;{this.props.assignments}&nbsp;
      </span>
      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.GRADES ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.GRADES)}>
        &nbsp;{this.props.grades}&nbsp;
      </span>

      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.USERS ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.USERS)}>
        &nbsp;{this.props.users}&nbsp;
      </span>

      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.COURSE_SETTINGS ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.COURSE_SETTINGS)}>
        &nbsp;{this.props.settings}&nbsp;
      </span>

      <span>&nbsp;&nbsp;&nbsp;</span>

      <span className={ this.props.mode == AppMode.ANALYTICS ? "navbar-title item-selected": "navbar-title"} onClick={() =>this.switchMode(AppMode.ANALYTICS)}>
        &nbsp;{this.props.analytics}&nbsp;
      </span>
      </div>
    );
  }

  renderRightItems = () =>{

    return (
      <div>
        
        {/* <span className="navbar-title">&nbsp; <Dropdown/>&nbsp;</span> */}
        <span className="navbar-title" onClick= {() =>this.toggleShowDropdown("course")}>&nbsp;CptS 489
        <Dropdown 
          displayMenu={this.state.displayMenu}
          type={this.state.type}
          changeMode={this.props.changeMode}/>&nbsp;</span>
        <span className="navbar-title fa fa-angle-down">&nbsp;</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <img src="osble2.png" height='60' width='60' className="navbar-items"/>
        <span id="profile" className="navbar-title" onClick= {() =>this.toggleShowDropdown("profile")}>Hermes Obiang 
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
    );
  }

  renderDropdown = () =>{
    return(<Dropdown/>);
  }

    
  render() {
    return (
    <div className="navbar">  
    <span className="navbar-items">
      <img src="osble3.png" alt="osble Logo" height="50px" onClick={() =>this.switchMode(AppMode.FEED)} width="100px" className="navbar-items"/>
      {/* {this.renderStudentMode()} */}
      {this.renderInstructorMode()}
    </span>
    <span className="navbar-items-right">
      {this.renderRightItems()}
    </span>
  </div>
); 
}
}

export default NavBar;
