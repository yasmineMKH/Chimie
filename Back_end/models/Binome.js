const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Binome_Comission = sequelize.define("Binome_Comission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username_Nss1: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Username_Nss2: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Type_traitement: {
      type: DataTypes.ENUM("traitement_enseignant", "traitement_doctorant"),
      allowNull: false,
    },
  });

  return Binome_Comission;
};
