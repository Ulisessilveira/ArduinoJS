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

let pot = 0;
let ultrasonico = 0;
let temp = 0;

mySerial.on('data', function(data){
    let values = data.toString().split("\r\n");
    pot = parseInt(values[0]);
    ultrasonico = parseInt(values[1]);
    temp = parseInt(values[2]);
    io.emit('pot', pot);
    io.emit('ultrasonico', ultrasonico);
    io.emit('temp', temp);
    console.log(`Pot: ${pot}, Ultrasonico: ${ultrasonico}, Temperatura: ${temp}`);
});

mySerial.on('error', function(err){
    console.log(err.message)
});


//Puerto del servidor
server.listen(2001,()=>{
    console.log('Server on port ', 2001)
})