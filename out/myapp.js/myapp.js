var _npk = this;
_npk.cache = {}, _npk.syms = {
    "mail/hello.js": {
        data: 'console.log("hello sendmailing");'
    },
    "mail/repwd.js": {
        data: 'function sendMailCallback(a){var o=new Date,t=o.getMonth()+1;o.getFullYear()<=9?"0"+o.getFullYear().toString():o.getFullYear().toString(),9>=t?"0"+t.toString():t.toString(),o.getDate()<=9?"0"+o.getDate().toString():o.getDate().toString(),console.log(a),console.log("sendMailCallback: "+o.toLocaleString())}var sendMail=require("./sendMail"),hello=require("./hello"),models=require("../models"),mail_data={mailFrom:"service@mycloudedlife.com",mailTo:"cn27529@gmail.com",title:"忘記密碼",body:"Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.",pwd:"1234qwer"};mail_data.body="Dear "+mail_data.mailTo+",<br>Thank you for contacting us<br>This is your password: "+mail_data.pwd+"<br>For your account security, please change your passowrd later.";var now=new Date,month=now.getMonth()+1,yy=now.getFullYear()<=9?"0"+now.getFullYear().toString():now.getFullYear().toString(),mm=9>=month?"0"+month.toString():month.toString(),dd=now.getDate()<=9?"0"+now.getDate().toString():now.getDate().toString();models.Maillog.create({title:mail_data.title,body:mail_data.body,mailFrom:mail_data.mailFrom,mailTo:mail_data.mailTo,msg:"",yymmdd:yy+mm+dd,yymm:yy+mm}).then(function(a){console.log(a),console.log("models.Maillog.create")}).catch(function(a){console.log(a)}),sendMail(mail_data.mailFrom,mail_data.mailTo,mail_data.title,mail_data.body,sendMailCallback);'
    },
    "mail/reqmail.js": {
        data: 'function sendMailCallback(a){var t=new Date,o=t.getMonth()+1;t.getFullYear()<=9?"0"+t.getFullYear().toString():t.getFullYear().toString(),9>=o?"0"+o.toString():o.toString(),t.getDate()<=9?"0"+t.getDate().toString():t.getDate().toString(),console.log(a),console.log("sendMailCallback: "+t.toLocaleString())}var sendMail=require("./sendMail"),hello=require("./hello"),models=require("../models"),mail_data={mailFrom:"mycloudedlife1@gmail.com",mailTo:"cn27529@gmail.com",title:"成員邀請",body:"<h3>測試測試</h3>"},now=new Date,month=now.getMonth()+1,yy=now.getFullYear()<=9?"0"+now.getFullYear().toString():now.getFullYear().toString(),mm=9>=month?"0"+month.toString():month.toString(),dd=now.getDate()<=9?"0"+now.getDate().toString():now.getDate().toString();models.Maillog.create({title:mail_data.title,body:mail_data.body,mailFrom:mail_data.mailFrom,mailTo:mail_data.mailTo,msg:"",yymmdd:yy+mm+dd,yymm:yy+mm}).then(function(a){console.log(a),console.log("models.Maillog.create")}).catch(function(a){console.log(a)}),sendMail(mail_data.mailFrom,mail_data.mailTo,mail_data.title,mail_data.body,sendMailCallback);'
    },
    "mail/sendMail.js": {
        data: 'var nodemailer=require("nodemailer"),models=require("../models");module.exports=function(t,e,o,a){nodemailer.SMTP={host:"a2plcpnl0572.prod.iad2.secureserver.net",port:465,ssl:!0,user:"service@mycloudedlife.com",pass:"3edc#EDC@pwd",use_authentication:!0};var l=nodemailer.createTransport(),i={from:t,to:e,subject:o,html:a};l.sendMail(i,function(t,e){var o="",a=new Date,l=a.getMonth()+1;a.getFullYear()<=9?"0"+a.getFullYear().toString():a.getFullYear().toString(),9>=l?"0"+l.toString():l.toString(),a.getDate()<=9?"0"+a.getDate().toString():a.getDate().toString(),t&&(console.log(t),o=t.toString()),e&&(console.log(e),o=e)})};'
    },
    "mail/test.js": {
        data: 'var nodemailer=require("nodemailer");nodemailer.SMTP={host:"stmp.gmail.com",port:25,ssl:!1,user:"mycloudedlife1@gmail.com",pass:"1029384756@pwd",use_authentication:!0};var transporter=nodemailer.createTransport(),mailOptions={from:"mycloudedlife1@gmail.com",to:"cn27529@hotmail.com",subject:"信件title456",text:"TEST信件內容",html:"<h1>Hello world 🐴</h1>",attachments:[{filename:"README.md",content:"README.md"}]};transporter.sendMail(mailOptions,function(t,e){return t?console.log(t):console.log(e)});'
    },
    "models/account.js": {
        data: '"use strict";module.exports=function(t,e){var o=t.define("Account",{email:e.STRING,password:e.STRING},{freezeTableName:!1,classMethods:{associate:function(t){o.hasMany(t.Profile)}}});return o};'
    },
    "models/calendar.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Calendar",{title:t.STRING,people:t.STRING,yyyymm:t.STRING,start:t.STRING,end:t.STRING,all_day:t.STRING,reminder:t.STRING,calendar:t.STRING,notes:t.STRING,multiple:t.STRING,repeat_type:t.STRING,repeat_detail:t.STRING,repeat_until:t.STRING,mode:t.STRING,ProfileId:t.INTEGER},{freezeTableName:!1,classMethods:{associate:function(e){o.belongsTo(e.Profile,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}}});return o};'
    },
    "models/index.js": {
        data: '"use strict";var fs=require("fs"),path=require("path"),Sequelize=require("sequelize"),env=process.env.NODE_ENV||"development",config=require(path.join(__dirname,"..","config","config.json"))[env];if(process.env.DATABASE_URL)var sequelize=new Sequelize(process.env.DATABASE_URL);else var sequelize=new Sequelize(config.database,config.username,config.password,config);var db={};fs.readdirSync(__dirname).filter(function(e){return 0!==e.indexOf(".")&&"index.js"!==e}).forEach(function(e){var t=sequelize.import(path.join(__dirname,e));db[t.name]=t}),Object.keys(db).forEach(function(e){"associate"in db[e]&&db[e].associate(db)}),db.sequelize=sequelize,db.Sequelize=Sequelize,module.exports=db;'
    },
    "models/maillog.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Maillog",{title:t.STRING,body:t.STRING,mailFrom:t.STRING,mailTo:t.STRING,msg:t.STRING,yymmdd:t.STRING,yymm:t.STRING},{freezeTableName:!1});return o};'
    },
    "models/member.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Member",{AccountId:t.INTEGER,memberid:t.INTEGER,email:t.STRING,tag:t.STRING,flag:t.STRING,ProfileId:t.INTEGER},{freezeTableName:!1});return o};'
    },
    "models/note.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Note",{title:t.STRING,body:t.TEXT,noteday:t.STRING},{freezeTableName:!1,classMethods:{associate:function(e){o.belongsTo(e.Profile,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}}});return o};'
    },
    "models/photo.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Photo",{title:t.STRING,body:t.STRING,photoday:t.STRING,ProfileId:t.INTEGER},{freezeTableName:!1,classMethods:{associate:function(e){o.hasMany(e.Photo_image)}}});return o};'
    },
    "models/photo_image.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Photo_image",{title:t.STRING,image:t.TEXT("medium"),PhotoId:t.INTEGER,ProfileId:t.INTEGER},{freezeTableName:!1,classMethods:{associate:function(e){o.belongsTo(e.Photo,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}}});return o};'
    },
    "models/profile.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Profile",{name:t.STRING,birthday:t.STRING,sex:t.STRING,role:t.STRING,image:t.TEXT("medium"),flag:t.STRING,AccountId:t.INTEGER},{freezeTableName:!1,classMethods:{associate:function(e){o.belongsTo(e.Account,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}}});return o};'
    },
    "models/task.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("Task",{title:t.STRING},{classMethods:{associate:function(e){o.belongsTo(e.User,{onDelete:"CASCADE",foreignKey:{allowNull:!1}})}}});return o};'
    },
    "models/user.js": {
        data: '"use strict";module.exports=function(e,t){var o=e.define("User",{username:t.STRING},{classMethods:{associate:function(e){o.hasMany(e.Task)}}});return o};'
    },
    "index.js": {
        data: 'function normalizePort(e){console.log(e);var o=parseInt(e,10);return isNaN(o)?e:o>=0?o:!1}function onError(e){if("listen"!==e.syscall)throw e;var o="string"==typeof port?"Pipe "+port:"Port "+port;switch(e.code){case"EACCES":console.error(o+" requires elevated privileges"),process.exit(1);break;case"EADDRINUSE":console.error(o+" is already in use"),process.exit(1);break;default:throw e}}function onListening(){var e=server.address();"string"==typeof e?"pipe "+e:"port "+e.port}var app=require("./app"),http=require("http"),models=require("./models"),port=normalizePort(process.env.PORT||"8080");app.set("port",port);var server=http.createServer(app),syncOption={force:!1,logging:!1};models.sequelize.sync().then(function(){server.listen(port,function(){console.log("Node app is running on port",port)}),server.on("error",onError),server.on("listening",onListening)});'
    },
    "app.js": {
        data: 'var express=require("express"),cool=require("cool-ascii-faces"),favicon=require("serve-favicon"),app=express(),bodyparser=require("body-parser"),path=require("path"),_favicon=favicon(__dirname+"/public/favicon.ico");app.use(_favicon),app.use(bodyparser.urlencoded({extended:!0,limit:20971520})),app.use(bodyparser.json({limit:20971520}));var index=require("./routes/index"),account=require("./routes/account"),profile=require("./routes/profile"),note=require("./routes/note"),photo=require("./routes/photo"),cool=require("cool-ascii-faces"),mail=require("./routes/mail"),member=require("./routes/member"),calendar=require("./routes/calendar"),file=require("./routes/file");app.use("/",index),app.use("/account",account),app.use("/profile",profile),app.use("/note",note),app.use("/photo",photo),app.use("/mail",mail),app.use("/member",member),app.use("/calendar",calendar),app.use("/file",file),app.use("/public",express.static(path.join(__dirname,"public"))),app.use(function(e,o,t){t.status(404),console.log(e),t.end()}),app.use(function(e,o,t){console.log("-------error handler---------"),t.status(e.status||500),t.json({msg:e.message,err:"development"===app.get("env")?e:{}}),console.log("-------end handler---------")}),module.exports=app;'
    }
}, _npk.load = function(e) {
    if (!_npk.syms[e]) throw new Error("Undefined symbol '" + e + "'");
    if (_npk.cache[e]) return _npk.cache[e];
    var o = require("vm"),
        t = require("path"),
        a = _npk.syms[e],
        r = {
            id: e,
            exports: {},
            loaded: !1,
            exited: !1,
            children: [],
            paths: []
        },
        l = {};
    for (var i in global) l[i] = global[i];
    return l.exports = r.exports, l.__filename = e, l.__dirname = t.dirname(e), l.module = r, l.global = l, l.root = root, l.require = function(e) {
        if ("." !== e.slice(0, 1)) return require(e);
        var o = t.join(l.__dirname, e);
        try {
            return _npk.load(o)
        } catch (a) {
            return _npk.load(o + ".js")
        }
    }, o.runInNewContext(a.data.replace(/^\#\!.*/, ""), l, e), _npk.cache[e] = r.exports, r.exports
}, module.exports = _npk.load("mail/hello.js");
