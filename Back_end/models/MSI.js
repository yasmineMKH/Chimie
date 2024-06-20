const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MSI = sequelize.define("MSI", {
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
    Note1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Note2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Note_finale: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Decision: {
      type: DataTypes.ENUM("true", "false"),
      defaultValue: "false",
    },
    Username_NSS3: {
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
    Document: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_Binome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Note1By: {
      type: DataTypes.STRING,
      allowNull: true,
    }, // Member who entered Note1
    Note2By: {
      type: DataTypes.STRING,
      allowNull: true,
    }, // Member who entered Note2
    is_locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    locked_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return MSI;
};
