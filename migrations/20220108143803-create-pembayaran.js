'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pembayaran', {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      bulan_spp: {
        type: Sequelize.INTEGER
      },
      tahun_spp: {
        type: Sequelize.INTEGER
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'petugas',
          key: 'id_petugas'
        }
      },
      nisn: {
        type: Sequelize.STRING,
        references: {
          model: 'siswa',
          key: 'nisn'
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
    await queryInterface.dropTable('pembayaran');
  }
};