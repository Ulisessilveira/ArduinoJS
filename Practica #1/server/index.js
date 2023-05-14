//ENCENDER EL SERVER
/*
OPCION 1 EN CMD npm start
OPCION 2 en powershell entar con cd a server y luego escribir node index.js
*/ 
const express = require('express')
const socketIo = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

//Ver si alguien se conecta al servidor
//mandar cosos al arduino
io.on('connection',(socket)=>{
    //Se conecta una pagina web
    console.log('A new socket connected')
    //manda cosas al arduino
    socket.on("message",(d)=>{
        if(d == 'a') mySerial.write('a')//ESTO MANDA LO QUE TU QUIERES AL ARDUINO, NO OLVIDAR
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

//Esto recibe los datos del arduino
mySerial.on('data', function(data){
    let values = data.toString().split("\r\n"); //Estos son los datos del arduino ta separados y metidos en un array
    pot = parseInt(values[0]);
    ultrasonico = parseInt(values[1]);
    temp = parseInt(values[2]);
    io.emit('pot', pot);//esto emite lo de la consola al archivo HTML
    io.emit('ultrasonico', ultrasonico);
    io.emit('temp', temp);
    console.log(`Pot: ${pot}, Ultrasonico: ${ultrasonico}, Temperatura: ${temp}`);//Esto es para imprimir los valores en la consola
});

mySerial.on('error', function(err){
    console.log(err.message)
});


//Puerto del servidor
server.listen(2001,()=>{
    console.log('Server on port ', 2001)
})