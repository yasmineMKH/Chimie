'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /*up: async(queryInterface, Sequelize) => {
      await queryInterface.addConstraint('enseignants', {
        fields: ['Departement'],
        type: 'foreign key',
        name: 'Enseignant_Departement_fk',
        references: {
          table: 'departements',
          field: 'NameD'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });*/
    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /*await queryInterface.removeConstraint('enseignants', 'Enseignant_Departement_fk');*/
  }
};
