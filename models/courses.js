const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
	Courses: { type: String, required: true, unique: true },
	Duration: { type: String, required: true },
	Fees: { type: String, required: true },
    Examination: { type: String, required: true },
});

module.exports = mongoose.model("Courses", CoursesSchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CoursesSchema = new Schema({

//     Courses: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     Duration: {
//         type: String,
//         required: true,
        
//     },

//     Fees: {
//         type: String,
//         required: true,
        
//     },
//     Examination: {
//         type: String,
//         required: true,
        
//     },

// })
// const Courses = mongoose.model("Courses", CoursesSchema);
// module.exports = { Courses, CoursesSchema };
