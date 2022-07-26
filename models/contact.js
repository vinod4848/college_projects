const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    What_Can_We_Help_You: { type: String, required: true},
    Your_Name: { type: String, required: true },
    Email_Address: { type: String, required: true },
    Phone: { type: String, required: true },
    Subject: { type: String, required: true },
    Diteles: { type: String, required: true },

});

module.exports = mongoose.model("Contact", ContactSchema);