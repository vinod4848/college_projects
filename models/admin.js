const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	AdminName: { type: String, required: true, unique: true },
	Email: { type: String, required: true, unique: true },
	Password: { type: String, required: true },
	
});

module.exports = mongoose.model("Admin", AdminSchema);


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const AdminName = new Schema({

// 	AdminName: {
// 		type: String,
// 		required: true,
// 		unique: true,

// 	},
// 	Password: {
// 		type: String,
// 		required: true,

// 	},
// 	Email: {
// 		type: String,
// 		required: true,
// 		unique: true,

// 	},
// })

// const Admin = mongoose.model("Admin", AdminName);
// module.exports = { Admin, AdminName };

