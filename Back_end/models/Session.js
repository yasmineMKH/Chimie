const { DataTypes } = require('sequelize');
module.exports = (sequelize) => { 
    const Session = sequelize.define("Session", {
    Nom_S: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },  
    Date_fin: {
      type: DataTypes.DATE
    },
    Est_ouverte: {
        type: DataTypes.ENUM('true', 'false'),
        defaultValue: 'false'
    },
    Date_ouverture: {
      type: DataTypes.DATE
    },
    Delai_fermeture: {
      type: DataTypes.INTEGER // En jours
    } 
});
  
  // Méthode pour ouvrir une session
  Session.prototype.ouvrirSession = async function() {
    const maintenant = new Date();
    this.Est_ouverte = true;
    this.Date_ouverture = maintenant;
    this.Date_fin = new Date(maintenant.getTime() + this.Delai_fermeture * 24 * 60 * 60 * 1000); // Ajoute le délai de fermeture en millisecondes
    await this.save();
  };
  
  // Synchronisation du modèle avec la base de données
  sequelize.sync()
    .then(() => {
      console.log('La synchronisation avec la base de données est terminée.');
    })
    .catch(err => {
      console.error('Erreur lors de la synchronisation avec la base de données :', err);
    });
 return Session; 
}