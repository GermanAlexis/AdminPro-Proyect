const Router = require('express');
const { getAll, getColection } = require('../controllers/quests');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/:word', [validateJWT], getAll);
router.get('/:colection/:word', [validateJWT], getColection);

module.exports = router;
