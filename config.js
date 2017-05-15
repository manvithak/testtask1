    var Sequelize = require('sequelize');
    var connection = new Sequelize('wallet', 'root', 'code123', {
    host: 'localhost',
    dialect: 'mysql'
    });

    connection.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

    module.exports = connection;