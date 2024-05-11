const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SPE_doc = sequelize.define("SPE_doc", {
        Username_Mat: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: 'doctorants', // Référence à la table Doctorant
                key: 'Username_Mat'
            }
        },
        Pays: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        Ville: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        Etablissement_acc: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        Date_dep: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        Date_retour: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        Periode_Stage: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        Annee: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });

    return SPE_doc;
};