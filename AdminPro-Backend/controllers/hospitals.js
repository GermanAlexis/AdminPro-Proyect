const Hospital = require('../models/hospital');

const getHospitals = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [hospitals, total] = await Promise.all([
    Hospital.find().populate('user', 'name img').skip(desde).limit(5),
    Hospital.countDocuments(),
  ]);

  res.json({
    Ok: true,
    mgs: 'Todos los hospitales',
    hospitals,
    total,
  });
};

const createHospital = async (req, res) => {
  const uid = req.id;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });
  try {
    const hospitalDB = await hospital.save();
    res.status(201).json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminsitrador',
    });
  }
};
const updateHospital = async (req, res) => {
  const uid = req.params.id;

  try {
    const hospital = await Hospital.findById(uid);

    if (!hospital) {
      return res.status(400).json({
        ok: false,
        msg: `No se encontra Hospital con ese id ` + uid,
      });
    }

    res.status(200).json({
      ok: true,
      mgs: 'Hay un hospital',
      hospital: hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comunique al adminsitrador',
    });
  }
};
const deleteHospital = async (req, res) => {};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
