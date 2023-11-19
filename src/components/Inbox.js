import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Message = ({ username, message, time, selected, starred, onSelectionChange, onStarClick }) => {
    return (
      <div className={`message ${selected ? 'selected' : ''}`} onClick={() => onSelectionChange()}>
        <div className="message-header">
          <input type="checkbox" className='checkbox' checked={selected} readOnly />
          <div className="star" onClick={(e) => {e.stopPropagation(); onStarClick();}}>
            {starred ? (
              <span role="img" aria-label="star">⭐️</span>
            ) : (
              <span role="img" aria-label="unstar">☆</span>
            )}
          </div>
          <span className="username">{username}</span>
          <span className="time">{time}</span>
        </div>
        <div className="message-body">
          <p>{message}</p>
        </div>
      </div>
    );
  };
  

const NewMessageForm = ({ show, handleClose }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = async (e) => {
        const messageData = {
          SecureToken: '0704be88-6e22-4edf-bb52-0be50dad8f11',
          To: 'ee21btech11045@iith.ac.in',
          From: 'rohitkumarsharma52@gmail.com',
          Subject: 'This is the subject',
          Body: 'And this is the body',
        };
      
        try {
          const response = await fetch('http://localhost:3001/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
      
          if (response.ok) {
            // Email sent successfully
            handleClose();
            console.log('Email sent!')
          } else {
            // Handle error scenarios
            console.error('Failed to send email');
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="toField">
            <Form.Label>To:</Form.Label>
            <Form.Control type="text" value={to} onChange={(e) => setTo(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="subjectField">
            <Form.Label>Subject:</Form.Label>
            <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="descriptionField">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Inbox = () => {
  const [messages, setMessages] = useState([
    { id: 1, username: 'Anand', message: 'HI there bro', time: '2:00 AM', selected: false, starred: false },
    { id: 1, username: 'Rohit', message: 'Namaskaram', time: '10:20 AM', selected: false, starred: false },
    { id: 1, username: 'Dibs', message: 'Wassupp!!  ', time: '10:30 AM', selected: false, starred: false },
    { id: 1, username: 'Mirza', message: 'Hey there...', time: '11:45 AM', selected: false, starred: false },
    { id: 1, username: 'Vikram', message: 'Tea? ', time: '10:00 AM', selected: false, starred: false },
    { id: 1, username: 'Sunil;', message: 'What time will you reach London?', time: '12:00 AM', selected: false, starred: false },
  ]);

  const [selectedMessages, setSelectedMessages] = useState([]);
  const [filter, setFilter] = useState('All'); // Read, Unread, Delete, All

  const [showNewMessage, setShowNewMessage] = useState(false);

  const handleSelectionChange = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, selected: !msg.selected } : msg
    );
    setMessages(updatedMessages);

    const selected = updatedMessages.filter((msg) => msg.selected);
    setSelectedMessages(selected);
  };

  const handleStarClick = (id) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, starred: !msg.starred } : msg
    );
    setMessages(updatedMessages);
  };

  const filterMessages = (filterType) => {
  };

  const handleNewMessage = () => {
    setShowNewMessage(true);
  };

  const handleCloseNewMessage = () => {
    setShowNewMessage(false);
  };

  return (
    <div className="full-height">
      <div className="sidebar">
        <Button variant="primary" block onClick={handleNewMessage}>
          New Message
        </Button>
        <div className="options-bar">
          <ul>
            <li>Inbox</li>
            <li>Starred</li>
            <li>Sent</li>
            <li>Draft</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="navigation-bar">
          <DropdownButton title="Filter" className='filterdrop'>
            <Dropdown.Item onSelect={() => filterMessages('Read')}>Read</Dropdown.Item>
            <Dropdown.Item onSelect={() => filterMessages('Unread')}>Unread</Dropdown.Item>
            <Dropdown.Item onSelect={() => filterMessages('Delete')}>Delete</Dropdown.Item>
            <Dropdown.Item onSelect={() => filterMessages('All')}>All</Dropdown.Item>
          </DropdownButton>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success" className='buttonsearch'>Search</Button>
        </div>
        <div className="messages">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              username={msg.username}
              message={msg.message}
              time={msg.time}
              selected={msg.selected}
              starred={msg.starred}
              onSelectionChange={() => handleSelectionChange(msg.id)}
              onStarClick={() => handleStarClick(msg.id)}
            />
          ))}
        </div>
      </div>
      <NewMessageForm show={showNewMessage} handleClose={handleCloseNewMessage} />
    </div>
  );
};

export default Inbox;
