const mongoose = require('mongoose');
const dbconnetion = async () => {

    try {
        
        await mongoose.connect(process.env.dbconnetion,
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
70752096
module.exports = {
    dbconnetion
}