const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Departements = require("../models/Departement");
  const Doctorant = sequelize.define("Doctorant", {
    Username_Mat: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nom_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Prenoms_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nom_ab: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Prenoms_ab: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date_naiss: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Lieu_naiss: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nationalit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Statut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type_inscri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Filiere: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Domaine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Option: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Sexe: {
      type: DataTypes.ENUM("F", "M"),
      allowNull: false,
    },
    Adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Org_employ: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Dip_acces: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Dat_obten: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Lieu_obten: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    An_univer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Sujet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Dir_these: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Grade_dir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Lieu_exer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Code_dir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Grade_codir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    L_exer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Cdir_these: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    D_labo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Numero_telephone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    Grade: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    Laboratoire: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Departement: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    Usthb: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    President: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Promoteur: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    CLE: {
      type: DataTypes.ENUM("Inscrit", "Non Inscrit"),
      defaultValue: "Inscrit",
    },
    Etat_compte: {
      type: DataTypes.ENUM("true", "false"),
      defaultValue: "false",
    },
    Est_participe: {
      type: DataTypes.ENUM("true", "false"),
      defaultValue: "false",
    },
  });

  return Doctorant;
};
