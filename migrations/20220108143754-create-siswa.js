'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('siswa', {
      nisn: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nis: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      no_tlp: {
        type: Sequelize.STRING
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kelas',
          key: 'id_kelas'
        }
      },
      id_spp: {
        type: Sequelize.INTEGER,
        references: {
          model: 'spp',
          key: 'id_spp'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('siswa');
  }
};