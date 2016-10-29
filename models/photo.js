"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/photo_table.html
    var Photo = sequelize.define("Photo", {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        photoday: DataTypes.STRING,
        ProfileId: DataTypes.INTEGER
    }, {
        freezeTableName: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        classMethods: {
            associate: function(models) {
                Photo.hasMany(models.Photo_image)
            }
        }
    });

    return Photo;
};
