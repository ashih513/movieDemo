const AdminService = require("../../services/admin/Admin.service");
const jwt = require("jsonwebtoken");
const secretkey = "secret key";
const LoginValidation = require('../../validation/admin/login.validation');
const SendMail = require("../../helper/EmailSend");
const path = require("path");
const { join } = require('node:path');
const { mkdir } = require('node:fs/promises');


exports.index = async (req, res) => {
    let resData = await AdminService.index();
    return res.send(resData);
}

exports.login = async (req, res) => {


    try {

        // validtion input
        let validation = await LoginValidation(req.body);
        if (validation.fails()) {
            return res.status(200).send({ status: false, message: validation.errors });
        }

        // get user 
        let resData = await AdminService.login(req.body);
        if (resData == undefined || resData == "") return res.send({ 'status': false, 'message': "Not a valid credentials !" });


        // generate api token
        const token = jwt.sign({ resData }, secretkey);
        resData.token = token;

        // update token api access to 20 sec
        // await AdminService.updateUser( resData?.id, {"token_expire_in":Helper.generateTime("s", 20)});

        return res.send({ 'status': true, 'message': "Welcome " + resData?.name, 'data': resData });

    } catch (error) {
        return res.send({ 'status': false, 'message': error });
    }
}

exports.profile = (req, res) => {

    const response = req.auth;
   // response.restaurant_logo = Config.baseUrl + "restaurantImage/" + response.restaurant_logo;

    return res.send({ 'status': true, 'message': response });
}

 
exports.uploadImage = async (req, res) => {
    try {

        console.log(req.body)
        console.log(req.files);
        var pImage = req.files.pfImage;

        const uploadDir = path.join(__dirname, "../public/uploads");

        console.log("Is directory ");
        console.log(uploadDir.isDirectory);

        const createDir = await mkdir(uploadDir, { recursive: true });
        console.log(`created ${createDir}`);


        const imagePath = uploadDir + "/" + pImage.name;

        await pImage.mv(imagePath);

        return res.send({ 'status': true, 'message': imagePath });
    } catch (error) {
        console.log(`error`, error)
        return res.send({ 'status': false, 'message': error });
    }
}
