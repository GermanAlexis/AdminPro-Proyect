const { Router } = require('express');
const { check } = require('express-validator');
const {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic,
} = require('../controllers/medic');
const { validateCampus } = require('../middlewares/validate-campus');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getMedics);
router.post(
  '/',
  [
    validateJWT,
    check('name_medic', 'el nombre es obligatorio').not().isEmpty(),
    check('hospital', 'el id del Hospital debe ser valido').isMongoId(),
    validateCampus,
  ],
  createMedic
);
router.put(
  '/:id',
  [
    validateJWT,
    check('name_medic', 'el nombre es obligatorio').not().isEmpty(),
    check('area_medic', 'el area es obligatorio').not().isEmpty(),
    validateCampus,
  ],
  updateMedic
);

router.delete('/:id', validateJWT, deleteMedic);
module.exports = router;
