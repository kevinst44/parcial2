import './styles/Form.css'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ callback }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goTo = useNavigate();
  
  const validateUser = async (event)=>{
    event.preventDefault();
    try {
        const response = await fetch('https://promocion-back.vercel.app/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.status === 'Bienvenido') {
              callback(data);
                if (data.role === 'user') {
                    goTo('/userHome');
                } else if (data.role === 'admin') {
                    goTo('/adminHome');
                }
            } else if (data.status === 'ErrorCredenciales') {
                alert('Usuario y/o contraseña incorrectos');
            }
        } else {
            alert('Error al conectar a la base de datos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
};

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="h2Login">¡Entra y gana como loco!</h2>
        <form className="login-form" onSubmit={validateUser}>
          <div className="form-group">
            <label id='labellogin' htmlFor="email-address">Correo electrónico</label>        
            <input type="email" name="email" id="email" autoComplete="email" required placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label id='labellogin' htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" autoComplete="current-password" required placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Ingresar
          </button>
        </form>
        <div className="signup-link">
          <Link to="/Signup">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  );
}