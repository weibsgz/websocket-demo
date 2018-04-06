var ws = require("nodejs-websocket")

var clientCont = 0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCont++;
    conn.nickname = "user" + clientCont;
    var mes = {
        type:'enter',
        data:conn.nickname + 'comes in'
    } 
    broadcast(JSON.stringify(mes))
    conn.on("text", function (str) {
        console.log("Received "+str)
        var mes = {
            type:'message',
            data:conn.nickname + ':' + str
        } 
        broadcast(JSON.stringify(mes))
        
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes = {
            type:'leave',
            data:conn.nickname + 'left'
        } 
        broadcast(JSON.stringify(mes))
    })
    conn.on("error", function (err) {
        console.log("error!")
        console.log(err)
    })
}).listen(8001)

function broadcast(str) {

    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}


console.log('websocket server is linstening at 8001')