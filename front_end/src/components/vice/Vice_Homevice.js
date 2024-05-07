import React from 'react';
import './vice.css'; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Axios from 'axios'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Vice_homevice() {
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
    <div className="dashboard-container_vice ">
      <nav className='nav_vice'>
                    <div className="navbar_vice">
                        <div className="logo">
                            <img src="/pic/logo.jpg" alt="" />
                            <h1>Logo</h1>
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
      <section className="main">
        <div >
          {admin && (
            <div>
              <h1>vice deans Details</h1>
              <p>Firstname: {admin.Firstname}</p>
              <p>Lastname: {admin.Lastname}</p>
              <p>Username: {admin.Username}</p>
              <p>Role: {admin.Role}</p>
              <p>Email: {admin.Email}</p>
              {/* Autres informations de l'administrateur si nécessaire */}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Vice_homevice;
