"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var LOCAL_PORT = 8081;
var DEPLOY_URL = "http://osble.us-west-2.elasticbeanstalk.com";
var PORT = process.env.HTTP_PORT || LOCAL_PORT;
var GithubStrategy = _passportGithub["default"].Strategy;
var LocalStrategy = _passportLocal["default"].Strategy;
var app = (0, _express["default"])(); //const server = require('./server')
//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////

var connectStr = process.env.MONGO_STR;

_mongoose["default"].connect(connectStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connected to ".concat(connectStr, "."));
}, function (err) {
  console.error("Error connecting to ".concat(connectStr, ": ").concat(err));
});

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  userid: String,
  //unique identifier for user
  password: String,
  email: String,
  first_name: String,
  last_name: String,
  school: String,
  is_instructor: Boolean,
  is_admin: Boolean
});
var gradeSchema = new Schema({
  userid: String,
  grade: Number
});
var assignmentSchema = new Schema({
  assignment_name: String,
  assignment_content: String,
  instructor: String,
  due_date: Number,
  grades: [gradeSchema] // each student will be:

});
var replySchema = new Schema({
  userid: String,
  reply_content: String
});
var postSchema = new Schema({
  userid: String,
  post_content: String,
  replies: [replySchema]
});
var courseSchema = new Schema({
  //use the _id field for identifying courses
  prefix: String,
  course_number: Number,
  course_name: String,
  term: String,
  year: Number,
  start_date: String,
  end_date: String,
  instructor: String,
  students: [],
  // just an array of userid's for easy access
  posts: [postSchema],
  assignments: [assignmentSchema]
});

var User = _mongoose["default"].model("User", userSchema);

var Course = _mongoose["default"].model("Course", courseSchema);

_passport["default"].use(new LocalStrategy({
  passReqToCallback: true
},
/*#__PURE__*/
//Called when user is attempting to log in with local username and password. 
//userId contains the email address entered into the form and password
//contains the password entered into the form.
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee(req, userId, password, done) {
    var thisUser;
    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.findOne({
              email: userId
            });

          case 3:
            thisUser = _context.sent;

            if (!thisUser) {
              _context.next = 13;
              break;
            }

            if (!(thisUser.password === password)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", done(null, thisUser));

          case 9:
            req.authError = "The password is incorrect. Please try again" + " or reset your password.";
            return _context.abrupt("return", done(null, false));

          case 11:
            _context.next = 15;
            break;

          case 13:
            //userId not found in DB
            req.authError = "There is no account with email " + userId + ". Please try again.";
            return _context.abrupt("return", done(null, false));

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}())); //Serialize the current user to the session


_passport["default"].serializeUser(function (user, done) {
  console.log("In serializeUser.");
  console.log("Contents of user param: " + JSON.stringify(user));
  done(null, user.email);
}); //Deserialize the current user from the session
//to persistent storage.


_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee2(userId, done) {
    var thisUser;
    return _regeneratorRuntime["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("In deserializeUser.");
            console.log("Contents of userId param: " + userId);
            _context2.prev = 2;
            _context2.next = 5;
            return User.findOne({
              email: userId
            });

          case 5:
            thisUser = _context2.sent;
            console.log("User with id " + userId + " found in DB. User object will be available in server routes as req.user.");
            console.log(thisUser);
            done(null, thisUser);
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            done(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()); //////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////


app.use((0, _expressSession["default"])({
  secret: "speedgolf",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60
  }
})).use(_express["default"]["static"](_path["default"].join(__dirname, "client/build"))).use(_passport["default"].initialize()).use(_passport["default"].session()).use(_express["default"].json({
  limit: '20mb'
})).listen(PORT, function () {
  return console.log("Listening on ".concat(PORT));
}); //////////////////////////////////////////////////////////////////////////
//DEFINE EXPRESS APP ROUTES
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////
//USER ACCOUNT MANAGEMENT ROUTES
////////////////////////////////
//READ user route: Retrieves the user with the specified userId from users collection (GET)

app.get('/users/:userId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee3(req, res, next) {
    var thisUser;
    return _regeneratorRuntime["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("in /users route (GET) with userId = " + JSON.stringify(req.params.userId));
            _context3.prev = 1;
            _context3.next = 4;
            return User.findOne({
              id: req.params.userId
            });

          case 4:
            thisUser = _context3.sent;

            if (thisUser) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(404).send("No user account with id " + req.params.userId + " was found in database."));

          case 9:
            return _context3.abrupt("return", res.status(200).json(JSON.stringify(thisUser)));

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log();
            return _context3.abrupt("return", res.status(400).send("Unexpected error occurred when looking up user with id " + req.params.userId + " in database: " + _context3.t0));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}()); //READ user route: Retrieves the user with the specified userId from users collection (GET)

app.get('/users/', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee4(req, res, next) {
    var thisUser;
    return _regeneratorRuntime["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("in /users route (GET ALL) with userId = " + JSON.stringify(req.params.userId));
            _context4.prev = 1;
            _context4.next = 4;
            return User.find({
              id: req.params.userId
            });

          case 4:
            thisUser = _context4.sent;

            if (thisUser) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).send("No user account with id " + req.params.userId + " was found in database."));

          case 9:
            return _context4.abrupt("return", res.status(200).json(JSON.stringify(thisUser)));

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log();
            return _context4.abrupt("return", res.status(400).send("Unexpected error occurred when looking up user with id " + req.params.userId + " in database: " + _context4.t0));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}()); //CREATE user route: Adds a new user account to the users collection (POST)

app.post('/users/:userId', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee5(req, res, next) {
    var thisUser;
    return _regeneratorRuntime["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("in /users route (POST) with params = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (!(req.body === undefined || !req.body.hasOwnProperty("password") || !req.body.hasOwnProperty("first_name") || !req.body.hasOwnProperty("last_name") || !req.body.hasOwnProperty("school"))) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send("/users POST request formulated incorrectly. " + "It must contain 'password','displayName','profilePicURL','securityQuestion' and 'securityAnswer fields in message body."));

          case 3:
            _context5.prev = 3;
            _context5.next = 6;
            return User.findOne({
              id: req.params.userId
            });

          case 6:
            thisUser = _context5.sent;
            console.log("In POST -> userId :" + req.params.userId);
            console.log("In POST -> User :" + thisUser);

            if (!thisUser) {
              _context5.next = 13;
              break;
            }

            //account already exists
            res.status(400).send("There is already an account with email '" + req.params.userId + "'.");
            _context5.next = 17;
            break;

          case 13:
            _context5.next = 15;
            return new User({
              userid: req.body.userid,
              password: req.body.password,
              email: req.body.email,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              school: req.body.school,
              is_instructor: req.body.is_instructor,
              // this will be variable later
              is_admin: req.body.is_admin
            }).save();

          case 15:
            thisUser = _context5.sent;
            return _context5.abrupt("return", res.status(201).send("New account for '" + req.params.id + "' successfully created."));

          case 17:
            _context5.next = 22;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](3);
            return _context5.abrupt("return", res.status(400).send("Unexpected error occurred when adding or looking up user in database. " + _context5.t0));

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 19]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
app.put('/users/:userId', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee6(req, res, next) {
    var validProps, bodyProp, status;
    return _regeneratorRuntime["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("in /users update route (PUT) with userId = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (req.params.hasOwnProperty("userId")) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).send("users/ PUT request formulated incorrectly." + "It must contain 'userId' as parameter."));

          case 3:
            validProps = ['userid', 'email', 'password', 'first_name', 'last_name', 'school', 'is_instructor', 'is_admin'];
            _context6.t0 = _regeneratorRuntime["default"].keys(req.body);

          case 5:
            if ((_context6.t1 = _context6.t0()).done) {
              _context6.next = 11;
              break;
            }

            bodyProp = _context6.t1.value;

            if (validProps.includes(bodyProp)) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).send("users/ PUT request formulated incorrectly." + "Only the following props are allowed in body: " + "'userid', 'email', 'password','first_name','last_name'," + "'school', 'is_instructor','is_admin'"));

          case 9:
            _context6.next = 5;
            break;

          case 11:
            _context6.prev = 11;
            _context6.next = 14;
            return User.updateMany({
              _id: {
                $in: [req.params.userId]
              }
            }, {
              $set: req.body
            });

          case 14:
            status = _context6.sent;

            if (status.nModified != 1) {
              //account could not be found
              res.status(404).send("No user account " + req.params.userId + " exists. Account could not be updated.");
            } else {
              res.status(200).send("User account " + req.params.userId + " successfully updated.");
            }

            _context6.next = 21;
            break;

          case 18:
            _context6.prev = 18;
            _context6.t2 = _context6["catch"](11);
            res.status(400).send("Unexpected error occurred when updating user data in database: " + _context6.t2);

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[11, 18]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}()); //DELETE user route: Deletes the document with the specified userId from users collection (DELETE)

app["delete"]('/users/:userId', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee7(req, res, next) {
    var status;
    return _regeneratorRuntime["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("in /users route (DELETE) with userId = " + JSON.stringify(req.params.userId));
            _context7.prev = 1;
            _context7.next = 4;
            return User.deleteOne({
              id: req.params.userId
            });

          case 4:
            status = _context7.sent;

            if (!(status.deletedCount != 1)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(404).send("No user account " + req.params.userId + " was found. Account could not be deleted."));

          case 9:
            return _context7.abrupt("return", res.status(200).send("User account " + req.params.userId + " was successfully deleted."));

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log();
            return _context7.abrupt("return", res.status(400).send("Unexpected error occurred when attempting to delete user account with id " + req.params.userId + ": " + _context7.t0));

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}()); ///////////////////////
//AUTHENTICATION ROUTES
///////////////////////
//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.

app.get('/auth/logout', function (req, res) {
  console.log('/auth/logout reached. Logging out');
  req.logout();
  res.redirect('/');
}); //TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.

app.get('/auth/test', function (req, res) {
  console.log("auth/test reached.");
  console.log(req.user);
  var isAuth = req.isAuthenticated();

  if (isAuth) {
    console.log("User is authenticated");
    console.log("User record tied to session: " + JSON.stringify(req.user));
  } else {
    //User is not authenticated
    console.log("User is not authenticated");
  } //Return JSON object to client with results.


  res.json({
    isAuthenticated: isAuth,
    user: req.user
  });
}); //LOGIN route: Attempts to log in user using local strategy

app.post('/auth/login', _passport["default"].authenticate('local', {
  failWithError: true
}), function (req, res) {
  console.log("/login route reached: successful authentication."); //Redirect to app's main page; the /auth/test route should return true

  res.status(200).send("Login successful");
}, function (err, req, res, next) {
  console.log("/login route reached: unsuccessful authentication");

  if (req.authError) {
    console.log("req.authError: " + req.authError);
    res.status(401).send(req.authError);
  } else {
    res.status(401).send("Unexpected error occurred when attempting to authenticate. Please try again.");
  } //Note: Do NOT redirect! Client will take over.

}); ////////////////////////////////
//COURSE ROUTES
///////////////////////////////
//READ course route: Retrieves the course with the specified course_name from courses collection (GET)

app.get('/courses/', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee8(req, res, next) {
    var thisCourse;
    return _regeneratorRuntime["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log("in /courses route (GET) with name = " + JSON.stringify(req.params.course_name));
            _context8.prev = 1;
            _context8.next = 4;
            return Course.find({
              id: req.params.course_name
            });

          case 4:
            thisCourse = _context8.sent;

            if (thisCourse) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt("return", res.status(404).send("No course named " + req.params.course_name + " was found in database."));

          case 9:
            return _context8.abrupt("return", res.status(200).json(JSON.stringify(thisCourse)));

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log();
            return _context8.abrupt("return", res.status(400).send("Unexpected error occurred when looking up course with name " + req.params.course_name + " in database: " + _context8.t0));

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}()); //CREATE user route: Adds a new course to courses collection (POST)

app.post('/courses/:course_name', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee9(req, res, next) {
    var thisCourse;
    return _regeneratorRuntime["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log("in /courses route (POST) with params = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (!(req.body === undefined || !req.body.hasOwnProperty("prefix") || !req.body.hasOwnProperty("course_number") || !req.body.hasOwnProperty("course_name") || !req.body.hasOwnProperty("term") || !req.body.hasOwnProperty("year") || !req.body.hasOwnProperty("start_date") || !req.body.hasOwnProperty("end_date") || !req.body.hasOwnProperty("instructor") || !req.body.hasOwnProperty("students") || !req.body.hasOwnProperty("posts") || !req.body.hasOwnProperty("assignments"))) {
              _context9.next = 3;
              break;
            }

            return _context9.abrupt("return", res.status(400).send("/courses POST request formulated incorrectly. " + "It must contain 'prefix','course_number','course_name','term','year','start_date','end_date','instructor'," + "'students','posts' and 'assignments fields in message body."));

          case 3:
            _context9.prev = 3;
            _context9.next = 6;
            return Course.findOne({
              course_name: req.params.course_name
            });

          case 6:
            thisCourse = _context9.sent;
            console.log(thisCourse);

            if (!thisCourse) {
              _context9.next = 12;
              break;
            }

            //account already exists
            res.status(400).send("There is already a course with the name '" + req.params.course_name + "'.");
            _context9.next = 16;
            break;

          case 12:
            _context9.next = 14;
            return new Course({
              prefix: req.body.prefix,
              course_number: req.body.course_number,
              course_name: req.body.course_name,
              term: req.body.term,
              year: req.body.year,
              start_date: req.body.start_date,
              end_date: req.body.end_date,
              instructor: req.body.instructor,
              students: req.body.students,
              posts: req.body.posts,
              assignments: req.body.assignments
            }).save();

          case 14:
            thisCourse = _context9.sent;
            return _context9.abrupt("return", res.status(201).send("This course '" + req.params.course_name + "' was successfully created."));

          case 16:
            _context9.next = 21;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](3);
            return _context9.abrupt("return", res.status(400).send("Unexpected error occurred when adding or looking up course in database. " + _context9.t0));

          case 21:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[3, 18]]);
  }));

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}()); //UPDATE user route: Updates a new user account in the users collection (POST)

app.put('/courses/:course_name', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee10(req, res, next) {
    var validProps, bodyProp, status;
    return _regeneratorRuntime["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            console.log("in /course update route (PUT) with course name = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (req.params.hasOwnProperty("course_name")) {
              _context10.next = 3;
              break;
            }

            return _context10.abrupt("return", res.status(400).send("courses/ PUT request formulated incorrectly." + "It must contain 'userId' as parameter."));

          case 3:
            validProps = ['prefix', 'course_number', 'course_name', 'term', 'year', 'start_date', 'end_date', 'instructor', 'students', 'posts', 'assignments'];
            _context10.t0 = _regeneratorRuntime["default"].keys(req.body);

          case 5:
            if ((_context10.t1 = _context10.t0()).done) {
              _context10.next = 11;
              break;
            }

            bodyProp = _context10.t1.value;

            if (validProps.includes(bodyProp)) {
              _context10.next = 9;
              break;
            }

            return _context10.abrupt("return", res.status(400).send("courses/ PUT request formulated incorrectly." + "Only the following props are allowed in body: " + "'prefix','course_number','course_name','term','year','start_date','end_date', 'instructor', 'students', 'posts', 'assignments'"));

          case 9:
            _context10.next = 5;
            break;

          case 11:
            _context10.prev = 11;
            _context10.next = 14;
            return Course.updateOne({
              course_name: req.params.course_name
            }, {
              $set: req.body
            });

          case 14:
            status = _context10.sent;

            if (status.nModified != 1) {
              //account could not be found
              res.status(404).send("Course " + req.params.course_name + " does not exists. Course could not be updated.");
            } else {
              res.status(200).send("Course " + req.params.course_name + " successfully updated.");
            }

            _context10.next = 21;
            break;

          case 18:
            _context10.prev = 18;
            _context10.t2 = _context10["catch"](11);
            res.status(400).send("Unexpected error occurred when updating course data in database: " + _context10.t2);

          case 21:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[11, 18]]);
  }));

  return function (_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}()); //DELETE user route: Deletes the document with the specified userId from users collection (DELETE)

app["delete"]('/courses/:course_name', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee11(req, res, next) {
    var status;
    return _regeneratorRuntime["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            console.log("in /courses route (DELETE) with course name = " + JSON.stringify(req.params.course_name));
            _context11.prev = 1;
            _context11.next = 4;
            return Course.deleteOne({
              course_name: req.params.course_name
            });

          case 4:
            status = _context11.sent;

            if (!(status.deletedCount != 1)) {
              _context11.next = 9;
              break;
            }

            return _context11.abrupt("return", res.status(404).send("No course " + req.params.course_name + " was found. Course could not be deleted."));

          case 9:
            return _context11.abrupt("return", res.status(200).send("The course " + req.params.course_name + " was successfully deleted."));

          case 10:
            _context11.next = 16;
            break;

          case 12:
            _context11.prev = 12;
            _context11.t0 = _context11["catch"](1);
            console.log();
            return _context11.abrupt("return", res.status(400).send("Unexpected error occurred when attempting to delete  " + req.params.course_name + ": " + _context11.t0));

          case 16:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 12]]);
  }));

  return function (_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}());
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
