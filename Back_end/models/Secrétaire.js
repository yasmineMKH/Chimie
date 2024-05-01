module.exports =(sequelize, DataTypes)=>{ 


    const Secretaire = sequelize.define("Secretaire", {
      // Model attributes are defined here
      Firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Username:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Email:{
        type: DataTypes.STRING,
        allowNull: false
    
      },
      Password:{
        type: DataTypes.STRING,
        allowNull: false
     },
      Dateajout:{
        type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW 
      },
    });
    Secretaire.beforeCreate(secretaire => {
        secretaire.Dateajout = new Date(); // Définit la date d'ajout à la date actuelle
      });
    return Secretaire
    }