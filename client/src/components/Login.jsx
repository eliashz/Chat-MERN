import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Login = ( props ) => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [values, setValues] = useState({email: '', password: ''});

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
  
  const validateForm = () => {
    const { email, password } = values;
    if (email === '' || password === '') {
      setText('e-mail and password is required.')
      return false
    } 
    return true;    
  }
 
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    const { email, password } = values;
    const url = 'http://localhost:8000/user/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    };
    const res = await fetch(url, options);
    const data = await res.json();

    if (data.status) {
      localStorage.setItem('token', data.token);
      props.setupSocket();
      navigate('/dashboard');
    }
    setText(data.message);
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
        <div className='card'>
            <div className='cardHeader'>Log in</div>
            <div className="form">
                <input type="email" className='input' name="email" onChange={ handleChange} autoFocus />
                <label htmlFor="email" className='label'>e-mail</label>  
            </div>
            <div className="form">
                <input type="password" className='input' name="password"  onChange={ handleChange } />
                <label htmlFor="password" className='label'>password</label>
            </div>
            <div className='text'>{text}</div>
            <button type='submit' className='button'>enter</button>
            <span><Link to="/register" className='span'>SIGN IN</Link></span>
        </div>
    </form>   
 )
}  

export default Login
