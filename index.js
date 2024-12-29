const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// const transporter = nodemailer.createTransport({
//     service: "gmail", 
//     auth: {
//       user: "your-email@gmail.com", 
//       pass: "your-email-password", 
//     },
//   });

  const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "ivatmover1@gmail.com",
      pass: "cjck hdqb oyxp cged",
    },
  });
  
  app.post("/send-email", async (req, res) => {
    const { username, email, phone, companyName } = req.body;
  
    const mailOptions = {
      from: email,
      to: "ajikyasharma24@gmail.com",
      subject: "New Form Submission",
      text: `Name: ${username}\nEmail: ${email}\nPhone: ${phone}\nCompany Name: ${companyName}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email." });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
