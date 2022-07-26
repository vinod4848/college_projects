
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
	FullName: { type: String, required: true,}, 
	Email: { type: String, required: true, unique: true },
    Phone: { type: String, required: true, unique: true },
    FatherName: { type: String, required: true },
    MotherName: { type: String, required: true },
    Gender: { type: String,required: true },
    Address: { type: String, required: true },
    Courses: { type: String, required: true },
    AdmissionDate: { type: String, required: true },
    CollegeId:{ type: mongoose.Schema.Types.ObjectId,required: true, ref: "College"}

});
module.exports = mongoose.model("Student", StudentSchema);



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const StudentSchema = new Schema({
//     FullName: {
//         type: String,
//         required: true,
//     },
//     Phone: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     Email: {
//         type: String,
//         required: true,
//         unique: true,
//     },

//     FatherName: {
//         type: String,
//         required: true,

//     },
//     MotherName: {
//         type: String,
//         required: true,

//     },
//     Gender: {
//         type: String,
//         enum: ['Male', 'female', 'transgender'],
//         required: true,

//     },
//     Addres: {
//         type: String,
//         required: true,

//     },
//     Courses: {
//         type: String,
//         required: true,

//     },
//     AdmissionDate: {
//         type: String,
//         required: true,
//     },
//     CollegeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "College",
//     },
    
// })



// const Student = mongoose.model("Student", StudentSchema);
// module.exports = { Student, StudentSchema };
