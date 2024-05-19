const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Annee = sequelize.define("Annee", {
    Annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Budget_global: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Budget_ens: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Budget_doc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  return Annee;
};

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

syncDatabase();
