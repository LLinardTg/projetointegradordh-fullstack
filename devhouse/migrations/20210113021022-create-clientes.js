'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.createTable('clientes', {
            idclientes: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefone: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            endereco: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            senha: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            cpf: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            cep: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        })
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('clientes');
    }
};