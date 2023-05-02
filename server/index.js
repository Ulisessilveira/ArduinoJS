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

//const parser = mySerial.pipe(new DelimiterParser({delimiter:'\n'}))

//const parser = new SerialPort.parsers.Readline()

//mySerial.pipe(parser)

//Mandar datos al arduino
/*parser.on('data',(line)=>{
    console.log(li)
    mySerial.write('a')
})*/

//Conexiones con el arduino, errores, datos impresos etc
mySerial.on('open',function(){
    console.log('Opened Serial Port')
});


mySerial.on('data', function(data){
    io.emit('pot', parseInt(data.toString()))
    console.log(parseInt(data.toString()))
});

mySerial.on('error', function(err){
    console.log(err.message)
});


//Puerto del servidor
server.listen(2001,()=>{
    console.log('Server on port ', 2001)
})