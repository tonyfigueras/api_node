
const express = require("express")
const router = express.Router()
const { login, register, logout } = require('../controllers/authController');
const createToken = require('../controllers/hederaController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
router.post('/login', login);
router.post('/register', register);
router.post('/logout', authMiddleware, logout);

router.post('/create-token-hedera', authMiddleware, createToken);
router.get('/list-tokens', authMiddleware, listTokens);


module.exports = router;










