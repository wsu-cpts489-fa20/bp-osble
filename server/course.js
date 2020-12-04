const { Schema } = require("mongoose");
const nodemon = require("nodemon");
const { t } = require("testcafe");


const courseSettingsSchema = new Schema({
    prefix: { type: String, required: true },
    courseNumber: { type: Number, required: true },
    courseName: { type: String, require: true },
    courseTerm: { type: String, required: true },
    courseYear: { type: Number, required: true },
    courseStartDate: { type: Number, required: true },
    courseEndDate: { type: Number, required: true },
    timeZone: { type: String, required: true },
    instructor: {type: String, required: true }

    /* post: [],
    instructor: String,
    Assignments: [] */
                
})

//Schema for the home page of the course
const courseHomeSchema = new Schema({
    post: { type: String, minlength: 1, maxlength: 520},
    files: { type: File, },
    classNotification: {type: String, minlength: 1, maxlength: 520}
    //need reply post data?
})

//Schema for course assignements
const courseAssignmentSchema = new Schema({
    assignmentFiles: { type: File },
    dueDate: { type: Number },
    submissionFiles: { type: FileReader }
})

//Schema for grades of students in course
const courseGrades = new Schema({
    points: { type: Number },
    student: { type: String },
    studentID: { type: Number }
})