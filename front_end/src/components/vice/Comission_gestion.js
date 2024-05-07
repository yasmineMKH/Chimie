// Importez React, useState et useEffect
import React, { useState, useEffect } from 'react';
// Importez les éléments de react-router-dom
import { NavLink, Link } from 'react-router-dom';
// Importez FontAwesomeIcon et l'icône de recherche
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


// Importez le fichier CSS
import './vice.css';

// Définissez votre composant Admin_Viced_List
function Comission_gestion() {
    // Déclarez votre état pour stocker les données des enseignants et le terme de recherche
    const { id } = useParams();
    const [enseignants, setenseignants] = useState([]);
    //const [prevEnseignants, setenseignants] = useState([]);
    const [searchTerm, setSearchTerm] = useState({
        firstname: '',
        lastname: '',
        username: ''
    });
    





    // Utilisez useEffect pour effectuer une action dès que le composant est monté
    /*useEffect(() => {
        // Fetch enseignants data from backend
        fetch('/enseignants')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch enseignant data');
                }
                return response.json();
            })
            .then(enseignants => {
                setenseignants(enseignants);
            })
            .catch(error => {
                console.error('Error fetching enseignant data:', error);
            });
    
        // Fetch commission data from backend
        fetch('/membre_commission/info')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch commission data');
                }
                return response.json();
            })
            .then(commission => {
                // Mettre à jour l'état des enseignants en fonction de la commission
                setenseignants(enseignants => {
                    return enseignants.map(enseignant => {
                        if (commission.includes(enseignant.Username_NSS)) {
                            return {...enseignant, isInCommission: true};
                        } else {
                            return {...enseignant, isInCommission: false};
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching commission data:', error);
            });
    }, []);*/


    useEffect(() => {
        // Fetch enseignants data from backend
        fetch('/enseignants')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch enseignant data');
                }
                return response.json();
            })
            .then(enseignants => {
                setenseignants(enseignants);
            })
            .catch(error => {
                console.error('Error fetching enseignant data:', error);
            });
    
        // Fetch commission data from backend
        fetch('/membre_commission/info')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch commission data');
                }
                return response.json();
            })
            .then(({ commission, president }) => {
                // Mettre à jour l'état des enseignants en fonction de la commission et du président
                setenseignants(enseignants => {
                    return enseignants.map(enseignant => {
                        const isInCommission = commission.includes(enseignant.Username_NSS) ? true : false;
                        const isPresident = president.includes(enseignant.Username_NSS) ? true : false;
                        return {...enseignant, isInCommission, isPresident};
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching commission data:', error);
            });
    }, []);
    
    
    
    
    
    
    


    const handleClickAdd = (username) => {
        fetch('/membre_commission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Username_NSS: username })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add enseignant to commission');
            }
            // Mettre à jour l'état des enseignants
            setenseignants(enseignants => {
                return enseignants.map(enseignant => {
                    if (enseignant.Username_NSS === username) {
                        return {...enseignant, isInCommission: true};
                    }
                    return enseignant;
                });
            });
        })
        .catch(error => {
            console.error('Error adding enseignant to commission:', error);
        });
    };
    
    const handleClickRemove = (username) => {
        fetch(`/membre_commission/${username}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove enseignant from commission');
            }
            // Mettre à jour l'état des enseignants
            setenseignants(enseignants => {
                return enseignants.map(enseignant => {
                    if (enseignant.Username_NSS === username) {
                        return {...enseignant, isInCommission: false};
                    }
                    return enseignant;
                });
            });
        })
        .catch(error => {
            console.error('Error removing enseignant from commission:', error);
        });
    };
    









    const handleMakePresident = (username) => {
        fetch('/membre_commission/president/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Username_NSS: username })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to make enseignant president');
            }
            // Mettre à jour la liste des enseignants après avoir défini le président de la commission
            setenseignants(enseignants.map(enseignant => {
                if (enseignant.Username_NSS === username) {
                    return {...enseignant, isPresident: true};
                }
                return enseignant;
            }));
        })
        .catch(error => {
            console.error('Error making enseignant president:', error);
        });
    };
    
    const handleRemovePresident = (username) => {
        fetch(`/membre_commission/${username}/president/delete`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove enseignant from president position');
            }
            // Mettre à jour la liste des enseignants après la suppression du président de la commission
            setenseignants(enseignants.map(enseignant => {
                if (enseignant.Username_NSS === username) {
                    return {...enseignant, isPresident: false};
                }
                return enseignant;
            }));
        })
        .catch(error => {
            console.error('Error removing enseignant from president position:', error);
        });
    };
    


    const handlebinome_comission = () => {
        fetch('/binome_comission/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            if (response.ok) {
              console.log('Binômes créés avec succès !');
            } else {
              console.error('Échec de la création des binômes.');
            }
          })
          .catch(error => {
            console.error('Erreur lors de la création des binômes :', error);
          });
          
    };
    






    // Filtrer les enseignants en fonction du terme de recherche
    const filteredenseignants = enseignants.filter(enseignant =>
        enseignant.Firstname_fr.toLowerCase().includes(searchTerm.firstname.toLowerCase()) &&
        enseignant.Lastname_fr.toLowerCase().includes(searchTerm.lastname.toLowerCase()) &&
        enseignant.Username_NSS.toLowerCase().includes(searchTerm.username.toLowerCase()) 
    );
    

    // Retournez votre JSX pour le composant Admin_Viced_List
    return (
        <>
            <div className="dashboard-container_vice">
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
                <div style={{ overflowY: 'auto', maxHeight: '900px', width: '1400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1>Enseignants List</h1>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by firstname"
                                value={searchTerm.firstname}
                                onChange={(e) => setSearchTerm({...searchTerm, firstname: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Search by lastname"
                                value={searchTerm.lastname}
                                onChange={(e) => setSearchTerm({...searchTerm, lastname: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Search by username"
                                value={searchTerm.username}
                                onChange={(e) => setSearchTerm({...searchTerm, username: e.target.value})}
                            />
                            

                            <i className="search-icon"><FontAwesomeIcon icon={faSearch} /></i>

                            
                        </div>
                        
                   
                        <button className="btn-ajout"style={{ padding: '4px 10px', fontSize: '15px' ,height: '50px', width: '150px',fontweight: '600'}} onClick={handlebinome_comission}>Create binome</button>
               

                    </div>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={headerCellStyle}>ID</th>
                                <th style={headerCellStyle}>Firstname</th>
                                <th style={headerCellStyle}>Lastname</th>
                                <th style={headerCellStyle}>Username</th>
                                <th style={headerCellStyle}>Email</th>
                                <th style={headerCellStyle}>Add comission Member</th>
                                <th style={headerCellStyle}>Add Président</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredenseignants.map((enseignant, index) => (
                                <React.Fragment key={enseignant.id}>
                                    <tr>
                                        <td style={cellStyle}>{enseignant.id}</td>
                                        <td style={cellStyle}>{enseignant.Firstname_fr}</td>
                                        <td style={cellStyle}>{enseignant.Lastname_fr}</td>
                                        <td style={cellStyle}>{enseignant.Username_NSS}</td>
                                        <td style={cellStyle}>{enseignant.Email}</td>
                                        <td style={cellStyle}>
                                            {enseignant.isInCommission ? (
                                                <button className="btn-sup" style={{ height: '60px', width: '200px' }}  onClick={() => handleClickRemove(enseignant.Username_NSS)}>Supprimer de la commission <i class="bi bi-person-dash" style={{ fontSize: '24px' }}></i> </button>
                                            ) : (
                                                <button className="btn-ajout" style={{ height: '60px', width: '200px' }} onClick={() => handleClickAdd(enseignant.Username_NSS)}>Ajouter à la commission <i class="bi bi-person-add" style={{ fontSize: '24px' }}></i> </button>
                                            )}
                                            </td>
                                        <td style={cellStyle}>
                                            {enseignant.isPresident ? (
                                                <button className="btn-sup" style={{ height: '60px', width: '200px', marginLeft: '10px' }} onClick={() => handleRemovePresident(enseignant.Username_NSS)}>Retirer le président <i class="bi bi-person-dash" style={{ fontSize: '24px' }}></i> </button>
                                            ) : (
                                                <button className="btn-ajout" style={{ height: '60px', width: '200px', marginLeft: '10px' }} onClick={() => handleMakePresident(enseignant.Username_NSS)}>Définir comme président <i class="bi bi-person-check" style={{ fontSize: '24px' }}></i> </button>
                                            )}
                                        </td>

                                    </tr>
                                    {index < filteredenseignants.length - 1 && <tr style={separatorRowStyle}><td colSpan="6"></td></tr>}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

// Styles pour l'en-tête du tableau
const headerCellStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2'
};

// Styles pour les cellules du tableau
const cellStyle = {
    border: '1px solid #000000',
    padding: '10px 30px',
    textAlign: 'left'
    
};

// Styles pour les lignes de séparation
const separatorRowStyle = {
    height: '1px',
    backgroundColor: '#dddddd'
};

// Exportez votre composant  Admin_super_user_List
export default  Comission_gestion;

