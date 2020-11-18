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
  const uid = req.uid.uid;
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
  const id = req.params.id;
  const uid = req.uid.uid;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontra Hospital con ese id ` + uid,
      });
    }
    const changeData = {
      ...req.body,
      user: req.uid.uid,
    };
    // console.log(req);

    const updateHospital = await Hospital.findByIdAndUpdate(id, changeData, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      mgs: 'Se actualizo con exito el hospital',
      hospital: updateHospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comunique al adminsitrador',
    });
  }
};
const deleteHospital = async (req, res) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontra Hospital con ese id ` + uid,
      });
    }

    const removeHospital = await Hospital.findByIdAndRemove(id);
    res.status(200).json({
      ok: true,
      mgs: 'hospital removido',
      hospital: removeHospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Comunique al adminsitrador',
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
