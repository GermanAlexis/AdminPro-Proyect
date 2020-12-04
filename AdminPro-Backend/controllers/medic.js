const Medic = require('../models/medic');

const getMedics = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [medic, total] = await Promise.all([
    Medic.find()
      .populate('hospital', 'name_hospital img')
      .populate('user', 'name img')
      .skip(desde)
      .limit(5),
    Medic.countDocuments(),
  ]);

  res.json({
    Ok: true,
    msg: 'Todos los medicos',
    medics: medic,
    total,
  });
};


const getById = async (req, res) => {
  const mid = req.params.id
  try {
    
    const medic = await Medic.findById(mid)
    .populate('hospital', 'name_hospital img')
    .populate('user', 'name img');
      
    res.status(200).json({
    Ok: true,
    msg: 'Medico Encontrado',
    medic,
    });

  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: `hay un error ver console`
    })
  }
};

const createMedic = async (req, res) => {
  const uid = req.uid.uid;

  const medic = new Medic({
    user: uid,
    ...req.body,
  });
  try {
    const medicDB = await medic.save();
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

const updateMedic = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid.uid;

  try {
    const medic = await Medic.findById(id);

    if (!medic) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontro ningun medico con ese id ${id}`,
      });
    }
    const changeData = {
      ...req.body,
      user: uid,
    };

    const medicUpdated = await Medic.findByIdAndUpdate(id, changeData, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      msg: ' el medico se actuliazo con exito ',
      medic: medicUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el adminsitrador',
    });
  }
};

const deleteMedic = async (req, res) => {
  const id = req.params.id;

  try {
    const medic = await Medic.findById(id);

    if (!medic) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontro ningun medico con ese id ${id}`,
      });
    }

    const medicUpdated = await Medic.findByIdAndRemove(id);
    res.status(200).json({
      ok: true,
      msg: ' el medico se elimino con exito ',
      medic: medicUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el adminsitrador',
    });
  }
};
module.exports = {
  getMedics,
  getById,
  createMedic,
  updateMedic,
  deleteMedic,
};
