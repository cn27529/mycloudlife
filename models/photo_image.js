"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/photo_image_table.html
    var Photo_image = sequelize.define("Photo_image", {
        title: DataTypes.STRING,
        image: DataTypes.TEXT('medium'),
        PhotoId: DataTypes.INTEGER,
        ProfileId: DataTypes.INTEGER
    }, {
      freezeTableName: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      classMethods: {
        associate: function(models) {
          Photo_image.belongsTo(models.Photo, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });

    return Photo_image;
};
