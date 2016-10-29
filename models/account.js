"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/account_table.html

    var Account = sequelize.define("Account", {
        email: DataTypes.STRING,
        password: DataTypes.STRING
        //credate: DataTypes.STRING
    }, {
      freezeTableName: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      classMethods: {
        associate: function(models) {
          Account.hasMany(models.Profile)
        }
      }
    });

    return Account;

};
