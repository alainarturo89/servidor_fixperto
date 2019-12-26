/**
 *Dependencia de modulos.
 */
const app = require('../app');
const debug = require('debug')('servidor_fixperto:server');
const http = require('http');

/**
 * Obteniendo y estableciendo el puerto.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Creando el servidor http.
 */

const server = http.createServer(app);

/**
 * Escuchando por el puerto proporcionado.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Funcion para normalizar el puerto en un numero, string, o false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) { return val; }

    if (port >= 0) { return port; }

    return false;
}

/**
 * Funcion del evento error para el servidor HTTP.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Mensajes especifico para el tipo de error.
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requiere de privilegios elevados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' esta en uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Funcion para el evento de escucha para el servidor HTTP.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
