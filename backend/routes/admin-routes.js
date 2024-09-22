const express = require('express');

const adminController = require('../controller/admin-controller');
const checkSuperAdmin = require('../middleware/checkSuperAdmin');

const router = express.Router();

router.post('/generate-invite', checkSuperAdmin, adminController.generateInvite);

router.post('/signup', adminController.signup);