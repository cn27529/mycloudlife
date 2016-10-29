"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/note_table.html
    var Maillog = sequelize.define("Maillog", {
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        mailForm: DataTypes.STRING,
        mailTo: DataTypes.STRING,
        msg: DataTypes.STRING,
        yymmdd: DataTypes.STRING
    }, {
        freezeTableName: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    return Maillog;
};
