const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.EMAIL_USR,
        pass: process.env.EMAIL_PASS
  }
})

module.exports = {
    sendNow: function(to, template, taskDetails){
        const { title, description, priority, createdBy } = taskDetails
        let { assignedTo } = taskDetails
        assignedToName = assignedTo.split("@")[0]

        if(assignedToName === "Anyone"){
          assignedToName = "Everyone"
        }

        let createNew = `
        Hey ${assignedToName},
        
        A new Task has been created and assigned to you - ${title}.
        
        DESCRIPTION: ${description}

        CREATED BY: ${createdBy} 

        PRIORITY: ${priority}

        ---------------------

        Please login to view the task within your browser - https://tasks.jollyit.co.uk
        `

        var mailOptions = {
            from: process.env.EMAIL_USR,
            to: assignedTo,
            subject: `New Task - ${title}`,
            text: createNew
          };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}