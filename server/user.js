const { Schema } = require("mongoose");
const nodemon = require("nodemon");




const userSchema = new Schema({
    id: String, // unique identifier
    password: String,
    userType: String,
    displayName: String,
    profilePicURL: String, //link to profile image
    email: String,
    courses: []
                // CourseName
                                //assignment -> [status: submitted
                                                 //grade: null]
                                                 //submission: 
})




