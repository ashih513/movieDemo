const mongoose = require('mongoose')
require('dotenv').config()
const Helper = require("../helper/Helper")

const url = process.env.MONGODB_URL;

const dbName = process.env.MONGODB_NAME;
console.log("process.env.MONGODB_URL", url + dbName)

const AdminModel = require("../model/Admin.model");

mongoose.connect(url + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
mongoose.connection.on('error', err => {
    console.log('not connected')
});
mongoose.connection.on('connected', async (err) => {
    // console.log('connected')

    const alreadyExist = await AdminModel.find({ email: "admin@gmail.com" });

    if (alreadyExist == "" || alreadyExist == undefined) {
        const newAdmin = new AdminModel({
            id: 1,
            name: "Admin",
            email: "admin@gmail.com",
            password: Helper.createPassword("password"),
            token: "",
            status: "active"
        });
        newAdmin.save();
    }

});


module.exports = mongoose; 