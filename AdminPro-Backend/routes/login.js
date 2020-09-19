const { Router } = require('express');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/validate-campus');
const { login, googleSingIn, reNewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
  '/',
  [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el role es obligatorio').not().isEmpty(),
    validateCampus,
  ],
  login
);
router.post(
  '/google',
  [
    check('token', 'el token debe es obligatorio').not().isEmpty(),
    validateCampus,
  ],
  googleSingIn
);
router.get(
  '/renew',
  validateJWT
  ,reNewToken
  
)

module.exports = router;
