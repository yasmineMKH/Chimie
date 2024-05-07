import React from 'react';
import './page.css';

function Page_SPE() {
  return (
    <div className="main-container">
      <div className="top-row">
        <div className="sub-div">
        <p>Vous souhaitez participer à un congrès scientifique cette année ? Si oui, veuillez confirmer votre participation en cliquant sur le bouton ci-dessous :</p>
        <button id="btnConfirmerConge">Confirmer ma participation</button>

        </div>
        <div className="sub-div"><a href="#">Planifier votre départs</a></div>
        <div className="sub-div"><a href="#">Envoyer votre document</a></div>
      </div>
      <div className="bottom-row">
        <div className="sub-div"><a href="#">Annuler la Demande </a></div>
        <div className="sub-div"><a href="#">Consulter l'etat de la demande</a></div>
        <div className="sub-div"><a href="#">Faire un recour</a></div>
      </div>
    </div>
  );
}

export default Page_SPE;
