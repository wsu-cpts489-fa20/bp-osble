import express from 'express';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
const { Schema } = require("mongoose");
const app = express();
require('dotenv').config();


const userSchema = new Schema({
    id: String, // unique identifier
    password: String,
    displayName: String,
    //↓ Need to discuss about this later ↓//
    //userType: String, 
    //↑ Need to discuss about this later ↑//
    profilePicURL: String, //link to profile image
    email: String,
    securityQuestion: String,
    securityAnswer:{
        type:String, required: function(){return this.securityQuestion ? true: false }
    },
    courses: [coueseSchema]
                // CourseName
                                //assignment -> [status: submitted
                                                 //grade: null]
                                                 //submission: 
})
const User = mongoose.model("User", userSchema);

// Strategy for Local Username and Password
passport.use(new LocalStrategy({ passReqToCallback: true },
  //Called when user is attempting to log in with local username and password. 
  //userId contains the email address entered into the form and password
  //contains the password entered into the form.
  async (req, userId, password, done) => {
    let thisUser;
    try {
      thisUser = await User.findOne({ id: userId });
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
  done(null, user.id);
});
  
  //Deserialize the current user from the session
  //to persistent storage.
passport.deserializeUser(async (userId, done) => {
  console.log("In deserializeUser.");
  console.log("Contents of userId param: " + userId);
  let thisUser;
  try {
    thisUser = await User.findOne({ id: userId });
    console.log("User with id " + userId +
      " found in DB. User object will be available in server routes as req.user.")
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
    secret: "osbleUser",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 }
  }))
  .use(express.static(path.join(__dirname, "client/build")))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json({ limit: '20mb' }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

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
    !req.body.hasOwnProperty("displayName") ||
    !req.body.hasOwnProperty("profilePicURL") ||
    !req.body.hasOwnProperty("securityQuestion") ||
    !req.body.hasOwnProperty("securityAnswer")) {
    //Body does not contain correct properties
    return res.status(400).send("/users POST request formulated incorrectly. " +
      "It must contain 'password','displayName','profilePicURL','securityQuestion' and 'securityAnswer fields in message body.")
  }
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (thisUser) { //account already exists
      res.status(400).send("There is already an account with email '" +
        req.params.userId + "'.");
    } else { //account available -- add to database
      thisUser = await new User({
        id: req.params.userId,
        password: req.body.password,
        displayName: req.body.displayName,
        authStrategy: 'local',
        profilePicURL: req.body.profilePicURL,
        securityQuestion: req.body.securityQuestion,
        securityAnswer: req.body.securityAnswer,
        courses: []
      }).save();
      return res.status(201).send("New account for '" +
        req.params.userId + "' successfully created.");
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