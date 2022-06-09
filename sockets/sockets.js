const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Scorpion' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Guns' ) );
bands.addBand( new Band( 'Metallica' ) );

console.log(bands);

console.log('init servers')
//Mensaje de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        io.emit('mensaje', { admin: 'David' });
    });

    client.on('emitir-mensaje', (payload)=>{
      //  console.log(payload)
      client.broadcast.emit('emitir-mensaje', payload);
    });


});