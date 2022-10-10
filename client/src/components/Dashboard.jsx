import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import DeleteChat from './DeleteChat';

const Dashboard = ({ socket }) => {
  const navigate = useNavigate();
  const url = 'http://localhost:8000/chat';
  const [chatrooms, setChatrooms] = useState([]);
  const [newChatroom, setNewChatroom] = useState([]);
  const [text, setText] = useState('');
  const [alert, setAlert] = useState(true);
  const [isData, setIsData] = useState(true);
  const inputRef = useRef();

  // Get all the chats rooms
  useEffect(() => {
    if (alert) {
      const getChatrooms = async () => {
        const res = await fetch(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        });
        const data = await res.json();
        if (data.message === 'Forbidden.') setIsData(false);
        setChatrooms(data);
      };
      getChatrooms();
      setAlert(false);
    }
  }, [chatrooms, alert]);

  // Add new chat room
  const handleChange = e => setNewChatroom(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault(); 
    if (newChatroom !== ''){
      setText('');
      const options = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { name: newChatroom } )
      };
      const res = await fetch(url, options);
      const data = await res.json();

      if (data.status) {
        setNewChatroom('');
        setAlert(true);
      } else {
        setText(data.message);
      }
    }
    inputRef.current.focus();
  }

  // Delete Chat from Dashboard
  const deleteChat = async e => {
    e.preventDefault();
    setChatrooms(chatrooms.filter(chatroom => chatroom._id !== e.target.id))
    
    //Delete from DB
    const url = 'http://localhost:8000/chat';
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.target.id })
    };
    await fetch(url, options);
  }

  // In case there's no users registered.
  if (!isData) {
    return navigate('/register');
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
      <div className='card'>
        <div className='cardHeader'>create room</div>
        <div className="form">
            <input type="text" id="chatName" className='input' autoComplete='off' value={newChatroom} onChange={ handleChange } ref={ inputRef } autoFocus />
            <label htmlFor="name" className='label'>name</label>  
        </div>
        <div className='text'>{text}</div>
        <button className='button'>add</button>
        <div className="chatrooms">
          {
          chatrooms.map(chatroom => <DeleteChat key={ chatroom._id } chatroom={ chatroom } onDelete={ deleteChat } />)
          }
        </div>
      </div>
    </form>   
  )
}

export default Dashboard
