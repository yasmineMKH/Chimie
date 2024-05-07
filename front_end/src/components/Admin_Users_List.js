import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Admin_Users_List() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState({
        firstname: '',
        lastname: '',
        username: ''
    });
    const { id } = useParams();

    useEffect(() => {
        // Fetch user data from backend
        fetch('/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(users => {
                setUsers(users);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleDeleteUser = (id) => {
        // Send DELETE request to backend to delete user
        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                // Filter out the deleted user from the state
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const filteredUsers = users.filter(user =>
        user.Firstname.toLowerCase().includes(searchTerm.firstname.toLowerCase()) &&
        user.Lastname.toLowerCase().includes(searchTerm.lastname.toLowerCase()) &&
        user.Username.toLowerCase().includes(searchTerm.username.toLowerCase())
    );

    return (
        <>
            <div className="dashboard-container_admin ">
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
                    <h1>User List</h1>
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
                        <i className="search-icon"><FontAwesomeIcon icon={faSearch} /></i>
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
                                <th style={headerCellStyle}>Actions</th> {/* Nouvelle colonne pour les actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <React.Fragment key={user.id}>
                                    <tr>
                                        <td style={cellStyle}>{user.id}</td>
                                        <td style={cellStyle}>{user.Firstname}</td>
                                        <td style={cellStyle}>{user.Lastname}</td>
                                        <td style={cellStyle}>{user.Username}</td>
                                        <td style={cellStyle}>{user.Role}</td>
                                        <td style={cellStyle}>{user.Email}</td>
                                        <td style={cellStyle}>
                                            <button style={{ height: '40px', width: '110px' }} className="btn" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                    {index < filteredUsers.length - 1 && <tr style={separatorRowStyle}><td colSpan="6"></td></tr>}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const headerCellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2'
};

const cellStyle = {
    border: '1px solid #000000',
    padding: '10px 30px',
    textAlign: 'left'
};

const separatorRowStyle = {
    height: '1px',
    backgroundColor: '#dddddd'
};

export default Admin_Users_List;
