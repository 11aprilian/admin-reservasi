import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Verifikasi = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);

  return null; 
};

export default Verifikasi;