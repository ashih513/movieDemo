const crypto = require('crypto');
const path = require("path");
const { join } = require('node:path');
const { mkdir } = require('node:fs/promises');
const jetpack = require("fs-jetpack");

const fs = require("fs");
const salt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Helper = {};

Helper.generateTime = (type, time) => {
    var d1 = new Date(),
        d2 = new Date(d1);

    if (type == "m") d2.setMinutes(d1.getMinutes() + time);
    else d2.setSeconds(d1.getSeconds() + time);

    return Date.parse(d2);

};

// for converting { name:"ritesh"} to sql query string (name="ritesh")
// Object length find : Object.keys(uData).length;
Helper.objectToString = (uData) => {
    var arrayString = [];
    for (const key in uData) {
        if (uData.hasOwnProperty(key)) {
            const element = uData[key];
            arrayString.push(`${key} = '${element}'`);
        }
    }
    return arrayString.join(", ");
};

Helper.createPassword = (password) => {
    // Hashing user's salt and password with 1000 iterations,64 length and sha512 digest
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

Helper.verifyPassword = function (password, HashPassword) {
    var NewHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return NewHash === HashPassword ? true : false;
};

Helper.imageMoveToReal = async function (tmpImage,) {

    const uploadDir = path.join(__dirname, "../public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const now_time = Date.now();

    const tempImageName = now_time + "___" + pImage.name;

    const imagePath = uploadDir + "/" + tempImageName;

    await pImage.mv(imagePath);

    res.send({ 'status': true, 'path': tempImageName });

}

Helper.moveFileFromFolder = async (filename, targetFolder) => {
    let desPath = '';
    const uploadDirFile = path.join(__dirname, "../public/tempUploads/" + filename);
    const uploadfilePath = path.join(__dirname, "../public/" + targetFolder);
    console.log(uploadfilePath);
    if (fs.existsSync(uploadfilePath)) {
        desPath = uploadfilePath;
    } else {
        desPath = path.join(__dirname, "../../public/" + targetFolder);
        await mkdir(desPath, { recursive: true });
    }
    if (fs.existsSync(uploadDirFile)) {
        const src = jetpack.cwd("public/tempUploads");
        const dst = jetpack.cwd("public/" + targetFolder);
        src.find({ matching: filename }).forEach(desPath => {
            src.move(desPath, dst.path(desPath));
        });
    } 
}


Helper.checkFileSize = async (filename, actualFileName, maxSize) => {
    let imgInfo = fs.statSync(filename);
    //  let fileSize = imgInfo.size;
    let fileSizeMB = imgInfo.size / (1024 * 1024);
    if (fileSizeMB > maxSize)
        return res.send({ 'status': false, 'message': { 'file': actualFileName, 'error': 'file size is greator then 5 mb' } });
}
Helper.validationError = async (errors) => {
    let err_msg_all = "";
    let message = '';
    _.each(errors, (err_msg, key) => {
        error = true;
        message = key;
        err_msg_all = err_msg;
    });
    return message;

}

Helper.calcDist =async(lat1, lon1, lat2, lon2) =>
{
    var R = 6371e3; // R is earth’s radius
    var lat1radians = toRadians(lat1);
    var lat2radians = toRadians(lat2);
 
    var latRadians = toRadians(lat2-lat1);
    var lonRadians = toRadians(lon2-lon1);
 
    var a = Math.sin(latRadians/2) * Math.sin(latRadians/2) +
         Math.cos(lat1radians) * Math.cos(lat2radians) *
         Math.sin(lonRadians/2) * Math.sin(lonRadians/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 
    var d = R * c;
    return d;
    //console.log(d)
 }

function toRadians(val){
    var PI = 3.1415926535;
    return val / 180.0 * PI;
}



module.exports = Helper;