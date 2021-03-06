import React from 'react';
import NavBar from './NavBar.js';
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js"
import FeedPage from './FeedPage.js';
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
modeTitle[AppMode.COURSES] = "Courses";
modeTitle[AppMode.RESET] = "Reset Password";
modeTitle[AppMode.GRADES] = "Grades";
modeTitle[AppMode.USERS] = "Users";
modeTitle[AppMode.USERS_LOGUSER]= "Add User";
modeTitle[AppMode.USERS_EDITUSER]= "Edit User";
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
modeToPage[AppMode.RESET] = ResetPassword;
modeToPage[AppMode.GRADES] = Grades;
modeToPage[AppMode.USERS] = Users;
modeToPage[AppMode.USERS_LOGUSER] = Users;
modeToPage[AppMode.USERS_EDITUSER] = Users;
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
            console.log("inside didmount ")
             this.setState({
              userObj: obj.user,
              authenticated: true,
              mode: AppMode.FEED //We're authenticated so can get into the app.
            }, async function () {
              console.log("inside didmount ")

              if (this.state.userObj.is_instructor === true) {
                // gets all courses currently logged in proffesor is teaching
                let response = await fetch("courses/profCourses/" + this.state.userObj.userid);
                response = await response.json();
                const obj = JSON.parse(response);
                if (obj.length != 0) { // if there are courses
                  await this.setState({selectedCourse: obj[0],Enrolledcourses:obj})
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
                  await this.setState({
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
    let response = await fetch("/users/" + this.state.userObj.email);
    response = await response.json();
    const obj = JSON.parse(response);
    this.setState({
      userObj: obj,
      mode: newMode
    });
    if (newMode === AppMode.FEED || newMode === AppMode.USERS){
    let response2 = await fetch("courses/studentCourses/" + this.state.userObj.userid);
    response2 = await response.json();
    const obj2 = JSON.parse(response);
    console.log(obj2)
    if (obj2.length != 0) {
      this.setState({
        selectedCourse: obj2[0],
      })
      console.log(obj2);
    } else {
      this.setState({
       
        selectedCourse: null
      })
      // student not enrolled in any courses
    }
  }
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
        {this.state.statusMsg != "" ? <div className="status-msg">
          <span>{this.state.statusMsg}</span>
          <button className="modal-close" onClick={this.closeStatusMsg}>
            <span className="fa fa-times"></span></button></div> : null}
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
        <ModePage
          create={false} // this will be set to 
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          loadCourses={this.loadCourses}
          changeMode={this.handleChangeMode}
          userObj={this.state.userObj}
          selectedCourse={this.state.selectedCourse}
          Enrolledcourses = {this.state.Enrolledcourses}
          refreshOnUpdate={this.refreshOnUpdate} />
      </div>
    );
  }
}

export default App;