import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Index from './components/Index';
import NotFound from './components/NotFound';
import io from 'socket.io-client'

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [socket, setSocket] = useState(null);

  // Dark/light mode
  const toggleTheme = () => {
    setTheme(curr => curr === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const themeStorage = localStorage.getItem('theme', theme);    
    if (themeStorage) setTheme(themeStorage);
    //eslint-disable-next-line
  }, []);
  

  // Setup sockets.io
  const setupSocket = () => {
    const token = localStorage.getItem('token');
    if (token && !socket) {
      const newSocket = io('http://localhost:8000', {
        query: {
          token: localStorage.getItem('token'),
        },
      });
      newSocket.on('disconnect', () => {   
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log('Socket disconnected.');
      });
      newSocket.on('connection', () => {
        console.log('Socket connected.');
      });
      setSocket(newSocket);
    };
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Routes>
            <Route path="/" element={ <Index /> } exact/>
            <Route path="/login" element={ <Login setupSocket={ setupSocket } /> }/>
            <Route path="/register" element={ <Register setupSocket={ setupSocket } />} />
            <Route path="/dashboard" element={ <Dashboard socket={ socket } /> } />
            <Route path="/chat/:chatId" element={ <Chat socket={ socket } /> }/>
            <Route path="*" element={ <NotFound /> }/>
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
