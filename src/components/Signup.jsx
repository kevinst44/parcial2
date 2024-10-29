import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Signup.css';

export default function Signup({ role }) {
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', phone: '',
    birthdate: '', idNumber: '', city: '', role: role
  });

  const navigate = useNavigate();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.phone.length < 10) {
      alert("El número de celular debe tener al menos 10 dígitos.");
      return;
    }
    if (formData.idNumber.length < 8) {
      alert("La cédula debe tener al menos 8 dígitos.");
      return;
    }

        try {
            const response = await fetch('https://parcial2back-gamma.vercel.app/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Usuario creado exitosamente');
                navigate('/Form');  // Redirige al panel de administración
              } else {
                const data = await response.json();
                alert(data.message);
              }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
  };
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="h2Signup">Crear una cuenta {role === 'admin' ? 'de Administrador' : 'de Usuario'}</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label id="labelSignup" htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" id="email" autoComplete="email" required placeholder="Correo electrónico" value={formData.email} onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" autoComplete="new-password" required placeholder="Contraseña" value={formData.password} onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" autoComplete="name" required placeholder="Nombre" value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="phone">Celular</label>
            <input type="number" name="phone" id="phone" autoComplete="tel" required placeholder="Celular" value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="birthdate">Fecha de nacimiento</label>
            <input type="date" name="birthdate" id="birthdate" required value={formData.birthdate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="idNumber">Cédula</label>
            <input type="number" name="idNumber" id="idNumber" required placeholder="Cédula" value={formData.idNumber} onChange={handleChange}
            />
          </div>
        
          <div className="form-group">
            <label id="labelSignup" htmlFor="city">Ciudad</label>
            <input type="text" name="city" id="city" required placeholder="Ciudad" value={formData.city} onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Registrarse
          </button>
        </form>
        <div className="login-link">
          <Link to="/Form">¿Ya tienes una cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}