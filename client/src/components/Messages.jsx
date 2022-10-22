import React from 'react'
import { useState, useEffect } from 'react';

const Messages = ({ message }) => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
  }, []);
  return (
    <div className={ userId === message.user ? 'ownMessage' : 'otherMessage' }>
      <span className='userName'>{ userId !== message.user ? message.name + ': ' : null }</span><span className='message'>{message.text}</span>
    </div> 
  )
} 

export default Messages;
