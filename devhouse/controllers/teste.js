const { sequelize, Categoria } = require('../models');

Categoria.findAll().then(r=>console.log(r[0].dataValues.idcategorias))

