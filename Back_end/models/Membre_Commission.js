const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Membre_Commission = sequelize.define("Membre_Commission", {
    Username_NSS: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Président: {
      type: DataTypes.ENUM("true", "false"),
      defaultValue: "false",
    },
    id_Binome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Membre_Commission;
};
