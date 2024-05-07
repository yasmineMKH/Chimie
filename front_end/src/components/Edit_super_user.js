import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Edit_admin.css';
import { NavLink, Link } from 'react-router-dom';
//import 'bootstrap-icons/font/bootstrap-icons.css';
function Edit_super_user() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        Username: '',
        Role:'',
        Email: '',
        Password: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch les données du vice-doyenne depuis le backend pour pré-remplir le formulaire
        fetch(`/super_users/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch super_user data');
                }
                return response.json();
            })
            .then(super_user => {
                setFormData(super_user);
            })
            .catch(error => {
                console.error('Error fetching super_user  data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const super_userId = id;

        fetch(`/super_users/edit/${super_userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to update super_user');
                });
            } else {
                // Vice doyenne updated successfully
                alert('super_user updated successfully');
                window.location.href = '/Admin/vice_deans';
            }
        })
        
        .catch(error => {
            if (error.response && error.response.status === 400) {
                // Si le backend a renvoyé une erreur avec un code 400,
                // cela signifie que le vice-doyenne n'est pas un enseignant.
                // Afficher le message d'erreur renvoyé par le backend.
                error.response.json().then(data => {
                    alert(data.error);
                    setMessage(data.error); // Stocker le message d'erreur dans l'état local pour affichage
                });
            } else {
                // Si une autre erreur s'est produite, afficher un message générique.
                alert(error.message || 'Failed to update vice-doyenne');
                console.error('Error updating vice-doyenne:', error);
            }
        });
        
    }     

    return (
        <div className="dashboard-container_edit_admin ">
            <nav className='nav_admin'>
                    <div className="navbar_admin">
                        <div className="logo">
                            <img src="/pic/logo.jpg" alt="" />
                            <h1>Logo</h1>
                        </div>
                        <ul>
                        
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
            <div className='container_form_edit_admin'>  
            <h1>Edit Super_user</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Firstname">Firstname:</label>
                <input type="text" name="Firstname" value={formData.Firstname} onChange={handleChange} />
                <label htmlFor="Lastname">Lastname:</label>
                <input type="text" name="Lastname" value={formData.Lastname} onChange={handleChange} />
                <label htmlFor="Username">Username:</label>
                <input type="text" name="Username" value={formData.Username} onChange={handleChange} />
                <label htmlFor="Role">Role:</label>
                <select title="Sélectionnez une option" value={formData.Role} onChange={handleChange}>
                 
                 <option value="Admin">Admin</option>
                 <option value="Secrétaire">Secrétaire</option>
                 <option value="Vice doyen">Vice doyen</option>
                </select>
                <label htmlFor="Email">Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
                <label htmlFor="Email">Password:</label>
                <input type="password" name="Password" value={formData.Password} onChange={handleChange} />
                <button type="submit">Modifier</button>
            </form>
            {message && <div>{message}</div>}
        </div>
        </div>
    );
}

export default Edit_super_user;
