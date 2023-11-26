const express = require('express');
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer')
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const Mailgen  = require('mailgen'); // Import Mailgen
const cors = require('cors'); 
require('dotenv').config();

const app = express();

// Create a write stream for logging
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use morgan middleware for request logging
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :date[web] - :remote-addr - :req[body]', { stream: accessLogStream }));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :date[web] - :remote-addr - :req[body]')); // Log to console


// Use cors middleware with specific configurations
app.use(cors({
  origin: process.env.URL_ORIGIN,
  methods: ['POST', 'GET', 'OPTIONS'], // Add other allowed methods as needed
  allowedHeaders: ['Content-Type'], // Add other allowed headers as needed
}));

app.use(express.json());


// Transporter for SendGrid
const transporter_sg = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Transporter for Gmail
const transporter_gm = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_TOKEN,
  },
});

// Create a Mailgen instance
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Isaac A. Rivera',
    link: process.env.URL_ORIGIN,
    // Add more product information if needed
  },
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text, name, email, phone, message } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Generate HTML email using Mailgen
  const emailBody = mailGenerator.generate({
    body: {
      intro: 'You Have A New Potential Customer',
      table: {
        data: [
          { name: 'Name', name },
          { name: 'Email', email },
          { name: 'Phone', phone },
          { name: 'Message', message },
        ],
      },
      outro: 'Thank you for reaching out!',
    },
  });

  const emailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html: emailBody,
  };

  try {
    const info = await transporter_gm.sendMail(emailOptions);
    res.json({ success: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(process.env.PORT , '0.0.0.0', () => {
  console.log(`Server is running on ${process.env.URL_ORIGIN}:${process.env.PORT}`);
});
