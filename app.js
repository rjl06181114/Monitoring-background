/**
 * Module dependencies.
 */
var express = require('express'),
    path = require('path'),
    streams = require('./app/streams.js')();

var favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// routing
require('./app/routes.js')(app, streams);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io').listen(server);
require('./app/socketHandler.js')(io, streams);


const os = require('os');
///////////////////获取本机ip///////////////////////
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();



var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('close', () => {
    console.log('socket已关闭');
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('socket正在监听中...');
    server.setBroadcast(true); //开启广播
    server.setTTL(128); //路由一跳TTL减一，减到零抛弃数据包
    setInterval(() => {
        //  sendMsg();
        server.send('大家好啊，我是服务端.', 8061, '192.168.0.255');
        console.log("send message");
    }, 1500);

    //在send {msg=close} 可以发送 colse 事件
});
//通过message事件接收数据，
server.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
});
//绑定，要接收数据的话必须绑定
server.bind('8060', myHost);

/**
 * Socket.io event handling
 */