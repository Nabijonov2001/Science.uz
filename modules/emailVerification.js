const nodemailer = require("nodemailer");

 function sendEmail() {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'fazliddinnabijonov6@gmailcom', 
      pass: 'fazliddin2202',
    },
  });

   transporter.sendMail({
    from: '"Assalomu alaykum!"', 
    to: "fazliddinnabijonov6@gmail.com",
    subject: "Test subject", 
    text: "Hello world?",
    html: "<b>Hello world?</b>", 
  }, (err, info)=>{
      if(err){
          console.log(err)
      }else{
          console.log('Email jo`natildi')
      }
  });

 
}

sendEmail()