const User = require('../models/user');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');

const getAll = async (req, res) => {
  try {
    const word = req.params.word;
    const regex = new RegExp(word, 'i');

    const [users, medics, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Medic.find({ name_medic: regex }),
      Hospital.find({ name_hospital: regex }),
    ]);

    res.status(200).json({
      ok: true,
      msg: ' se enceontro ',
      users,
      medics,
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const getColection = async (req, res) => {
  try {
    const word = req.params.word;
    const colection = req.params.colection;
    const regex = new RegExp(word, 'i');

    let data = [];

    switch (colection) {
      case 'medics':
        data = await Medic.find({ name_medic: regex })
          .populate('hospital', 'name_hospital img')
          .populate('user', 'name img');
        break;
      case 'users':
        data = await User.find({ name: regex }, 'name lastName email');
        break;
      case 'hospitals':
        data = await Hospital.find({ name_hospital: regex }).populate(
          'user',
          'name img'
        );
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: 'la coleccion no se encuentra',
        });
        break;
    }

    res.status(200).json({
      ok: true,
      msg: ' se enceontro ',
      result: data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getAll,
  getColection,
};
