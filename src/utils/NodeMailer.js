import nodemailer from "nodemailer"



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
 });


 const sendVerificationEmail = async (email) => {
    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: "A new assignment uploaded ..!!!",
        text: `A new assignment has been added to your batch...!! Please complete it as early as possible :))`,
    };

    await transporter.sendMail(mailOptions);
};



export {sendVerificationEmail};