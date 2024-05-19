const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SPE_doc = sequelize.define("SPE_doc", {
    Username_Mat: {
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
    certificat: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Document: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_Binome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });

  return SPE_doc;
};
