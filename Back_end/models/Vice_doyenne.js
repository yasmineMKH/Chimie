module.exports = (sequelize, DataTypes) => {
  const Vice_doyenne = sequelize.define("Vice_doyenne", {
    // Model attributes are defined here
    Firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dateajout: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
  Vice_doyenne.beforeCreate((vice_doyenne) => {
    vice_doyenne.Dateajout = new Date(); // Définit la date d'ajout à la date actuelle
  });
  return Vice_doyenne;
};
