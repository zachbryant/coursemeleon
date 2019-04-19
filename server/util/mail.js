const nodemailer = require("nodemailer");

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
let loginMailOptions = {
  ...mailOptions,
  subject: "🦎 Coursemeleon login code"
};

function sendLoginCode(email, code) {
  let options = {
    ...loginMailOptions,
    to: email,
    text: "Your temporary login code is: " + code,
    html: "Your temporary login code is: <b>" + code + "</b>"
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

function sendAnnouncement(email, course, announcement) {
  let options = {
    ...loginMailOptions,
    to: email,
    html:
      "<h1>New announcement from " +
      course.course_name +
      ":</h1><p>" +
      announcement +
      "</p>"
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return process.exit(1);
    }
    if (info) {
      console.log("Announcement sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
}

module.exports = {
  mailOptions,
  sendLoginCode
};
