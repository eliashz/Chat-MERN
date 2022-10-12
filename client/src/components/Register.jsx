import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  const [text, setText] = useState(' ');
  const [values, setValues] = useState({name: '', email: '', password: ''});

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
 
  const validateForm = () => {
    const { name, email, password } = values;
    if (name === '' || email === '' || password === '') {
      setText('Name, e-mail and password is required.')
      return false
    } 
    return true;    
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    const { name, email, password } = values;
    const urlReg = 'http://localhost:8000/user/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    }
    const res = await fetch(urlReg, options);
    const data = await res.json();

    // Login after register
    if (data.status) {
        const urlLog = 'http://localhost:8000/user/login';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        };
        const res = await fetch(urlLog, options);
        const data = await res.json();
    
        if (data.status) {
          localStorage.setItem('token', data.token);
          props.setupSocket();
          navigate('/dashboard');
        }
      }
     setText(data.message);
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
      <div className='card'>
          <div className='cardHeader'>sign in</div>
          <div className="form">
              <input type="text" className='input' name="name" onChange={ handleChange } autoFocus />
              <label htmlFor="name" className='label'>name</label>  
          </div>
          <div className="form">
              <input type="email" className='input' name="email" onChange={ handleChange }/>
              <label htmlFor="email" className='label'>e-mail</label>  
          </div>
          <div className="form">
              <input type="password"  className='input' name="password" onChange={ handleChange } />
              <label htmlFor="password" className='label'>password</label>  
          </div>
          <div className='text'>{ text }</div>
          <button className='button'>enter</button>
          <span><Link to="/login" className='span'>LOG IN</Link></span>
      </div>
    </form>
  )
}

export default Register
