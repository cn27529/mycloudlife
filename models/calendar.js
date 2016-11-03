"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/photo_table.html
    var Calendar = sequelize.define("Calendar", {
        title: DataTypes.STRING,
        people: DataTypes.STRING, //people的存放前日與前端討論過, 用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存ProfileId
        start: DataTypes.STRING,
        end: DataTypes.STRING,
        all_day: DataTypes.STRING,
        reminder: DataTypes.STRING,
        calendar: DataTypes.STRING,
        notes: DataTypes.STRING,
        multiple: DataTypes.STRING, //multiple, 也是用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存'2016/12/12,2016,12/01'
        repeat_type: DataTypes.STRING,
        repeat_detail: DataTypes.STRING, //repeat_detail, 也是用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存'w1,w3,w5'
        repeat_until: DataTypes.STRING,
        mode: DataTypes.STRING,
        ProfileId: DataTypes.INTEGER
    });

    return Calendar;    
};
