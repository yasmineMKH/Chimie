const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Membre_Commission = sequelize.define("Membre_Commission", { 
        
        Username_NSS: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: 'enseignants', // Référence à la table Enseignants
                key: 'Username_NSS'
            }
        },
        Président:{ 
            type: DataTypes.ENUM('true', 'false'),
            defaultValue: 'false'
        }
    });
    
    return Membre_Commission; 
};