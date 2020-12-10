import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import CreateEditAccountDialog from './CreateEditAccountDialog.js'
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js"
import FeedPage from './FeedPage.js';
import Rounds from './Rounds.js';
import CoursesPage from './CoursesPage.js';
import AboutBox from './AboutBox.js';
import Register from './RegisterPage'
import ResetPassword from './ResetPasswordPage'
import Grades from './GradesPage'
import Assignments from './AssignmentsPage'
import Analytics from './AnalyticsPage'
import CourseSettings from './CourseSettingsPage'
import Users from './UsersPage'
import Help from './HelpPage'
import Mail from './MailPage'
import Profile from './ProfilePage'
import DeleteCourse from './DeleteCoursePage'
import FindCourse from './FindCoursePage'
import UserSettings from './UserSettingsPage'
import Administrator from './Admin'
import { async } from 'regenerator-runtime';



const modeTitle = {};
modeTitle[AppMode.ADMIN] = "Administrator"
modeTitle[AppMode.LOGIN] = "Welcome to SpeedScore";
modeTitle[AppMode.FEED] = "Dashboard";
modeTitle[AppMode.REGISTER] = "Register";
modeTitle[AppMode.ROUNDS] = "My Rounds";
modeTitle[AppMode.ROUNDS_LOGROUND] = "Log New Round";
modeTitle[AppMode.ROUNDS_EDITROUND] = "Edit Round";
modeTitle[AppMode.COURSES] = "Courses";
modeTitle[AppMode.RESET] = "Reset Password";
modeTitle[AppMode.GRADES] = "Grades";
modeTitle[AppMode.USERS] = "Users";
modeTitle[AppMode.ANALYTICS] = "Analytics";
modeTitle[AppMode.ASSIGNMENTS] = "Assignments";
modeTitle[AppMode.COURSE_SETTINGS] = "Course Settings";
modeTitle[AppMode.HELP] = "Help";
modeTitle[AppMode.MAIL] = "Mail";
modeTitle[AppMode.PROFILE] = "Profile";
modeTitle[AppMode.DELETE_COURSE] = "Delete Course";
modeTitle[AppMode.FIND_COURSE] = "Find Course";
modeTitle[AppMode.USER_SETTINGS] = "User Settings";

const modeToPage = {};
modeToPage[AppMode.ADMIN] = Administrator;
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.FEED] = FeedPage;
modeToPage[AppMode.REGISTER] = Register;
modeToPage[AppMode.ROUNDS] = Rounds;
modeToPage[AppMode.ROUNDS_LOGROUND] = Rounds;
modeToPage[AppMode.ROUNDS_EDITROUND] = Rounds;
modeToPage[AppMode.COURSES] = CoursesPage;
modeToPage[AppMode.RESET] = ResetPassword;
modeToPage[AppMode.GRADES] = Grades;
modeToPage[AppMode.USERS] = Users;
modeToPage[AppMode.ANALYTICS] = Analytics;
modeToPage[AppMode.ASSIGNMENTS] = Assignments;
modeToPage[AppMode.COURSE_SETTINGS] = CourseSettings;
modeToPage[AppMode.HELP] = Help;
modeToPage[AppMode.MAIL] = Mail;
modeToPage[AppMode.PROFILE] = Profile;
modeToPage[AppMode.DELETE_COURSE] = DeleteCourse;
modeToPage[AppMode.FIND_COURSE] = FindCourse;
modeToPage[AppMode.USER_SETTINGS] = UserSettings;



class App extends React.Component {

  constructor() {

    super();
    this.state = {
      mode: AppMode.LOGIN,
      menuOpen: false,
      authenticated: false,
      userObj: { displayName: "", profilePicURL: "" },
      selectedCourse: {},
      Enrolledcourses: {},
      editAccount: false,
      showEditAccountDialog: false,
      statusMsg: "",
      showAboutDialog: false,
      createCourse: true
    };
  }

  //componentDidMount
  componentDidMount() {

    if (!this.state.authenticated) {
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.setState({
              userObj: obj.user,
              authenticated: true,
              mode: AppMode.FEED //We're authenticated so can get into the app.
            }, async function () {

              if (this.state.userObj.is_instructor === true) {
                // gets all courses currently logged in proffesor is teaching
                let response = await fetch("courses/profCourses/" + this.state.userObj.userid);
                response = await response.json();
                const obj = JSON.parse(response);
                if (obj.length != 0) { // if there are courses
                  this.setState({selectedCourse: obj[0],Enrolledcourses:obj})
                  console.log(obj);
                } else {
                  
                  this.setState({
                    mode: AppMode.COURSE_SETTINGS,
                    selectedCourse: null
                  })
                  //instructor has no courses
                }
              } else {
                let response = await fetch("courses/studentCourses/" + this.state.userObj.userid);
                response = await response.json();
                const obj = JSON.parse(response);
                if (obj.length != 0) {
                  this.setState({
                    selectedCourse: obj[0],Enrolledcourses: obj})
                  console.log(obj);
                } else {
                  this.setState({
                    mode: AppMode.FIND_COURSE,
                    selectedCourse: null
                  })
                  // student not enrolled in any courses
                }

              }

            });
          }

        }
        )
    }
  }

  //refreshOnUpdate(newMode) -- Called by child components when user data changes in 
  //the database. The function calls the users/:userid (GET) route to update 
  //the userObj state var based on the latest database changes, and sets the 
  //mode state var is set to newMode. After this method is called, the
  //App will re-render itself, forcing the new data to 
  //propagate to the child components when they are re-rendered.
  refreshOnUpdate = async (newMode) => {
    //console.log("HERE");
    let response = await fetch("/users/" + this.state.userObj.id);
    response = await response.json();
    const obj = JSON.parse(response);
    this.setState({
      userObj: obj,
      mode: newMode
    });
  }

  loadCourses = async() =>{
    if (this.state.userObj.is_instructor === true) {
      // gets all courses currently logged in proffesor is teaching
      let response = await fetch("courses/profCourses/" + this.state.userObj.userid);
      response = await response.json();
      const obj = JSON.parse(response);
      this.setState({Enrolledcourses: obj});
    }
  }

  updateSelectedCourse = (_id) =>{
    var index = 0;
    for(index;index<this.state.Enrolledcourses.length;index++){
      if(this.state.Enrolledcourses[index]._id == _id){
          this.setState({selectedCourse:this.state.Enrolledcourses[index]});
          break;
      }
    }
  }

  createCourse = (arg) => {
    this.setState( { createCourse: arg });
  }


  handleChangeMode = (newMode) => {
    this.setState({ mode: newMode });
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  setUserId = (Id) => {
    this.setState({
      userId: Id,
      authenticated: true
    });
  }

  showEditAccount = () => {
    this.setState({ showEditAccountDialog: true });

  }

  cancelEditAccount = () => {
    this.setState({ showEditAccountDialog: false });
  }

  //editAccountDone -- called after successful edit or
  //deletion of user account. msg contains the status
  //message and deleted indicates whether an account was
  //edited (deleted == false) or deleted (deleted == true)
  editAccountDone = (msg, deleted) => {
    if (deleted) {
      this.setState({
        showEditAccountDialog: false,
        statusMsg: msg,
        mode: AppMode.LOGIN
      });
    } else {
      this.setState({
        showEditAccountDialog: false,
        statusMsg: msg
      });
    }
  }

  closeStatusMsg = () => {
    this.setState({ statusMsg: "" });
  }

  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div className="padded-page">
        {this.state.showAboutDialog ?
          <AboutBox close={() => this.setState({ showAboutDialog: false })} /> : null}
        {this.state.statusMsg != "" ? <div className="status-msg">
          <span>{this.state.statusMsg}</span>
          <button className="modal-close" onClick={this.closeStatusMsg}>
            <span className="fa fa-times"></span></button></div> : null}
        {/* {this.state.showEditAccountDialog ? 
            <CreateEditAccountDialog 
              create={false} 
              userId={this.state.userObj.id} 
              done={this.editAccountDone} 
              cancel={this.cancelEditAccount}/> : null} */}
        {this.state.mode == AppMode.LOGIN || this.state.mode == AppMode.REGISTER ? null : <NavBar
          Enrolledcourses={this.state.Enrolledcourses}
          userObj={this.state.userObj}
          selectedCourse={this.state.selectedCourse}
          updateSelectedCourse={this.updateSelectedCourse}
          dashboard={modeTitle[this.state.mode]}
          grades={modeTitle[AppMode.GRADES]}
          assignments={modeTitle[AppMode.ASSIGNMENTS]}
          users={modeTitle[AppMode.USERS]}
          userObj={this.state.userObj}
          analytics={modeTitle[AppMode.ANALYTICS]}
          settings={modeTitle[AppMode.COURSE_SETTINGS]}
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          createCourse={this.createCourse}
          toggleMenuOpen={this.toggleMenuOpen} />}
        <SideMenu
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          createCourse = {this.state.createCourse}
          toggleMenuOpen={this.toggleMenuOpen}
          displayName={this.state.userObj.displayName}
          profilePicURL={this.state.userObj.profilePicURL}
          localAccount={this.state.userObj.authStrategy === "local"}
          editAccount={this.showEditAccount}
          logOut={() => this.handleChangeMode(AppMode.LOGIN)}
          showAbout={() => { this.setState({ showAboutDialog: true }) }} />
        {/* <ModeBar 
            mode={this.state.mode} 
            changeMode={this.handleChangeMode}
            menuOpen={this.state.menuOpen}/> */}
        <ModePage
          create={false} // this will be set to 
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          loadCourses={this.loadCourses}
          changeMode={this.handleChangeMode}
          userObj={this.state.userObj}
          selectedCourse={this.state.selectedCourse}
          refreshOnUpdate={this.refreshOnUpdate} />
      </div>
    );
  }
}

export default App;