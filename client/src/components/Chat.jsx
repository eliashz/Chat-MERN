import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import Messages from './Messages';

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const inputRef = useRef();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatName, setChatName] = useState('');

  const handleChange = e => setNewMessage(e.target.value);

  const sendMessage = e => {
    e.preventDefault();
    if (socket &&  newMessage !== '') {
      socket.emit('chatMessage', {
        chatId, 
        message: newMessage,
      });
      setNewMessage('');
      inputRef.current.focus();
    }
  }

  useEffect(() => { 
    if (socket) {
      socket.on('newMessage', message => {
        setMessages([...messages, message]);
      });
    }
    //eslint-disable-next-line
  }, [messages, socket])

  useEffect(() => {
    if (socket) socket.emit('joinRoom', { chatId });

    return () => {
      if (socket) socket.emit('leaveRoom', { chatId });
    }
    //eslint-disable-next-line
  }, [socket, chatId]);

  // Get chat name with the ID in params.
  useEffect(() => {
    if (socket){
      const getChatName = async () => {
      const res = await fetch('http://localhost:8000/chat/' + chatId, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      setMessages(data.chat.messages);
      if (data.message !== 'Forbidden.') setChatName(data.chat.name)
      }
      getChatName();
    }
  }, [chatId, socket])

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className='chat'>
      <div className='header'>
        <span onClick={ () => navigate('/dashboard') } className="material-symbols-outlined logout">arrow_back_ios</span>
        <span onClick={ toggleTheme } className="darkLight material-symbols-outlined"> { theme === 'dark' ? 'light_mode' : 'dark_mode' } </span> 
        <span onClick={ logout } className="logout material-symbols-outlined">logout</span>
      </div>
      <div className='chatSection'>
        <div className="chatHeader">{chatName.toUpperCase()}</div>
        <div className="chatContent">
          <div className="chatBox">
            {
              messages.map((message, i) => <Messages key={ i } message={ message } />)
            }
            <div className="anchor"></div>
          </div>
        </div>
        <form autoComplete="off" onSubmit={ sendMessage }>
          <div className="chatActions">
            <div>
              <input type='text' name='message' value={ newMessage } placeholder='write a message' onChange={ handleChange } ref={ inputRef } autoFocus></input>
            </div>
            <div>
              <button type='submit' className='chatButton'><span className="material-symbols-outlined">send</span></button>
            </div>
          </div>
        </form>
      </div> 
    </div>
  )
}

export default Chat
