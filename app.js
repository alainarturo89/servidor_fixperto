const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const session = require('cookie-session');
const compression = require('compression');

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
app.use(helmet());
app.use(session({
    name: 'servidor_fixperto-session',
    keys: ['secret123', 'meerewwer'],
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'fixperto.com',
        path: 'foo/bar',
        expires: expiryDate
    }
}));
app.use(compression());

/*Estableciendo rutas*/
app.use('/seguridad', require('./routes/seguridad'));

/*
 * Cargando configuracion
 */
if (!global.hasOwnProperty("config")) {
    const conf = require("./conf/db");
    global.config = {bd: conf.mysql};
}

/*
 * Configuracion de la BD
 */
if (!global.hasOwnProperty("bd")) {
    const mysql = require('mysql');
   global.bd = mysql.createConnection(global.config.bd);
}

module.exports = app;