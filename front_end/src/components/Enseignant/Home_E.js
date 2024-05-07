import React from 'react';
import '../Home.css';
import { NavLink, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import  { useState, useEffect } from 'react';
function Home_E() {
    const [isCommissionMember, setIsCommissionMember] = useState(false);
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await Axios.get(`http://localhost:3002/user/${id}`);
                setUser(userResponse.data);

                const commissionResponse = await Axios.get(`http://localhost:3002/check_commission_membership/${userResponse.data.Username}`);
                setIsCommissionMember(commissionResponse.data.isMember);
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
  return (
    
    /*<div class="container_home">
  <header className='header_Home'>
    <div id="diaporama">
      <div class="diaporama-inner">
        <div class="diaporama-slide" style={{backgroundImage: "url('../background.jpg')"}}></div>
        <div class="diaporama-slide" style={{backgroundImage: "url('/images/slide2.jpg')"}}></div>
        
      </div>
    </div>
  </header>

  <nav>
    <div class="logo">
      <a href="#">Logo</a>
    </div>
    <div class="navbar_home">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Faculté</a></li>
        <li><a href="#">Formation</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact Us</a></li>
        
      </ul>
    </div>
  </nav>

  <div class="body-content">
    <div class="b-title">
    <div>
          {user && (
            <div>
              <h1>Welcome, {user.Username}!</h1>
              <p>Email: {user.Email}</p>
              <p>Role: {user.Role}</p>
              
            </div>
          )}
        </div> 
    </div>
    <div class="b-img">
      <img src="/images/svg.png" alt="SVG" />
    </div>
  </div>
</div>*/
<div className='body_HomeDoc'>
<header>
    <nav className='nav_home_doc'>
        <div className='lab'>
            <a href='#'>Logo</a>
        </div>
        <div className='toggle_menu'>
        <i class='bx bx-grid-alt'></i>
        </div>
        <ul className='nav_list'></ul>
        <div className='close_menu'>
        <i class='bx bx-x'></i>
        </div>
        <li className='nav_item'><a className='nav_link' href="#"> <i class='bx bx-home'></i></a></li>
        <li className='nav_item'><Link className='nav_link' to={`/profileEnseignant/${id}`}>Profile <i class='bx bxs-user-detail' style={{ marginRight: '20px' }}></i></Link></li>
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
                        <p>Manifestation Scientifique Internationale</p>
                        
                    </div>
                </li>

                <li className='megamenu_item'>
                    <div className='menu_icone'>

                    </div>
                    <div className='menu_link'>
                        <a ></a>
                        <p>Séjour scientifique de courte durée de haut niveau</p>
                        
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
    


    </nav>

</header>


<div >
          {user && (
            <div>
              <h1>Welcome, {user.Username}!</h1>
              <p>Email: {user.Email}</p>
              <p>Role: {user.Role}</p>
              {/* Afficher d'autres informations de l'utilisateur */}
            </div>
          )}
        </div>

</div>
    
  );
}

export default Home_E;
