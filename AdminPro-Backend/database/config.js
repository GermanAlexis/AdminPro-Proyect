const mongoose = require('mongoose');
const dbconnetion = async () => {

    try {
        
        await mongoose.connect(process.env.DBCONECCTION,
        { useNewUrlParser: true, 
          useUnifiedTopology: true,
          useCreateIndex: true
        });   
        console.log('Database: \x1b[32m%s\x1b[0m', 'online');
    } catch (error) {
        console.log('aqui esta el error ', error);
        throw new Error(' Error al iniciar1 BD');
    }
}
module.exports = {
    dbconnetion
}
