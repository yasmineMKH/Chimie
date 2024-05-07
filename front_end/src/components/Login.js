import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import '../App.css';
import Axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { useUser } from './UserContext';
function Login() {
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState(''); 
  const history=useNavigate();
  const [fm, setFirstname] = useState('')
  const [lm, setLastname] = useState('')
  const [u, setUsername] = useState('')
  const [r, setRole] = useState('')
  const [e, setEmail] = useState('')
  const [p, setPassword] = useState('')
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const toggleContainer = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = () => {
    Axios.post('http://localhost:3002/Registration', { // Modifier l'URL pour l'inscription
      Firstname: fm,
      Lastname: lm,
      Username: u,
      Role: r,
      Email: e,
      Password: p
    })
    .then(res => {
      if (res.data.error) {
        // S'il y a une erreur, afficher le message d'erreur dans votre interface utilisateur
        alert('User registered failed');
      } else {
        // Sinon, l'inscription a réussi, faire ce que vous devez faire après l'inscription
        alert('User registered successfully');
      }
    })
    .catch(err => {
      // En cas d'erreur lors de la requête, afficher un message générique
      alert('An error occurred while registering user');
      console.error(err);
    });
  };
  

 /* const handleLogin = async () => {
    try {
      const response = await Axios.post('http://localhost:3001', { // Modifier l'URL pour la connexion
        Username: u,
        Password: p
      });
      console.log(response.data);
      alert("Login successful");
      history("/home"); // Naviguer vers la page d'accueil
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      alert("Login failed. Please try again later.");
    }
  };
*/

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log("Username:", u);
    console.log("Password:", p);

    // Envoi de la requête POST au backend pour vérifier les informations de connexion
    const response = await Axios.post('http://localhost:3002/login', {
      Username: u,
      Password: p
    });

    console.log("Response:", response.data);

    if (response.data.message === "Login successful") {
      //alert("Login successful");
      // Rediriger l'utilisateur vers la page d'accueil
      const userId = response.data.id;
      const userRole= response.data.Role;
      switch (userRole) {
        case 'Enseignant':
          navigate(`/homeEnseignant/${userId}`);
            break;
        case 'Doctorant':
          navigate(`/homeDoctorant/${userId}`);
            alert("login successfuly")
            break;
        default:
            alert("Rôle non valide");
            break;
    }
      
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    // Gérer les erreurs ici
    alert("An error occurred. Please try again later.");
    console.log(error);
  }
};




  return (
  
    <body classname="b1">
    <div className={`container ${isActive ? 'active' : ''}`}>
      <div className="form-container sign-up">
        <form>
          
          <h1>Create Account</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)}/>
                <input type="text" placeholder="LastName" onChange={(e) => setLastname(e.target.value)}/>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <span>électionnez une Role</span>
                <select title="Sélectionnez une option" onChange={(e) => setRole(e.target.value)}>
                 <option value=""></option>

                 <option value="Doctorant">Doctorant</option>
                 <option value="Enseignant">Enseignant</option>
                 
                </select>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSubmit}>Sign Up</button>
          
        </form>
      </div>

      {/* Sign-in form */}
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          {/* Rest of the form */}

          
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email password</span>
                <input type="text" placeholder="Username"   onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password"   onChange={(e) => setPassword(e.target.value)} />
                <a href="#">Forget Your Password?</a>
                <button onClick={handleLogin}>Sign In</button>
        </form>
      </div>

      {/* Toggle buttons */}
      <div className="toggle-container">
        <div className={`toggle ${isActive ? 'active' : ''}`}>
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className={isActive ? 'hidden' : ''} onClick={toggleContainer}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className={isActive ? '' : 'hidden'} onClick={toggleContainer}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </body>
  );
}

export default Login;
