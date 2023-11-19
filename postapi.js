import React, { useState } from 'react';
import axios from 'axios'; // Assuming axios is installed

const NewMessageForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');

  const sendMessage = async (toAddress, messageSubject, text) => {
    try {
      const response = await axios.post('https://api.postmarkapp.com/email', {
        From: 'ee21btech11045@iith.ac.in', // Your verified sender email address in Postmark
        To: toAddress,
        Subject: messageSubject,
        TextBody: text,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': '690aa8be-95ba-4417-9473-f99056b16f64',
        },
      });

      console.log('Message sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    try {
      await sendMessage(to, subject, messageText);
      // Handle success - close modal, show confirmation, etc.
      console.log('Message sent successfully!');
      // Reset form fields after sending message
      setTo('');
      setSubject('');
      setMessageText('');
    } catch (error) {
      // Handle error - show error message, log, etc.
      console.error('Failed to send message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        required
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Message"
        required
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
};

export default NewMessageForm;
