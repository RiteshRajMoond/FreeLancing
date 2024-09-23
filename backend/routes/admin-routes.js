const express = require('express');

const adminController = require('../controller/admin-controller');
const checkSuperAdmin = require('../middleware/checkSuperAdmin');

const router = express.Router();

router.post('/generate-invite', checkSuperAdmin, adminController.generateInvite);

router.post('/signup', adminController.signup);

router.post('/login', adminController.login);

router.get('/logout', adminController.logout);

module.exports = router;