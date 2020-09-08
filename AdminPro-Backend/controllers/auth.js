const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userBD = await User.findOne({ email });
    if (!userBD) {
      res.status(404).json({
        ok: false,
        msg: 'Algo no coincide, revisar email',
      });
    }
    const validPass = bcrypt.compareSync(password, userBD.password);
    if (!validPass) {
      res.status(400).json({
        ok: false,
        msg: 'Algo no coincide, revisar password',
      });
    }

    const token = await generatorJWT(userBD.id);
    res.status(200).json({
      ok: true,
      msg: 'Login Exitoso',
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador',
    });
  }
};

module.exports = {
  login,
};
