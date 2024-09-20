
const express = require("express")
const router = express.Router()
//import express from "express";  //const express = require('express');
//import { login, register, logout } from "../controller/authController.js"; 
const { login, register, logout } = require('../controllers/authController');
const createToken = require('../controllers/hederaController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
//const router = express.Router() //const router = express.Router();

// Rutas de autenticación
router.post('/login', login);
router.post('/register', register);
router.post('/logout', authMiddleware, logout);

// Rutas de Hedera
router.post('/create-token-hedera', authMiddleware, createToken);
router.get('/list-tokens', authMiddleware, listTokens); // Nuevo endpoint para listar tokens


module.exports = router;










