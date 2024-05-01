const { DataTypes } = require('sequelize');
//const Departement = require('./Back_end/models/Departement.js'); // Importez le modèle Departement
//import Departement from './Departement';
//const db=require('./models')
//const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('./database');
module.exports = (sequelize) => {
    const Departements = require('../models/Departement');
    const Enseignant = sequelize.define('Enseignants', {
        Username_NSS: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Firstname_fr: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Lastname_fr: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Firstname_ab: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Lastname_ab: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Date_naissance: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Lieu_naissance: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Numero_telephone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Sexe: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false
        },
        Grade: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Specialite: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Laboratoire: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Departement: {
            type: DataTypes.STRING(100),
            allowNull: false,
            references: {
              model: 'departements', // Utilisez le nom de la table comme une chaîne de caractères
              key: 'NameD'
            }
        },
        Email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Usthb: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Situation: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Etat_compte: {
            type: DataTypes.ENUM('true', 'false'),
            defaultValue: 'false'
        },
        Est_participe:{
            type: DataTypes.ENUM('true', 'false'),
            defaultValue: 'false' 
        }
    });

    // Définition de l'association
    //Enseignant.belongsTo(Departement, { foreignKey: 'Departement', allowNull: false });
    //Enseignant.belongsTo(Departements);

    return Enseignant;
    //Enseignant.belongsTo(Departements);
    //Enseignant.belongsTo(Departement, { foreignKey: 'Departement', allowNull: false });
};
//module.exports = Enseignant;
//Enseignant.belongsTo(Departement);
//Departement.hasMany(Enseignant);

//npx sequelize-cli migration:generate add_foreign_key_to_posts_Enseignant add_foreign_key_to_Enseignant

//const Departement = require('../models/Departement');
//const Enseignant = require('../models/Enseignant');
//Enseignant.belongsTo(Departement, { foreignKey: 'Departement', allowNull: false });