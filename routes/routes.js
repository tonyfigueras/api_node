
const express = require("express")
const router = express.Router()
const authController = require('../controllers/authController');
const hederaController = require('../controllers/hederaController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authMiddleware, authController.logout);

router.post('/create-token-hedera', authMiddleware, hederaController.createToken);
router.get('/list-tokens', authMiddleware, hederaController.listTokens);


module.exports = router;










