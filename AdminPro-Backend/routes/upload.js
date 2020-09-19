const Router = require('express');
const fileUpload = require('express-fileupload');

const { uploadFile, downFile } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(fileUpload());
router.put('/:colection/:id', [validateJWT], uploadFile);

router.get('/:colection/:picture', [validateJWT], downFile);

module.exports = router;
