const jwt = require('jsonwebtoken');

const generatorJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.KEY_JWT,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se genero jwt');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generatorJWT,
};
