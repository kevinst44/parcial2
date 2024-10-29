import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';

export default function AdminHome({ user }) {
    const [winners, setWinners] = useState([]);
    const home = useNavigate();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await fetch('https://promocion-back.vercel.app/codes/getWinners', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setWinners(result.data);
                } else {
                    alert('Error al cargar los ganadores');
                }
            } catch (error) {
                alert('Error al conectar con el servidor');
            }
        };

        fetchWinners();
    }, []);

    const handleLogout = () => {
        home("/");
    };

    return (
        <div className="admin-home">
            <header className="admin-home-header">
                <h1>Panel de Administración</h1>
                <button onClick={handleLogout} className="logout-button">Salir</button>
            </header>
            
            <main>
                <section className="winners-section">
                    <h2>Tabla de Ganadores</h2>
                    <div className="table-container">
                        <table className="winners-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Nombre</th>
                                    <th>Cédula</th>
                                    <th>Celular</th>
                                    <th>Ciudad</th>
                                    <th>Código</th>
                                    <th>Premio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {winners.map((winner, index) => (
                                    <tr key={index}>
                                        <td>{winner.date}</td>
                                        <td>{winner.userInfo.nombre}</td>
                                        <td>{winner.userInfo.cedula}</td>
                                        <td>{winner.userInfo.celular}</td>
                                        <td>{winner.userInfo.ciudad}</td>
                                        <td>{winner.code}</td>
                                        <td>{winner.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
