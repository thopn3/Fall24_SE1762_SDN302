const mongoose = require("mongoose");
const Department = require("./models/department.model");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/SE1762_Mongoose");

connect.then((db) => {
    const newDepart = new Department({name: "IT", description: "Information Technology"});
    newDepart.save();
}).catch(console.error);