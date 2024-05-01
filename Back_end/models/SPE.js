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
            allowNull: false
        },
        Ville: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Etablissement_acc: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Date_dep: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Date_retour: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Periode_Stage: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Annee: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    });

    return SPE_doc;
};