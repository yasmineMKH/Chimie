module.exports =(sequelize, DataTypes)=>{ 


    const Super_user = sequelize.define("Super_user", {
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
      Role:{
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
    Super_user.beforeCreate(Super_user => {
        Super_user.Dateajout = new Date(); // Définit la date d'ajout à la date actuelle
      });
    return Super_user
    }