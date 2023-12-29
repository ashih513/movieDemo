const fs = require("fs");
const path = require("path");
const { join } = require('node:path');
const { mkdir } = require('node:fs/promises');

exports.uploadImageArr = async (req, res) => {
    try {
        const fileNames = new Array();
        if (!req.files) {
            return res.send({ 'status': false, 'message': { 'file': "not found!", 'error': 'please select a valid file' } });
        }
        
        var files = req.files.tempImage;
        if (Array.isArray(files)) {
            for (const key in files) {
                if (Object.hasOwnProperty.call(files, key)) {
                    const pImage = files[key];
                    var ext = pImage.name.substring(pImage.name.lastIndexOf(".") + 1);
                    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
                        return res.send({ 'status': false, 'message': { 'file': pImage.name, 'error': 'only jpeg,jpg & png type image supported' } });
                    }
                    const uploadDir = path.join(__dirname, "../../public/tempUploads");
                    await mkdir(uploadDir, { recursive: true });
                    const now_time = Date.now();
                    console.log(pImage);
                    const tempImageName = now_time + "___" + pImage.name;
                    const imagePath = uploadDir + "/" + tempImageName;
                    await pImage.mv(imagePath);
                    // check file size
                    let imgInfo = fs.statSync(imagePath);
                    //  let fileSize = imgInfo.size;
                    let fileSizeMB = imgInfo.size / (1024 * 1024);
                    if (fileSizeMB > 5) {
                        return res.send({ 'status': false, 'message': { 'file': pImage.name, 'error': 'file size is greator then 5 mb' } });
                    } else {
                        fileNames.push(tempImageName);
                    }
                }
            }
        } else {
            const pImage = files;
            var ext = pImage.name.substring(pImage.name.lastIndexOf(".") + 1);
            if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
                return res.send({ 'status': false, 'message': { 'file': pImage.name, 'error': 'only jpeg,jpg & png type image supported' } });
            }

            const uploadDir = path.join(__dirname, "../../public/tempUploads");
            await mkdir(uploadDir, { recursive: true });
            const now_time = Date.now();
            const tempImageName = now_time + "___" + pImage.name;
            const imagePath = uploadDir + "/" + tempImageName;
            await pImage.mv(imagePath);

            // check file size
            let imgInfo = fs.statSync(imagePath);
            //  let fileSize = imgInfo.size;
            let fileSizeMB = imgInfo.size / (1024 * 1024);
            if (fileSizeMB > 5) {
                return res.send({ 'status': false, 'message': { 'file': pImage.name, 'error': 'file size is greator then 5 mb' } });

            } else {
                fileNames.push(tempImageName);
            }
        }
        return res.send({ 'status': true, 'files': fileNames });
    } catch (error) {
        return res.send({ 'status': false, 'message': error });
    }
}