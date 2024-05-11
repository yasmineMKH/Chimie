const { DataTypes } = require('sequelize');
module.exports = (sequelize) => { 
    const Annee = sequelize.define('Annee', {
        
        Annee: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        Budget_global: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        Budget_ens: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        Budget_doc: {
          type: DataTypes.FLOAT,
          allowNull: false
        } 
        
      });
      return Annee;
    }
    