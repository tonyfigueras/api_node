
const express = require("express")
const router = express.Router()
//const bookController = require('../controllers/book.controller')
//const { login, register, logout } = require('../controllers/authController');
const authController = require('../controllers/hederaController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
router.post('/login', authController);
router.post('/register', authController);
router.post('/logout', authMiddleware, authController);

router.post('/create-token-hedera', authMiddleware, createToken);
router.get('/list-tokens', authMiddleware, listTokens);


module.exports = router;










