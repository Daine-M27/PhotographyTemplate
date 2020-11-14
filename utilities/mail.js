const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config({path: '.env'});

// if(dotenv.error){
//     console.log(dotenv.error)
// }
// console.log("env data :" + dotenv.parsed);

/**
 * 
 * @param {object} data
 * {
 * emailAddress: "email@address",
 * subject: "subject text",
 * text: "body text"
 * } 
 */
function sendEMail (data){
    return new Promise((resolve,reject) => {
       const transporter = nodemailer.createTransport({
           service:'gmail',
           auth: {
               user: process.env.USER_NAME,
               pass: process.env.PASSWORD
           }
       });

       const mailOptions = {
           from: process.env.USER_NAME,
           to: data.emailAddress,
           subject: data.subject,
           text: data.text
       };

       //console.log("mailOptions :" + process.env.USER_NAME)
       transporter.sendMail(mailOptions, (err, info) => {
           if(err){
               reject(err);
               //console.log(err)
           } else {
                resolve();   
            //console.log("Email send :" + info.respose)
           }
       })
    })
    
}

module.exports = sendEMail