
const courseSchema = new Schema({
    courseName: String, // unique identifier
    post: [],
    userType: String,
    Assignments: []
    //listofUsers:{userType: Student: names
    //                        Instructor: names}
})

