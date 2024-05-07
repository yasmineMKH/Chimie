import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Edit_admin.css';
import { NavLink, Link } from 'react-router-dom';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
function Add_super_user() {
    //const history = useHistory();
    const { id } = useParams();  
  const [fm, setFirstname] = useState('')
  const [lm, setLastname] = useState('')
  const [u, setUsername] = useState('')
  const [r, setRole] = useState('')
  const [p, setPassword] = useState('')
  const [em, setEmail] = useState('')
    

    
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/super_user/add', {
        Firstname: fm,
        Lastname: lm,
        Username: u,
        Role: r,
        Email: em,
        Password: p
    })
    .then(res => {
        if (res.status === 200) {
            alert("Add successful");
            window.location.href = '/Admin/vice_deans';
        } else {
            return res.json().then(data => {
                alert( 'Failed to add Super_user');
            });
        }
    })
    .catch(error => {
        alert( "An error occurred. Please try again later.");
        console.error("Error adding Super_user:");
    });
};

    
    


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
            <div className='container_form_edit_admin'>  
            <h1>Add new Super_user</h1>
            <form >
                <label htmlFor="Firstname">Firstname:</label>
                <input type="text" name="Firstname" onChange={(e) => setFirstname(e.target.value)} />
                <label htmlFor="Lastname">Lastname:</label>
                <input type="text" name="Lastname" onChange={(e) => setLastname(e.target.value)} />
                <label htmlFor="Username">Username:</label>
                <input type="text" name="Username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="Role">Role:</label>
                <select title="Sélectionnez une option" onChange={(e) => setRole(e.target.value)}>
                <option value=""></option>
                 <option value="Admin">Admin</option>
                 <option value="Secrétaire">Secrétaire</option>
                 <option value="Vice doyen">Vice doyen</option>
                </select>
                <label htmlFor="Password">Password:</label>
                <input type="Password" name="Password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="Email">Email:</label>
                <input type="email" name="Email" onChange={(e) => setEmail(e.target.value)} />
                <button onClick={handleSubmit}>Ajouter</button>
            </form>
        </div>
        </div>
    );
}

export default Add_super_user;
