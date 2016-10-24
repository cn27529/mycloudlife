"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/photo_image_table.html
    var PhotoImage = sequelize.define("Photo_image", {
        title: DataTypes.STRING,
        image: DataTypes.TEXT,
        PhotoId: DataTypes.INTEGER,
        ProfileId: DataTypes.INTEGER
    }, {
      freezeTableName: false,
      classMethods: {
        associate: function(models) {
          PhotoImage.belongsTo(models.Photo, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });

    return PhotoImage;
};
