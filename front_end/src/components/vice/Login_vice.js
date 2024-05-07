import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login_vice.css'
function Loginviced() {
  const [u, setUsername] = useState('');
  const [p, setPassword] = useState('');
  const [r, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

        // Effectuer la requête POST vers l'URL correspondante avec les informations d'identification
        const response = await Axios.post('http://localhost:3002/loginVice', {
            Username: u,
            Password: p,
            
        });

        if (response.data.message === "Login successful") {
            const id = response.data.id;
            const role=response.data.Role;
           
            console.log(role)
            // Rediriger l'utilisateur en fonction de son rôle
            switch (role) {
                case 'Admin':
                  
                    navigate(`/Admin/${id}`);
                    break;
                case 'Secrétaire':
                    //navigate(`/Secrétaire/${id}`);
                    alert("login successfuly")
                    break;
                case 'Vice doyen':
                    navigate(`/Vice_deans/${id}`);
                    alert("login successfuly")
                    break;
                default:
                    alert("Rôle non valide");
                    break;
            }
        } else {
            alert("Identifiants invalides");
        }
    } catch (error) {
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        console.log(error);
    }
};

  return (
    <div className="background">
    <section className="form-box">
      <div className="form-value">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input type="text" placeholder="Username" value={u} onChange={(e) => setUsername(e.target.value)} />
            
          </div>
          
          <div className="inputbox">
          
            <ion-icon name="lock-closed-outline"></ion-icon>
            
            <input type="password"placeholder="Password" value={p} onChange={(e) => setPassword(e.target.value)}/>

          </div>

          
          
          <button type="submit">Log In</button>
          
        </form>
      </div>
    </section>
    </div>
  );
}

export default Loginviced;
