const express = require('express');
const router = express.Router();
const { signup, login} = require('../controllers/auth.Controller');
const { signupValidation, loginValidation } = require('../middleware/auth.middleware');
// const authorizeRoles = require('../Middleware/AuthoriseRole');
const jwt = require('jsonwebtoken');

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;