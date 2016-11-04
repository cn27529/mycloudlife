"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/photo_table.html
    var Calendar = sequelize.define("Calendar", {
        start: DataTypes.STRING, //2016/12/01
        ProfileId: DataTypes.INTEGER
    }, {
        freezeTableName: false,
        classMethods: {
            associate: function(models) {
                Calendar.hasMany(models.Calendar_event)
            }
        }
    });

    return Calendar;
};
