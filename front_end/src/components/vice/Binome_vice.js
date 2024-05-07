import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function BinomesComponent() {
    const [binomes, setBinomes] = useState([]);
    const [searchTerm, setSearchTerm] = useState({ username1: '', username2: '' });
    const { id } = useParams();
    useEffect(() => {
        // Fetch des binômes depuis le backend
        fetch('/binome_comission')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch binomes');
                }
                return response.json();
            })
            .then(binomesData => {
                setBinomes(binomesData);
            })
            .catch(error => {
                console.error('Error fetching binomes:', error);
            });
    }, []);

    // Filtrer les binômes en fonction des termes de recherche
    const filteredBinomes = binomes.filter(binome =>
        binome.Username_Nss1.toLowerCase().includes(searchTerm.username1.toLowerCase()) &&
        binome.Username_Nss2.toLowerCase().includes(searchTerm.username2.toLowerCase())
    );

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
                    <h1>Binômes List</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by username1"
                            value={searchTerm.username1}
                            onChange={(e) => setSearchTerm({ ...searchTerm, username1: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Search by username2"
                            value={searchTerm.username2}
                            onChange={(e) => setSearchTerm({ ...searchTerm, username2: e.target.value })}
                        />
                        <i className="search-icon"><FontAwesomeIcon icon={faSearch} /></i>
                    </div>
                </div>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={headerCellStyle}>ID</th>
                            <th style={headerCellStyle}>Username_Nss1</th>
                            <th style={headerCellStyle}>Enseignant 1</th>
                            <th style={headerCellStyle}>Username_Nss2</th>
                            <th style={headerCellStyle}>Enseignant 2</th>
                            <th style={headerCellStyle}>Type_traitement</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                                {filteredBinomes.map((binome, index) => (
                                <React.Fragment key={binome.id}>
                                    <tr>
                                <td style={cellStyle}>{binome.id}</td>
                                <td style={cellStyle}>{binome.Username_Nss1}</td>
                                <td style={cellStyle}>{binome.Enseignant1 ? `${binome.Enseignant1.Firstname_fr} ${binome.Enseignant1.Lastname_fr}` : '-'}</td>
                                <td style={cellStyle}>{binome.Username_Nss2}</td>
                                <td style={cellStyle}>{binome.Enseignant2 ? `${binome.Enseignant2.Firstname_fr} ${binome.Enseignant2.Lastname_fr}` : '-'}</td>
                                <td style={cellStyle}>{binome.Type_traitement}</td>
                            </tr>
                            {index < filteredBinomes.length - 1 && <tr style={separatorRowStyle}><td colSpan="6"></td></tr>}
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
const separatorRowStyle = {
    height: '1px',
    backgroundColor: '#dddddd'
};

export default BinomesComponent;


