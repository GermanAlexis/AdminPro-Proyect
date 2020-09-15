const Router = require('express');
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospitals');
const { validateCampus } = require('../middlewares/validate-campus');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');

const router = Router();

router.get('/', [], getHospitals);
router.post(
  '/',
  [
    validateJWT,
    check('name_hospital', 'El nombre es necesario'),
    validateCampus,
  ],
  createHospital
);
// router.put('/', [], updateHospital);
// router.delete('/', [], deleteHospital);

module.exports = router;
