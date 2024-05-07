import React from 'react';
import '../Admin.css'; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Axios from 'axios'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Profile_E() {
    const [isCommissionMember, setIsCommissionMember] = useState(false);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Firstname_fr: '',
        Lastname_fr: '',
        Username_NSS: '',
        Email: '',
        Password: '',
        Firstname_ab: '',
        Lastname_ab: '',
        Date_naissance: '',
        Lieu_naissance: '',
        Numero_telephone: '',
        Sexe: '',
        Grade: '',
        Specialite: '',
        Laboratoire: '',
        Departement: '',
        Usthb: '',
        Situation: '',
        Etat_compte: '',
        Est_participe:''
    });
    const [message, setMessage] = useState('');
    // Endpoint pour récupérer les informations de l'enseignant
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await Axios.get(`http://localhost:3002/user/${id}`);
                setUser(userResponse.data);
    
                const commissionResponse = await Axios.get(`http://localhost:3002/check_commission_membership/${userResponse.data.Username}`);
                setIsCommissionMember(commissionResponse.data.isMember);
    
                // Récupérer les informations de l'enseignant
                const teacherResponse = await Axios.get(`http://localhost:3002/enseignant/${userResponse.data.Username}`);
                setFormData(teacherResponse.data);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
    
        fetchUserData();
    }, [id]);
    

    const [menuVisible, setMenuVisible] = useState(false);
      
    const toggleMenu = () => {
          setMenuVisible(!menuVisible);
        };

    


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
    <div   className="dashboard-container_edit_admin " >
      <nav className='nav_admin'>
                    <div className="navbar_admin">
                        <div className="logo">
                            <img src="/pic/logo.jpg" alt="" />
                            <h1>Logo</h1>
                        </div>
                        <ul>
                        <li className='nav_item'><a className='nav_link' href="#"> <i class='bx bx-home'></i></a></li>
        <li className='nav_item'><Link className='nav_link' to="/profileEnseignant/:id">Profile <i class='bx bxs-user-detail' style={{ marginRight: '20px' }}></i></Link></li>
        <li className='nav_item'><a className='nav_link' href="#">Faculty</a></li>
        <li className='nav_item'><a className='nav_link dropdown_link' href="#" onClick={toggleMenu}>Formation <i class='bx bx-chevron-down'></i></a>
        {menuVisible && (
        <div className='megamenu'>
            <ul className='content'>
                <li className='megamenu_item header_megamenu'></li>
                <li className='megamenu_item'>
                    <div className='menu_icone'>

                    </div>
                    <div className='menu_link'>
                        <a ></a>
                        <p>Stage de perfectionnent à l'étrangé</p>
                        
                    </div>
                </li>

                <li className='megamenu_item'>
                    <div className='menu_icone'>

                    </div>
                    <div className='menu_link'>
                        <a ></a>
                        <p>Stage de perfectionnent à l'étrangé</p>
                        
                    </div>
                </li>

            </ul>

        </div>
        )}
        </li>
        {isCommissionMember && (
                <li className='nav_item'>
                    <a className='nav_link' href="#">Commission</a>
                </li>
            )}

        <li className='nav_item'><a className='nav_link' href="#">About</a></li>
        <li className='nav_item'><a className='nav_link' href="#">Contact Us</a></li>
        <li className='nav_item'> <Link className='nav_link' to="/Login"> <i className="fas fa-user"></i><span className="nav-item">Logout <i class="bi bi-box-arrow-left"></i></span></Link></li>
    



                        </ul>
                    </div>
                </nav>
      <section className="main">
       
      <div >  
            <h1>Profile </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Firstname">Firstname:</label>
                <input type="text" name="Firstname" value={formData.Firstname_fr} onChange={handleChange} />
                <label htmlFor="Lastname">Lastname:</label>
                <input type="text" name="Lastname" value={formData.Lastname_fr} onChange={handleChange} />
                <label htmlFor="Username">Username:</label>
                <input type="text" name="Username" value={formData.Username_NSS} onChange={handleChange} />
                <label htmlFor="Email">Email:</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} />

                <label htmlFor="Password">Password:</label>
                <input type="password" name="Password" value={formData.Password} onChange={handleChange} />

                <label htmlFor="Firstname_ab">Firstname_ab:</label>
                <input type="text" name="Firstname_ab" value={formData.Firstname_ab} onChange={handleChange} />

                <label htmlFor="Lastname_ab">Lastname_ab:</label>
                <input type="text" name="Lastname_ab" value={formData.Lastname_ab} onChange={handleChange} />

                <label htmlFor="Date_naissance">Date_naissance:</label>
                <input type="text" name="Date_naissance" value={formData.Date_naissance} onChange={handleChange} />
                <label htmlFor="Lieu_naissance">Lieu_naissance:</label>
                <input type="text" name="Lieu_naissance" value={formData.Lieu_naissance} onChange={handleChange} />
                <button type="submit">Modifier</button>
            </form>
            {message && <div>{message}</div>}
        </div>
        
      </section>
    </div>
  );
}

export default Profile_E;
