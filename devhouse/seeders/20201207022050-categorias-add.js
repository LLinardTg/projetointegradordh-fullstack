'use strict';
var categorias = require('../public/database/categoria.json')
categorias.forEach(p=>{
  p.createdAt= new Date(p.createdAt)
  p.updatedAt= new Date(p.updatedAt)
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('categorias',categorias , {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
