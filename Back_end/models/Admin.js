module.exports =(sequelize, DataTypes)=>{ 


    const Admin = sequelize.define("Admin", {
      // Model attributes are defined here
      
      Username:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Password:{
        type: DataTypes.STRING,
        allowNull: false
     }
      
    });
    return Admin
    }