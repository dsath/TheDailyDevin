var mariadb = require('mariadb/callback');

module.exports = {
  create: function() {
    var con = mariadb.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'devin',
      password: 'Deegu33!',
      database: 'blog'
    });
    return con;
  }
}
