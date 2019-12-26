const express = require('express');
const router = express.Router();

const seguridad = require('../controllers/seguridad');
const util = require('../controllers/util');
const validator = require('../validators/user');

/**
 * Autentication
 */
router.post('/login', seguridad.login);
router.post('/logout', seguridad.logout);

/**
 * Usuario
 */
router.post('/getUsers', util.restrict, seguridad.getUsers);
router.post('/getUser', util.restrict, seguridad.getUser);
router.post('/addUser', util.restrict, validator.store, seguridad.addUser);
router.post('/updateUser', util.restrict, seguridad.updateUser);
router.post('/removeUser', util.restrict, seguridad.removeUser);


/**
 * Rol
 */
router.post('/getRoles', util.restrict, seguridad.getRoles);
router.post('/getRol', util.restrict, seguridad.getRol);
router.post('/addRol', util.restrict, validator.store, seguridad.addRol);
router.post('/updateRol', util.restrict, seguridad.updateRol);
router.post('/removeRol', util.restrict, seguridad.removeRol);

module.exports = router;
