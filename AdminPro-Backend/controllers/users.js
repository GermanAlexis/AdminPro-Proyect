const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [users, total] = await Promise.all([
    User.find({}, 'name lastName email google').skip(desde).limit(5),
    User.count(),
  ]);

  res.json({
    Ok: true,
    mgs: 'All User',
    users,
    total,
  });
};

const createUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        ok: false,
        mgs: 'the user exist',
      });
    }

    const user = new User(req.body);
    const token = await generatorJWT(user.id);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    res.status(201).json({
      Ok: true,
      mgs: 'User Created',
      user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado ... ver logs',
    });
  }
};

const updateUser = async (req, res) => {
  const uid = req.params.id;
  try {
    const userBD = await User.findById(uid);

    if (!userBD) {
      res.status(404).json({
        ok: false,
        msg: 'el Usuario no existe con ese id',
      });
    }
    const { password, google, email, ...campus } = req.body;
    if (userBD.email !== email) {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        res.status(400).json({
          ok: false,
          msg: 'el email ya existe en otro usuario',
        });
      }
    }
    campus.email = email;
    const userUpdate = await User.findByIdAndUpdate(uid, campus, { new: true });

    res.status(200).json({
      ok: true,
      msg: 'Se actualizo con exito',
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;
  const userdelete = await User.findByIdAndDelete(uid);

  if (!userdelete) {
    res.status(404).json({
      ok: false,
      msg: 'El usuario no existe',
    });
  } else {
    res.status(200).json({
      ok: true,
      msg: 'usuario eliminado',
      user: userdelete,
    });
  }
};
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
