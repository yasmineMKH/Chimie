const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Session = sequelize.define("Session", {
    Nom_S: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Est_ouverte: {
      type: DataTypes.ENUM("true", "false"),
      defaultValue: "false",
    },
  });
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log(
        "La base de données a été reconstruite (toutes les tables ont été supprimées et recréées)."
      );
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la synchronisation de la base de données:",
        err
      );
    });
  return Session;
};
