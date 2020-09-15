const Medic = require('../models/medic');

const getMedics = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [medic, total] = await Promise.all([
    Medic.find()
      .populate('hospital', 'name_hospital img')
      .populate('user', 'name img')
      .skip(desde)
      .limit(5),
    Medic.count(),
  ]);

  res.json({
    Ok: true,
    mgs: 'Todos los medicos',
    medics: medic,
    total,
  });
};

const createMedic = async (req, res) => {
  const uid = req.id;
  const medic = new Medic({
    user: uid,
    ...req.body,
  });
  try {
    const medicDB = await Medic.save();
    res.status(201).json({
      ok: true,
      Medic: medicDB,
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
  getMedics,
  createMedic,
  // updateMedic,
  // deleteMedic,
};
