const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const user = require('../models/user');

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

const googleSingIn = async (req, res) => {
  
  const googleToken = req.body.googleToken
  try {
    const {name, email, picture } = await googleVerify(googleToken)
    res.status(200).json({
      ok: true,
      msg: 'GoogleSingIn',
      name, email, picture
    })

    const userBD = await User.findOne({email})

    if(!userBD){
      user = new User([
      name,
      lastName = give_family,
      email,
      password = '@@',
      img = picture,
      google = true
    ])
    } else {
      user = userBD
      user.google = true
    }
    await user.save()

    const token = await generatorJWT(user.id);
    res.status(200).json({
      ok: true,
      msg: 'Login Exitoso',
      token: token,
    });

  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token Invalid',
      
    })
  }
}

const reNewToken = async (req, res) => {

  const uid = req.uid

  const token = await generatorJWT(uid);

  res.status(200).json({
    ok: true,
    token
  })

}
module.exports = {
  login,
  googleSingIn,
  reNewToken
};
