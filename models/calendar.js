"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/photo_table.html
    //people的存放前日與前端討論過, 用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存ProfileId
    var Calendar = sequelize.define("Calendar", {
        title: DataTypes.STRING,
        people: DataTypes.STRING,
        start: DataTypes.STRING,
        end: DataTypes.STRING,
        all_day: DataTypes.STRING,
        reminder: DataTypes.STRING,
        calendar: DataTypes.STRING,
        notes: DataTypes.STRING,
        multiple: DataTypes.STRING,
        repeat_type: DataTypes.STRING,
        repeat_detail: DataTypes.STRING,
        repeat_until: DataTypes.STRING,
        mode: DataTypes.STRING,
        ProfileId: DataTypes.INTEGER
    });

    return Calendar;    
};
