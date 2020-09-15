require('dotenv').config();
const express = require('express');
const { dbconnetion } = require('./database/config');
const app = express();

// middware for read and parse from body

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbconnetion();

// Rotes
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medics', require('./routes/medics'));
app.use('/api/login', require('./routes/login'));
app.use('/api/users', require('./routes/users'));
app.use('/api/quests', require('./routes/quests'));

app.listen(process.env.PORT, () => {
  console.log(
    'Server escuchando en el puerto: \x1b[32m%s\x1b[0m',
    process.env.PORT
  );
});
