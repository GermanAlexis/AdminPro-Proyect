const Router = require('express');
const fileUpload = require('express-fileupload');

const { uploadFile } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(fileUpload());
router.put('/:colection/:id', [validateJWT], uploadFile);

module.exports = router;
