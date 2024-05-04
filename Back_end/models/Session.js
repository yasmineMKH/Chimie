const { DataTypes } = require('sequelize');
module.exports = (sequelize) => { 
    const Session = sequelize.define("Session", {
    Nom_S: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },  
    Est_ouverte: {
        type: DataTypes.ENUM('true', 'false'),
        defaultValue: 'false'
    }
});
 return Session; 
}