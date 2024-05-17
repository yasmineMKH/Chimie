const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SPE_doc = sequelize.define("SPE_doc", {
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
    Annee: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Certificat: {
      type: DataTypes.STRING(255), // Chemin du fichier photo
      allowNull: true,
    },
  });

  return SPE_doc;
};
