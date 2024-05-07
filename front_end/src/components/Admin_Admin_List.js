import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link,NavLink } from 'react-router-dom';
import './Admin.css';
function AdminList() {
    // Déclarez votre état pour stocker les données des vice-doyens
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // Utilisez useEffect pour effectuer une action dès que le composant est monté
    useEffect(() => {
        // Fetch vice-doyenne data from backend
        fetch('/admin')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch admin data');
                }
                return response.json();
            })
            .then(admins => {
                setAdmins(admins);
            })
            .catch(error => {
                console.error('Error fetching admin data:', error);
            });
    }, []);

    // Définissez votre fonction pour gérer la suppression d'un admin
    const handleDelete = (id) => {
        // Send DELETE request to backend to delete admin
        fetch(`/admin/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete admin');
                }
                // Filter out the deletedadmin from the state
                setAdmins(admins.filter(admins => admins.id !== id));
            })
            .catch(error => {
                console.error('Error deleting admin:', error);
            });
    };
    const filteredAdmins = admins.filter(admin =>
        admin.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Retournez votre JSX pour le composant Admin_Viced_List
    return (
        <>
            <div className="dashboard-container">
                <nav>
                    <div className="navbar">

                        <div className="logo">
                            <img src="/pic/logo.jpg" alt="" />
                            <h1>jobs</h1>
                        </div>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="fas fa-user"></i>
                                    <span className="nav-item">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <Link to="/Admin/Users">
                                    <i className="fas fa-user"></i>
                                    <span className="nav-item">Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Admin/vice_deans">
                                    <i className="fas fa-chart-bar"></i>
                                    <span className="nav-item">vice deans</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Admin/secretaries">
                                    <i className="fas fa-tasks"></i>
                                    <span className="nav-item">secretaries</span>
                                </Link>
                            </li>
                            <li>
            <Link to="/Admin/Admins">
                <i className="fas fa-tasks"></i>
                <span className="nav-item">Admins</span>
                </Link>
            </li>
                            
                            <li>
                            <Link to="/AdminLogin">
                <i className="fas fa-tasks"></i>
                <span className="nav-item">Logout</span>
                </Link>
                            </li>
                        </ul>
                    </div>

                </nav>
                <div style={{ overflowY: 'auto', maxHeight: '900px', width: '1400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1>Admin List</h1>
                       
                        
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <NavLink to="/Admin/Admins/add" className="btn">Ajouter Amin </NavLink>

                    </div>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
        <tr>
            <th style={headerCellStyle}>ID</th>
            <th style={headerCellStyle}>Username</th>
            <th style={headerCellStyle}>Supprimer</th> {/* Nouvelle colonne pour les actions */}
            <th style={headerCellStyle}>Modifier</th> {/* Nouvelle colonne pour les actions */}
        </tr>
    </thead>
    <tbody>
        {filteredAdmins.map((admin, index) => (
            <React.Fragment key={admin.id}>
                <tr>
                    <td style={cellStyle}>{admin.id}</td>
                    <td style={cellStyle}>{admin.Username}</td>
                    <td style={cellStyle}>
                        <button className="btn" onClick={() => handleDelete(admin.id)}>Supprimer</button>
                    </td>
                    <td style={cellStyle}>
                        <NavLink to={`/Admin/admins/Edit/${admin.id}`} className="btn">Modifier</NavLink>
                    </td>
                </tr>
                {index < filteredAdmins.length - 1 && <tr style={separatorRowStyle}><td colSpan="6"></td></tr>}
            </React.Fragment>
        ))}
    </tbody>
</table>

                </div>
            </div>
        </>
    );
}

// Styles pour l'en-tête du tableau
const headerCellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2'
};

// Styles pour les cellules du tableau
const cellStyle = {
    border: '1px solid #000000',
    padding: '8px',
    textAlign: 'left'
};

// Styles pour les lignes de séparation
const separatorRowStyle = {
    height: '1px',
    backgroundColor: '#dddddd'
};
export default AdminList;
