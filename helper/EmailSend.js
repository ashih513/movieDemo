var mailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'ritesh@braintechnosys.com',
//         pass: 'Admin@987#BMW'
//     }
// });
let transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'ashish.php@braintechnosys.com',
        pass: 'ashish@123456'
    }
})

exports.sendRegisterMail = async (email) => {

    var mailOptions = {
        from: 'ritesh@braintechnosys.com',
        to: email,
        subject: 'Register Email using Node.js',
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    };


    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.warn(err);
        } else {
            console.warn('email test has been sent ', res.response);
        }
    })



}

exports.sendResetPasswordMail = async (email, subject, link) => {

    let extraInfo = {
        from: 'ashish.php@braintechnosys.com',
        to: email,
        subject: subject,
        html: `<button class=""><a href="${link}">Reset Password</a></button>`,
    }
    transporter.sendMail(extraInfo, function (err, res) {
        if (err) {
            console.warn(err);
        } else {
            console.warn('email test has been sent ', res.response);
        }
    })


}



