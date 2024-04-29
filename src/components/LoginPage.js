import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import Cookies from 'js-cookie';
import logo from '../assets/logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const resetCookieExpiration = () => {
      const uid = Cookies.get('uid');
      if (uid) {
        Cookies.set('uid', uid, { expires: 1 / 48 });
      }
    };

    window.addEventListener('mousemove', resetCookieExpiration);
    window.addEventListener('keypress', resetCookieExpiration);
    window.addEventListener('scroll', resetCookieExpiration);

    return () => {
      window.removeEventListener('mousemove', resetCookieExpiration);
      window.removeEventListener('keypress', resetCookieExpiration);
      window.removeEventListener('scroll', resetCookieExpiration);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      localStorage.setItem('token', userData.token);
      Cookies.set('uid', userData.userId, { expires: 1 / 48 });
      navigate('/');
    } catch (error) {
      alert('Failed to login: ' + error.message);
    }
  };

  return (
    <div style={formContainer}>
      <form onSubmit={handleLogin} style={formStyle}>
      <img src={logo} alt="image" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Sign in</button>
        <button type="button" style={buttonStyle}>Create account</button>

        <div style={forgotPasswordStyle}>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

const formContainer = {
  height: '100%',
  display: 'flex'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50%',
  margin: 'auto',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  backgroundColor: '#f7f7f7',
  minWidth: '50%'
};

const inputStyle = {
  width: '60%',
  maxWidth: '500px',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: '#0056b3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '20px',
  width: '50%',
  maxWidth: '300px',
};

const forgotPasswordStyle = {
  marginTop: '20px',
  fontSize: '14px'
};

export default LoginPage;
