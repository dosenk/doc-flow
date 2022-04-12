const express = require('express');

const router = express.Router();
const otmController = require('../controllers/otm.controller');
const baseController = require('../controllers/base.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// api для ОТМ
router.get('/otm', authMiddleware, otmController.getAllOtm);
router.get('/otm/:identy', otmController.getAllOtmByIdenty);
router.get('/otm/active', otmController.getActiveOtm);
router.get('/otm/active/:identy', otmController.getActiveOtmByIdenty);

// api для постановлений
router.get('/base', baseController.getAllBase);
router.get('/base/:number', baseController.getBaseByNumber);

// api users
router.get('/user', authMiddleware, userController.getAllUsers);
router.post('/user', authMiddleware, userController.addUser);
router.delete('/user', authMiddleware, userController.delUser);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;
