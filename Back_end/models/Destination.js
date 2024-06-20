const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Destination = sequelize.define("Destination", {
    Username_NSS: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Pays: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Ville: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Etablissement_acc: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Date_dep: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Date_retour: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Periode_Stage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Theme_communication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Theme_rencontre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    frais: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Destination;
};
