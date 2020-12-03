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
    post: [],
    instructor: String,
    Assignments: []
                
})

const courseHomeSchema = new Schema({
    post: { type: String, minlength: 1, maxlength: 520}
    //need reply post data?
})