const Hospital = require('../models/hospital');

const getHospitals = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const hospitals = await Hospital.find()
    .populate('user', 'name img')
    .skip(desde)
    .limit(5);
  const total = await Hospital.count();
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

module.exports = {
  getHospitals,
  createHospital,
};
