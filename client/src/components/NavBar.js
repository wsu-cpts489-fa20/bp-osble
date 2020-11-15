import React from 'react';
import AppMode from '../AppMode';
import Dropdown from './Dropdown'

class NavBar extends React.Component {
  constructor(props){
    super(props);
  }

  getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.ROUNDS_LOGROUND || 
          this.props.mode === AppMode.ROUNDS_EDITROUND)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
  }

  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.ROUNDS_LOGROUND ||
        this.props.mode === AppMode.ROUNDS_EDITROUND) {
      this.props.changeMode(AppMode.ROUNDS);
    } else if (this.props.mode != AppMode.LOGIN) {
      this.props.toggleMenuOpen();
    }
  }

  switchMode = (newMode) =>{
    this.props.changeMode(newMode);
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

    
  render() {
    return (
    <div className="navbar">  
    <span className="navbar-items">
      <img src="osble3.png" alt="osble Logo" height="50px" onClick={() =>this.switchMode(AppMode.FEED)} width="100px" className="navbar-items"/>
      {/* {this.renderStudentMode()} */}
      {this.renderInstructorMode()}
    </span>
    <span className="navbar-items-right">
    <span className="navbar-title">
        &nbsp;Help
      </span>
      <Dropdown/>
      <span className="navbar-title">
        &nbsp;Help
      </span>
      
  
    </span>
  </div>
); 
}
}

export default NavBar;
