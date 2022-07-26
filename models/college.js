const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
	CollegeName: { type: String, required: true},
	University: { type: String, required: true},
	Phone: { type: String, required: true, unique: true },
	CollegeCode: { type: String, required: true, unique: true },
	founder: { type: String, required: true },
	Principal: { type: String, required: true },
	Address: { type: String, required: true },
	ZipCode: { type: String, required: true },

});

module.exports = mongoose.model("College", CollegeSchema);


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CollegeSchema = new Schema({
	
// 	CollegeName:  {
// 		type: String,
// 		required: true,
// 		unique: true,		
// 	},
// 	University : {
// 		type: String,
// 		required: true,
// 		unique: true,
		
// 	},
//     founder : {
// 		type: String,
// 		required: true,
		
// 	},
//     Principal: {
// 		type: String,
// 		required: true,
		
// 	},
//     Phone: {
// 		type: String,
// 		required: true,
// 		unique: true,
		
// 	},
//     CollegeCode: {
// 		type: String,
// 		required: true,
// 		unique: true,
		
// 	},
//     Address: {
// 		type: String,
// 		required: true,
		
// 	},
//     ZipCode: {
// 		type: String,
// 		required: true,
		
// 	},
// })

// const College = mongoose.model("College", CollegeSchema);
// module.exports = { College, CollegeSchema };
