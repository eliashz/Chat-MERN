import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? navigate('/dashboard') : navigate('/login');
    // eslint-disable-next-line
  }, []);

  return (
    <></>
  )
}

export default Index
