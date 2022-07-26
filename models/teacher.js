
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
	Email: { type: String, required: true, unique: true },
    Phone: { type: String, required: true, unique: true },
    FullName: { type: String, required: true,},
    FatherName: { type: String, required: true },
    MotherName: { type: String, required: true },
    Gender: { type: String, required: true },
    Address: { type: String, required: true },
    Subject: { type: String, required: true },
    JoinDate: { type: String, required: true },

});
module.exports = mongoose.model("Teacher", TeacherSchema);


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const TeachersSchema = new Schema({
   
   
//      FullName: {
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
//     Addres: {
//         type: String,
//         required: true,

//     },
//     Subject: {
//         type: String,
//         required: true,

//     },
//     JoinDate: {
//         type: String,
//         required: true,

//     },

  

   
// })

// const Teachers = mongoose.model("Teachers", TeachersSchema);
// module.exports = { Teachers, TeachersSchema };
