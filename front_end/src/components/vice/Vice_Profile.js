import React from 'react';
import './Edit_vice.css'; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
//import { useUser } from './UserContext';
import Axios from 'axios'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function Viced_profile() {
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
        const fetchVice = async () => {
            try {
                const response = await Axios.get(`http://localhost:3002/super_user_info/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchVice();
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
    <div   className="dashboard_container_edit_vice" >
             <nav className="nav_vice">
                  <div className="navbar_vice">
          <div className="logo">
            <img src="/pic/logo.jpg" alt="" />
            <h1>jobs</h1>
          </div>
          <ul>
          <li>
    <Link to={`/Vice_deans/${id}/Profile`}>
        <i className="bi bi-person-circle" style={{ marginRight: '20px' }}></i>
        <span className="nav-item">Profile</span>
    </Link>
</li>

<li>
    <Link to={`/Vice_deans/${id}/binome`}>
        
        <span className="nav-item">Binome</span>
    </Link>
</li>
            <li>
            <a href="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">Parameters management</span>
              </a>
            </li>
            <li>
<Link to={`/Vice_deans/${id}/comission`}>
        
        <span className="nav-item">Commission management</span>
    </Link>
            </li>
            <li>
            <a href="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">Assignment of candidate files to the commission</span>
              </a>
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

      
       
      <div className='container_form_edit_vice'>  
            <h1>Profile vice dean</h1>
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

export default Viced_profile;
