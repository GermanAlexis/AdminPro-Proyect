const { updateImage } = require('../helpers/updateImage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
  const colection = req.params.colection;
  const id = req.params.id;
  colectionValid = ['medics', 'hospitals', 'users'];
  if (!colectionValid.includes(colection)) {
    res.status(400).json({
      ok: false,
      mgs: `La Coleccion es incorrecta, debe ser de tipo  ${colectionValid}`,
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      mgs: 'no hay archivo seleccionado',
    });
  }

  // Select of image
  const file = req.files.imagen;
  // Get extension
  const extfile = file.name.split('.');
  const ext = extfile[extfile.length - 1];

  const extValid = ['jpg', 'jepg', 'gif', 'png'];

  if (!extValid.includes(ext)) {
    res.status(401).json({
      ok: false,
      msg: 'Extension Invalida',
    });
  }

  const rename = `${uuidv4()}.${ext}`;
  const path = `./uploads/${colection}/${rename}`;

  // move of file
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'no se pudo mover el archivo',
      });
    }

    updateImage(id, rename, colection);
    res.status(200).json({
      ok: true,
      msg: 'Archivo cargado',
      rename,
    });
  });
};

const downFile = (req, res) => {
  const colection = req.params.colection;
  const picture = req.params.picture;

  const pathImg = path.join(__dirname, `../uploads/${colection}/${picture}`);
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  uploadFile,
  downFile,
};
