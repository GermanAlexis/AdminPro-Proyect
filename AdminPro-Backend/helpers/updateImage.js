const fs = require('fs');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');
const User = require('../models/user');

const removeImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
const updateImage = async (id, rename, colection) => {
  let pathold = '';
  switch (colection) {
    case 'medics':
      const medic = await Medic.findById(id);

      if (!medic) {
        console.log('no existe medico con es id');
        removeImage(`./uploads/medics/${rename}`);
        return false;
      }
      pathold = `./uploads/medics/${medic.img}`;
      removeImage(pathold);

      medic.img = rename;
      await medic.save();
      return true;

    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('no existe Hospital con es id');
        removeImage(`./uploads/hospitals/${rename}`);
        return false;
      }
      pathold = `./uploads/hospitals/${hospital.img}`;
      removeImage(pathold);

      hospital.img = rename;
      await hospital.save();

      return true;

    case 'users':
      const user = await User.findById(id);

      if (!user) {
        console.log('no existe usuario con es id');
        removeImage(`./uploads/users/${rename}`);
        return false;
      }
      pathold = `./uploads/users/${user.img}`;
      removeImage(pathold);

      user.img = rename;
      await user.save();

      return true;
  }
}

module.exports = {
  updateImage,
};
