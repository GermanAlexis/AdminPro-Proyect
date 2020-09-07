const User = require('../models/user')

const getUsers = ( req, res ) => {
    res.json({
        Ok: true,
        Users: []
    })
}

const createUser = async ( req, res ) => {
     const { name, lastName, email, password } = req.body

     const user = new User(req.body)
    console.log(req.body);
    await user.save();

    res.json({
        Ok: true,
        user
    })
}
module.exports = {
    getUsers,
    createUser 
}