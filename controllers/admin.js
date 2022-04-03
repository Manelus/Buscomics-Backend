const bcrypt = require('bcrypt');
const {admin, tokens} = require('../models');
const jwt = require("jsonwebtoken");

const adminController = {};

adminController.signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const Admin = await admin.findOne({
        where:{email:email}
      })

      if (!Admin) {
         return res.status(401).send({error: 'Login erroneo introduce los datos correctos'})
      }
      const isPasswordMatch = await bcrypt.compare(password, Admin.password);
      if(isPasswordMatch === null)return res.status(401).json("Incorrecto")
      const generarToken = jwt.sign({id:Admin.id, email: Admin.email, nombre: Admin.nombre}, process.env.JWT_SECRET)
      const login = await tokens.create({token: generarToken, idAdmin: Admin.id})
      res.status(200).json({ "Admin": {email: Admin.email, "nombre": Admin.nombre, id: Admin.id }, token: generarToken })
    } catch (error) {
     console.error(error.message)
      res.status(400).send(error)
    }
}

adminController.logout = async (req, res) => {
  try {
    const token = await tokens.destroy({
      where: {
        token: req.token
    }
    })
    token === 1 ? res.status(200).json('Logout completado') : res.status(401).json('No se ha encontrado ningun token');
    
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};


module.exports = adminController;