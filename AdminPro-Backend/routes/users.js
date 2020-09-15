const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const { validateCampus } = require('../middlewares/validate-campus');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);
router.post(
  '/',
  [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el Apellido es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validateCampus,
  ],
  createUser
);
router.put(
  '/:id',
  [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el Apellido es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').not().isEmpty(),
    validateCampus,
  ],
  updateUser
);

router.delete('/:id', deleteUser);
module.exports = router;
