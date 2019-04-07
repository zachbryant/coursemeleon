
const nodemailer = require("nodemailer");
//console.log(nodemailer)

// Generate an email service account for testing
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "effie.carroll@ethereal.email",
    pass: "rwFCVjrCNhsFcUxEFJ"
  }
});

// extend me! subject/text/html/to
let mailOptions = {
  from: '"Coursemeleon" <noreply@coursemeleon.com>'
};
// extend me! to/text/html attrs
let loginAnMailOptions = {
  ...mailOptions,
  subject: "There has been a change in the course you are enrolled in"
};

function sendLoginCode(email,flag) {
  if(flag==1){
 
  let options = {
    ...loginAnMailOptions,
    to: email,
    text: "New Annoucement has been made " ,
    html: "New Annoucement has been made "
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return process.exit(1);
    }
    if (info) {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    
  });
  }

  if(flag==2){
 
    let options = {
      ...loginAnMailOptions,
      to: email,
      text: "The course is name has been changed " ,
      html: "The course is name has been changed  "
    };
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        return process.exit(1);
      }
      if (info) {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
    });
    }
}

module.exports = {
  mailOptions,
  sendLoginCode
};
