const express = require('express')
const socketIo = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

//Ver si alguien se conecta al servidor
io.on('connection',(socket)=>{
    console.log('A new socket connected')
    socket.on("message",(d)=>{
        if(d == 'a') mySerial.write('a')
        else if(d == 'b') mySerial.write('b')
    })
})

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname + '/index.html')
})

//Importar serialport
const SerialPort = require('serialport').SerialPort
//const { DelimiterParser } = require('@serialport/parser-delimiter')

//Conexxion con el arduino
const mySerial = new SerialPort({
    path: 'COM5',
    baudRate: 9600
});

//Conexiones con el arduino, errores, datos impresos etc
mySerial.on('open',function(){
    console.log('Opened Serial Port')
});


/*mySerial.on('data', function(data){
    io.emit('pot', parseInt(data.toString()))
    console.log(parseInt(data.toString()))
});*/

let potA = 0;
let potB = 0;

mySerial.on('data', function(data){
    let values = data.toString().split("\r\n");
    potA = parseInt(values[0]);
    potB = parseInt(values[1]);
    io.emit('pot', potA);
    io.emit('potB', potB);
    console.log(`Pot A: ${potA}, Temperatura: ${potB}`);
});

mySerial.on('error', function(err){
    console.log(err.message)
});


//Puerto del servidor
server.listen(2001,()=>{
    console.log('Server on port ', 2001)
})