/* AppMode: The enumerated type for AppMode. */


const AppMode = {
    ADMIN: "AdminMode",
    LOGIN: "LoginMode",
    HELP: "HelpMode", 
    MAIL: "MailMode", 
    PROFILE: "ProfileMode",
    RESET: "ResetMode",
    ASSIGNMENTS: "AssignmentsMode",
    GRADES: "GradesMode",
    USER_SETTINGS: "UserSettingsMode",
    COURSE_SETTINGS : "CourseSettingsMode",
    CREATE_COURSE: "CreateCourseMode", 
    DELETE_COURSE: "DeleteCourseMode", 
    FIND_COURSE: "FindCourseMode",
    ANALYTICS: "AnalyticsMode",
    USERS: "UsersMode",
    USERS_LOGUSER: "UsersMode-LogUser",
    USERS_EDITUSER: "UsersMode-EditUser",
    REGISTER : "RegisterMode",
    FEED: "FeedMode",
    COURSES: "CoursesMode"
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;