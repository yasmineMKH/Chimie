// Importez React, useState et useEffect
import React, { useState, useEffect } from 'react';
// Importez les éléments de react-router-dom
import { NavLink, Link } from 'react-router-dom';
// Importez FontAwesomeIcon et l'icône de recherche
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importez le fichier CSS
import './Admin.css';

// Définissez votre composant Admin_Viced_List
function Admin_super_user_List() {
    // Déclarez votre état pour stocker les données des super_users et le terme de recherche
    const { id } = useParams();
    const [super_users, setsuper_users] = useState([]);
    const [searchTerm, setSearchTerm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        role: ''
    });
    

    // Utilisez useEffect pour effectuer une action dès que le composant est monté
    useEffect(() => {
        // Fetch super_users data from backend
        fetch('/super_users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch super_user data');
                }
                return response.json();
            })
            .then(super_users => {
                setsuper_users(super_users);
            })
            .catch(error => {
                console.error('Error fetching super_user data:', error);
            });
    }, []);

    // Définissez votre fonction pour gérer la suppression d'un vice-doyen
    const handleDelete = (id) => {
        // Send DELETE request to backend to delete super_user
        fetch(`/super_users/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete super_user');
                }
                // Filter out the deleted vice-doyenne from the state
                setsuper_users(super_users.filter(super_user => super_user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting super_user:', error);
            });
    };

    // Filtrer les vice-doyennes en fonction du terme de recherche
    const filteredsuper_users = super_users.filter(super_user =>
        super_user.Firstname.toLowerCase().includes(searchTerm.firstname.toLowerCase()) &&
        super_user.Lastname.toLowerCase().includes(searchTerm.lastname.toLowerCase()) &&
        super_user.Username.toLowerCase().includes(searchTerm.username.toLowerCase()) &&
        super_user.Role.toLowerCase().includes(searchTerm.role.toLowerCase())
    );
    

    // Retournez votre JSX pour le composant Admin_Viced_List
    return (
        <>
            <div className="dashboard-container_admin">
                <nav className='nav_admin'>
                    <div className="navbar_admin">
                        <div className="logo">
                            <img src="/pic/logo.jpg" alt="" />
                            <h1>Logo</h1>
                        </div>
                        <ul>
                        <li>
    <Link to={`/Admin/${id}/Profile`}>
        <i className="bi bi-person-circle" style={{ marginRight: '20px' }}></i>
        <span className="nav-item">Profile</span>
    </Link>
</li>
<li>
    <Link to={`/Admin/${id}/user`}>
        <i className="bi bi-people" style={{ marginRight: '20px' }}></i>
        <span className="nav-item">Users</span>
    </Link>
</li>
<li>
    <Link to={`/Admin/${id}/super_user`}>
        <i className="bi bi-people-fill" style={{ marginRight: '20px' }}></i>
        <span className="nav-item">Super user</span>
    </Link>
</li>

                            
<li>
    <Link to="/LoginG">
        <i className="bi bi-box-arrow-left" style={{ marginRight: '5px' }}></i>
        <span className="nav-item">Logout</span>
    </Link>
</li>

                        </ul>
                    </div>
                </nav>
                <div style={{ overflowY: 'auto', maxHeight: '900px', width: '1400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1>Super users List</h1>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by firstname"
                                value={searchTerm.firstname}
                                onChange={(e) => setSearchTerm({...searchTerm, firstname: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Search by lastname"
                                value={searchTerm.lastname}
                                onChange={(e) => setSearchTerm({...searchTerm, lastname: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Search by username"
                                value={searchTerm.username}
                                onChange={(e) => setSearchTerm({...searchTerm, username: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Search by role"
                                value={searchTerm.role}
                                onChange={(e) => setSearchTerm({...searchTerm, role: e.target.value})}
/>

                            <i className="search-icon"><FontAwesomeIcon icon={faSearch} /></i>
                        </div>
                        <NavLink  to={`/Admin/${id}/super_user/Add`} className="btn"style={{ padding: '4px 10px', fontSize: '15px' ,height: '50px', width: '125px',fontweight: '600'}}>Add Super_user</NavLink>
                    </div>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={headerCellStyle}>ID</th>
                                <th style={headerCellStyle}>Firstname</th>
                                <th style={headerCellStyle}>Lastname</th>
                                <th style={headerCellStyle}>Username</th>
                                <th style={headerCellStyle}>Role</th>
                                <th style={headerCellStyle}>Email</th>
                                <th style={headerCellStyle}>Supprimer</th>
                                <th style={headerCellStyle}>Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredsuper_users.map((super_user, index) => (
                                <React.Fragment key={super_user.id}>
                                    <tr>
                                        <td style={cellStyle}>{super_user.id}</td>
                                        <td style={cellStyle}>{super_user.Firstname}</td>
                                        <td style={cellStyle}>{super_user.Lastname}</td>
                                        <td style={cellStyle}>{super_user.Username}</td>
                                        <td style={cellStyle}>{super_user.Role}</td>
                                        <td style={cellStyle}>{super_user.Email}</td>
                                        <td style={cellStyle}>
    <button style={{ height: '40px', width: '110px' }}  className="btn" onClick={() => handleDelete(super_user.id)}>Supprimer<i className="bi bi-trash"></i></button>
</td>
<td style={cellStyle}>
    {/* Bouton pour le lien vers la page de modification */}
    <NavLink style={{ padding: '10px 12px', fontSize: '15px' ,height: '40px', width: '100px',fontweight: '600'}} to={`/Admin/${id}/super_user/Edit/${super_user.id}`} className="btn">Modifier<i className="bi bi-pencil"></i></NavLink>
</td>

                                    </tr>
                                    {index < filteredsuper_users.length - 1 && <tr style={separatorRowStyle}><td colSpan="6"></td></tr>}
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
    padding: '10px 30px',
    textAlign: 'left'
    
};

// Styles pour les lignes de séparation
const separatorRowStyle = {
    height: '1px',
    backgroundColor: '#dddddd'
};

// Exportez votre composant  Admin_super_user_List
export default  Admin_super_user_List;

