require('dotenv').config();
const express = require('express')
const { dbconnetion } = require('./database/config')
const app = express()

// middware for read and parse from body

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbconnetion();

// Rotes

app.use('/api/user', require('./routes/users'))


app.listen( process.env.PORT, () => {
    console.log('Server escuchando en el puerto: \x1b[32m%s\x1b[0m', process.env.PORT);
}) 
