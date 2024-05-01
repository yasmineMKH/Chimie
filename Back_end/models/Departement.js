const { DataTypes } = require('sequelize');
//const Enseignant = require('./Back_end/models/Enseignant.js'); // Importez le modèle Enseignant
//import Enseignant from './Enseignant';
//const db=require('./models')
//const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('./database');
module.exports = (sequelize) => {
    //const Enseignant = require('../models/Enseignant');
    const Departements = sequelize.define('Departements', {
        NameD: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    });

    // Définition de l'association
    //Departement.hasMany(Enseignant, { foreignKey: 'Departement', allowNull: false });

    return Departements;
};
//module.exports =Departement;
//Enseigant.belongsTo(Departement);
//Departement.hasMany(Enseigant);