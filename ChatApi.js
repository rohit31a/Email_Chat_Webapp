const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // port of backend server is running on

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, description } = req.body;

  const apiKey = 'YOUR_ELASTIC_EMAIL_API_KEY';
  const apiUrl = 'https://api.elasticemail.com/v2/email/send';

  const emailData = {
    apiKey,
    subject,
    from: 'sender@example.com',
    to,
    bodyHtml: description,
    isTransactional: true, // Set to true for transactional emails
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log('Email sent:', result);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
