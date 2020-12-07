//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import passport from 'passport';
import passportGithub from 'passport-github';
import passportLocal from 'passport-local';
import session from 'express-session';
import regeneratorRuntime from "regenerator-runtime";
import path from 'path';
import express from 'express';
require('dotenv').config();

const LOCAL_PORT = 8081;
const DEPLOY_URL = "http://osble.us-west-2.elasticbeanstalk.com";
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const GithubStrategy = passportGithub.Strategy;
const LocalStrategy = passportLocal.Strategy;
const app = express();
//const server = require('./server')

//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
import mongoose from 'mongoose';

const connectStr = process.env.MONGO_STR;

mongoose.connect(connectStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => { console.log(`Connected to ${connectStr}.`) },
    err => { console.error(`Error connecting to ${connectStr}: ${err}`) }
  );

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userid: String, //unique identifier for user
  password: String,
  email: String,
  first_name: String,
  last_name: String,
  school: String,
  is_instructor: Boolean
});
const gradeSchema = new Schema({
  userid: String,
  grade: Number
});
const assignmentSchema = new Schema({
  assignment_name: String,
  assignment_content: String,
  instructor: String,
  due_date: Number,
  grades: [gradeSchema] // each student will be:

});
const replySchema = new Schema({
  userid: String,
  reply_content: String
});
const postSchema = new Schema({
  userid: String,
  post_content: String,
  replies: [replySchema]
});
const courseSchema = new Schema({
  //use the _id field for identifying courses
  course_name: String,
  instructor: String,
  students: [],// just an array of userid's for easy access
  posts: [postSchema],
  assignments: [assignmentSchema],

});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

passport.use(new LocalStrategy({ passReqToCallback: true },
  //Called when user is attempting to log in with local username and password. 
  //userId contains the email address entered into the form and password
  //contains the password entered into the form.
  async (req, userId, password, done) => {
    let thisUser;
    try {
      thisUser = await User.findOne({ email: userId });
      if (thisUser) {
        if (thisUser.password === password) {
          return done(null, thisUser);
        } else {
          req.authError = "The password is incorrect. Please try again" +
            " or reset your password.";
          return done(null, false)
        }
      } else { //userId not found in DB
        req.authError = "There is no account with email " + userId +
          ". Please try again.";
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
));

//Serialize the current user to the session
passport.serializeUser((user, done) => {
  console.log("In serializeUser.");
  console.log("Contents of user param: " + JSON.stringify(user));
  done(null, user.email);
});

//Deserialize the current user from the session
//to persistent storage.
passport.deserializeUser(async (userId, done) => {
  console.log("In deserializeUser.");
  console.log("Contents of userId param: " + userId);
  let thisUser;
  try {
    thisUser = await User.findOne({ email: userId });
    console.log("User with id " + userId +
      " found in DB. User object will be available in server routes as req.user.")
    console.log(thisUser);
    done(null, thisUser);
  } catch (err) {
    done(err);
  }
});

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////
app
  .use(session({
    secret: "speedgolf",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 }
  }))
  .use(express.static(path.join(__dirname, "client/build")))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json({ limit: '20mb' }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//////////////////////////////////////////////////////////////////////////
//DEFINE EXPRESS APP ROUTES
//////////////////////////////////////////////////////////////////////////


/////////////////////////////////
//USER ACCOUNT MANAGEMENT ROUTES
////////////////////////////////

//READ user route: Retrieves the user with the specified userId from users collection (GET)
app.get('/users/:userId', async (req, res, next) => {
  console.log("in /users route (GET) with userId = " +
    JSON.stringify(req.params.userId));
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (!thisUser) {
      return res.status(404).send("No user account with id " +
        req.params.userId + " was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisUser));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up user with id " +
      req.params.userId + " in database: " + err);
  }
});

//CREATE user route: Adds a new user account to the users collection (POST)
app.post('/users/:userId', async (req, res, next) => {
  console.log("in /users route (POST) with params = " + JSON.stringify(req.params) +
    " and body = " + JSON.stringify(req.body));
  if (req.body === undefined ||
    !req.body.hasOwnProperty("password") ||
    !req.body.hasOwnProperty("first_name") ||
    !req.body.hasOwnProperty("last_name") ||
    !req.body.hasOwnProperty("school")) {
    //Body does not contain correct properties
    return res.status(400).send("/users POST request formulated incorrectly. " +
      "It must contain 'password','displayName','profilePicURL','securityQuestion' and 'securityAnswer fields in message body.")
  }
  try {
    let thisUser = await User.findOne({ id: req.params.id });
    if (thisUser) { //account already exists
      res.status(400).send("There is already an account with email '" +
        req.params.userId + "'.");
    } else { //account available -- add to database
      thisUser = await new User({
        userid: req.body.userid,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        school: req.body.school,
        is_instructor: false // this will be variable later

      }).save();
      return res.status(201).send("New account for '" +
        req.params.id + "' successfully created.");
    }
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up user in database. " + err);
  }
});

//UPDATE user route: Updates a new user account in the users collection (POST)
app.put('/users/:userId', async (req, res, next) => {
  console.log("in /users update route (PUT) with userId = " + JSON.stringify(req.params) +
    " and body = " + JSON.stringify(req.body));
  if (!req.params.hasOwnProperty("userId")) {
    return res.status(400).send("users/ PUT request formulated incorrectly." +
      "It must contain 'userId' as parameter.");
  }
  const validProps = ['password', 'displayName', 'profilePicURL',
    'securityQuestion', 'securityAnswer'];
  for (const bodyProp in req.body) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("users/ PUT request formulated incorrectly." +
        "Only the following props are allowed in body: " +
        "'password', 'displayname', 'profilePicURL', 'securityQuestion', 'securityAnswer'");
    }
  }
  try {
    let status = await User.updateOne({ id: req.params.userId },
      { $set: req.body });
    if (status.nModified != 1) { //account could not be found
      res.status(404).send("No user account " + req.params.userId + " exists. Account could not be updated.");
    } else {
      res.status(200).send("User account " + req.params.userId + " successfully updated.")
    }
  } catch (err) {
    res.status(400).send("Unexpected error occurred when updating user data in database: " + err);
  }
});

//DELETE user route: Deletes the document with the specified userId from users collection (DELETE)
app.delete('/users/:userId', async (req, res, next) => {
  console.log("in /users route (DELETE) with userId = " +
    JSON.stringify(req.params.userId));
  try {
    let status = await User.deleteOne({ id: req.params.userId });
    if (status.deletedCount != 1) {
      return res.status(404).send("No user account " +
        req.params.userId + " was found. Account could not be deleted.");
    } else {
      return res.status(200).send("User account " +
        req.params.userId + " was successfully deleted.");
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when attempting to delete user account with id " +
      req.params.userId + ": " + err);
  }
});

///////////////////////
//AUTHENTICATION ROUTES
///////////////////////
//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.
app.get('/auth/logout', (req, res) => {
  console.log('/auth/logout reached. Logging out');
  req.logout();
  res.redirect('/');
});

//TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.
app.get('/auth/test', (req, res) => {
  console.log("auth/test reached.");
  console.log(req.user);
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    console.log("User is authenticated");
    console.log("User record tied to session: " + JSON.stringify(req.user));
  } else {
    //User is not authenticated
    console.log("User is not authenticated");
  }
  //Return JSON object to client with results.
  res.json({ isAuthenticated: isAuth, user: req.user });
});

//LOGIN route: Attempts to log in user using local strategy
app.post('/auth/login',
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    console.log("/login route reached: successful authentication.");
    //Redirect to app's main page; the /auth/test route should return true
    res.status(200).send("Login successful");
  },
  (err, req, res, next) => {
    console.log("/login route reached: unsuccessful authentication");
    if (req.authError) {
      console.log("req.authError: " + req.authError);
      res.status(401).send(req.authError);
    } else {
      res.status(401).send("Unexpected error occurred when attempting to authenticate. Please try again.");
    }
    //Note: Do NOT redirect! Client will take over.
  });

  ////////////////////////////////
  //COURSE ROUTES
  ///////////////////////////////
  //READ user route: Retrieves the user with the specified userId from users collection (GET)
app.get('/courses/:course_name', async (req, res, next) => {
  console.log("in /courses route (GET) with name = " +
    JSON.stringify(req.params.course_name));
  try {
    let thisCourse = await User.findOne({ id: req.params.course_name });
    if (!thisCourse) {
      return res.status(404).send("No course named " +
        req.params.course_name + " was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisCourse));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up course with name " +
      req.params.course_name + " in database: " + err);
  }
});

// course_name: String,
//   instructor: String,
//   students: [],// just an array of userid's for easy access
//   posts: [postSchema],
//   assignments: [assignmentSchema],

//CREATE user route: Adds a new user account to the users collection (POST)
app.post('/courses/:course_name', async (req, res, next) => {
  console.log("in /courses route (POST) with params = " + JSON.stringify(req.params) +
    " and body = " + JSON.stringify(req.body));
  if (req.body === undefined ||
    !req.body.hasOwnProperty("course_name") ||
    !req.body.hasOwnProperty("instructor") ||
    !req.body.hasOwnProperty("students") ||
    !req.body.hasOwnProperty("posts") ||
    !req.body.hasOwnProperty("assignments")) {
    //Body does not contain correct properties
    return res.status(400).send("/courses POST request formulated incorrectly. " +
      "It must contain 'course_name','instructor','students','posts' and 'assignments fields in message body.")
  }
  try {
    let thisCourse = await Course.findOne({ course_name: req.params.course_name });
    console.log(thisCourse);
    if (thisCourse) { //account already exists
      res.status(400).send("There is already a course with the name '" +
        req.params.course_name + "'.");
    } else { //account available -- add to database
      thisCourse = await new Course({
        course_name: req.body.course_name,
        instructor: req.body.instructor,
        students: req.body.students,
        posts: req.body.posts,
        assignments: req.body.assignments

      }).save();
      return res.status(201).send("This course '" +
        req.params.course_name + "' was successfully created.");
    }
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up course in database. " + err);
  }
});



/*
/////////////////////////////////
//ROUNDS ROUTES
////////////////////////////////

//CREATE round route: Adds a new round as a subdocument to 
//a document in the users collection (POST)
app.post('/rounds/:userId', async (req, res, next) => {
  console.log("in /rounds (POST) route with params = " +
    JSON.stringify(req.params) + " and body = " +
    JSON.stringify(req.body));
  if (!req.body.hasOwnProperty("date") ||
    !req.body.hasOwnProperty("course") ||
    !req.body.hasOwnProperty("type") ||
    !req.body.hasOwnProperty("holes") ||
    !req.body.hasOwnProperty("strokes") ||
    !req.body.hasOwnProperty("minutes") ||
    !req.body.hasOwnProperty("seconds") ||
    !req.body.hasOwnProperty("notes")) {
    //Body does not contain correct properties
    return res.status(400).send("POST request on /rounds formulated incorrectly." +
      "Body must contain all 8 required fields: date, course, type, holes, strokes, " + "minutes, seconds, notes.");
  }
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      { $push: { rounds: req.body } });
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when adding round to" +
        " database. Round was not added.");
    } else {
      res.status(200).send("Round successfully added to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when adding round" +
      " to database: " + err);
  }
});

//READ round route: Returns all rounds associated 
//with a given user in the users collection (GET)
app.get('/rounds/:userId', async (req, res) => {
  console.log("in /rounds route (GET) with userId = " +
    JSON.stringify(req.params.userId));
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (!thisUser) {
      return res.status(400).message("No user account with specified userId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisUser.rounds));
    }
  } catch (err) {
    console.log()
    return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
  }
});

//UPDATE round route: Updates a specific round 
//for a given user in the users collection (PUT)
app.put('/rounds/:userId/:roundId', async (req, res, next) => {
  console.log("in /rounds (PUT) route with params = " +
    JSON.stringify(req.params) + " and body = " +
    JSON.stringify(req.body));
  const validProps = ['date', 'course', 'type', 'holes', 'strokes',
    'minutes', 'seconds', 'notes'];
  let bodyObj = { ...req.body };
  delete bodyObj._id; //Not needed for update
  delete bodyObj.SGS; //We'll compute this below in seconds.
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("rounds/ PUT request formulated incorrectly." +
        "It includes " + bodyProp + ". However, only the following props are allowed: " +
        "'date', 'course', 'type', 'holes', 'strokes', " +
        "'minutes', 'seconds', 'notes'");
    } else {
      bodyObj["rounds.$." + bodyProp] = bodyObj[bodyProp];
      delete bodyObj[bodyProp];
    }
  }
  try {
    let status = await User.updateOne(
      {
        "id": req.params.userId,
        "rounds._id": mongoose.Types.ObjectId(req.params.roundId)
      }
      , { "$set": bodyObj }
    );
    if (status.nModified != 1) {
      res.status(400).send("Unexpected error occurred when updating round in database. Round was not updated.");
    } else {
      res.status(200).send("Round successfully updated in database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when updating round in database: " + err);
  }
});

//DELETE round route: Deletes a specific round 
//for a given user in the users collection (DELETE)
app.delete('/rounds/:userId/:roundId', async (req, res, next) => {
  console.log("in /rounds (DELETE) route with params = " +
    JSON.stringify(req.params));
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      { $pull: { rounds: { _id: mongoose.Types.ObjectId(req.params.roundId) } } });
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when deleting round from database. Round was not deleted.");
    } else {
      res.status(200).send("Round successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when deleting round from database: " + err);

  }
});
*/

//app.use("", server);