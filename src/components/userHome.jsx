import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./styles/UserHome.css";

export default function UserHome({ user }) {
  const [code, setCode] = useState("");
  const [registeredCodes, setRegisteredCodes] = useState([]); // Estado para los códigos registrados
  const home = useNavigate();

  if (!user || user.role !== 'user') {
    return <Navigate to="/" />;
  }
  // Obtener los códigos registrados cuando el componente se monte
  useEffect(() => {
    const fetchRegisteredCodes = async () => {

      try {
        const response = await fetch(
          "https://promocion-back.vercel.app/codes/getUserCodes",
          {
        
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRegisteredCodes(data.codes); // Almacena los códigos en el estado
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        alert("Error al obtener los códigos registrados");
      }
    };

    fetchRegisteredCodes();
  }, [user._id]); // Ejecutar cuando el userId cambie

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://promocion-back.vercel.app/codes/registerCode",
        {
      
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, userId: user._id }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Después de registrar el código, actualizar la lista de códigos registrados
        setRegisteredCodes((prevCodes) => [
          ...prevCodes,
          { code, date: new Date().toISOString(), value: result.prizeValue },
        ]);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  const handleLogout = () => {
    home("/");
  };

  return (
    <div className="user-home">
      <header className="user-home-header">
        <h1>Bienvenido {user.nombre}</h1>
        <button onClick={handleLogout} className="logout-button">
          Salir
        </button>
      </header>

      <main>
        <section className="register-code-section">
          <h2>Registrar Código</h2>
          <form onSubmit={handleSubmit} className="register-code-form">
            <div className="form-group">
              <label htmlFor="code-input">Código:</label>
              <input type="number" value={code} required placeholder="Ingrese el código"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 3 && value >= 0 && value <= 999) {
                    setCode(value);
                  }
                }}
                onBlur={() => {
                  setCode(code.padStart(3, "0"));
                }}
              />
            </div>
            <button type="submit" className="register-button"> Registrar </button>
          </form>
        </section>

        <section className="registered-codes-section">
          <h2>Códigos Registrados</h2>
          <table className="registered-codes-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Código</th>
                <th>Premio</th>
              </tr>
            </thead>
            <tbody>
              {registeredCodes.map((record, index) => (
                <tr key={index}>
                  <td>{new Date(record.date).toLocaleString()}</td>
                  <td>{record.code}</td>
                  <td>
                    {record.value === 0 ? "No ganaste" : `¡Ganaste ${record.value}!`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
