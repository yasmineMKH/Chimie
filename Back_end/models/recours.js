const { DataTypes } = require('sequelize');
module.exports = (sequelize) => { 
    const Recours = sequelize.define("Recours", {
    Commentaire: {
      type: DataTypes.STRING(100),
      allowNull: true
    },  
    TypeDemande: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      Username_Mat: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
});
 return Recours; 
}