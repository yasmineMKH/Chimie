import React from 'react';
import './Admin.css'; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import Axios from 'axios'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
function AdminDashboard() {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await Axios.get(`http://localhost:3002/super_user_info/${id}`);
        setAdmin(response.data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchAdmin();
  }, [id]);

  return (
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
      <section className="main">
        <div >
          {admin && (
            <div>
              <h1>Admin Details</h1>
              <p>Username: {admin.Username}</p>
              {/* Autres informations de l'administrateur si nécessaire */}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
