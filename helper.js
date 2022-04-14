const nodemailer = require("nodemailer")

helperClass = {
  // [ Mailer Section ]
  async mailer(req, res, option){
    try{
      console.log("mail HAs Been Called")
      
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS : true,
          auth: {
            user: "handsfreesurvey@gmail.com", 
            pass: "hands,Free,Survey,@3399",
          },
        });

        let mailOptions = {
          from: 'handsfreesurvey@gmail.com', 
          to: option.to, 
          subject: option.subject, 
          text: option.message, 
          // html: "<b>Helloooooooo world?</b>", 
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err,info)=>{
          if (err) {console.log("error in sending Mail : ",err)
          }else{
            console.log("MAil Sent Successfully !1 : ",info)
            // res.send("Mail Sent Successfully")
          }
        });

  }catch(error){
      console.log("Error in Model sendemail GET : ",error)
   }
  }

  }

  module.exports = helperClass;