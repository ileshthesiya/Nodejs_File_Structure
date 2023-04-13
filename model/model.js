const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstname: { type: String, required: true, },
    lastname: { type: String, required: true, },
    email: { type: String, required: true },
    password: { type: String, required: true, },
    confirmPassword: { type: String, require: true },
    mobilenumber: { type: String, required: true, },
    photo:{type:Array,require:true}
})
const admin = mongoose.model("admin", adminSchema);

module.exports = admin