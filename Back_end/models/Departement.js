const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Departements = sequelize.define("Departements", {
    NameD: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  return Departements;
};
