import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Edit_admin.css';
import { NavLink, Link } from 'react-router-dom';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
function Doc_dem_SPE() {
    //const history = useHistory();
    const { id } = useParams();  
  const [u, setUsername_Mat] = useState('')
  const [p, setPays] = useState('')
  const [v, setVille] = useState('')
  const [et, setEtablissement] = useState('')
  const [pe, setPeriode] = useState('')
  const [a, setAnnee] = useState('')
  const [d, setdebut] = useState('')
  const [f, setfin] = useState('')
    

    
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/demande_SPE', {
        Username_Mat: u,
        Pays: p,
        Ville: v,
        Etablissement_acc: et,
        Periode_Stage: pe,
        Annee: a,
        Date_dep:d,
        Date_retour:f
    })
    .then(res => {
        if (res.status === 201) {
            alert("Add successful");
            
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
        <div >
            <div >  
            <h1>Formulaire de la demande de Stage de perfectionnent à l'étrangé</h1>
            <form >
                <label htmlFor="Username_Mat">Username_Mat:</label>
                <input type="text" name="Username_Mat" onChange={(e) => setUsername_Mat(e.target.value)} />

                <label htmlFor="Pays">Pays:</label>
                <input type="text" name="Pays" onChange={(e) => setPays(e.target.value)} />

                <label htmlFor="Ville">Ville:</label>
                <input type="text" name="Ville" onChange={(e) => setVille(e.target.value)} />

                <label htmlFor="Etablissement d'accueil">Etablissement d'accueil:</label>
                <input type="text" name="Etablissement_acc" onChange={(e) => setEtablissement(e.target.value)} />
                


                <label htmlFor="Période">Période:</label>
                <select title="Sélectionnez une option" onChange={(e) => setPeriode(e.target.value)}>
                <option value=""></option>
                 <option value="Semestre1">Semestre 1</option>
                 <option value="Semestre2">Semestre 2</option>
                </select>


                <label htmlFor="Date">Date de début  du stage:</label>
                <input type="date" name="debut" onChange={(e) => setdebut(e.target.value)} />

                <label htmlFor="Date">Date de fin  du stage:</label>
                <input type="date" name="fin" onChange={(e) => setfin(e.target.value)} />

                <label htmlFor="Année">Année Binificement de bource:</label>
                <input type="text" name="Année" onChange={(e) => setAnnee(e.target.value)} />

                <button onClick={handleSubmit}>Envoyer</button>
            </form>
        </div>
        </div>
    );
}

export default Doc_dem_SPE;