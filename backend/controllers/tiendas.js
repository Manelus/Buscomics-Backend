const bcrypt = require('bcrypt');
const {tiendas, tokens} = require('../models');
const jwt = require("jsonwebtoken");

const tiendaController = {};

tiendaController.signUp = async (req, res, next) => {
  
    const {nombre, email, password} = {...req.body};
    const userExists = await tiendas.findOne({
      where:{email: email}
    });
    const cryptPass = await bcrypt.hash(password,  8);
 
    if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'})};
  
    if (password.length < 6 ) return res.status(401).json({message: 'password incorrecto. Debe tener almenos 6 caracteres.'});
    
    const user = await tiendas.create({nombre: nombre, email: email, password: cryptPass});
  
    if( user === null) return res.status(500).json({message: 'Internal error. Please, let you contact with the administrator'})
    res.status(204).json({message: 'Tienda creada!'});
}

tiendaController.signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const tienda = await tiendas.findOne({
        where:{email:email}
      })

      if (!tienda) {
         return res.status(401).send({error: 'Login erroneo introduce los datos correctos'})
      }
      const isPasswordMatch = await bcrypt.compare(password, tienda.password);
      if(isPasswordMatch === null)return res.status(401).json("Incorrecto")
      const generarToken = jwt.sign({id:tienda.id, email: tienda.email, nombre: tienda.nombre}, process.env.JWT_SECRET)
      const login = await tokens.create({token: generarToken, idTienda: tienda.id})
      res.status(200).json({ "tienda": {email: tienda.email, "nombre": tienda.nombre, id: tienda.id }, token: generarToken })
    } catch (error) {
     console.error(error.message)
      res.status(400).send(error)
    }
}

tiendaController.logout = async (req, res) => {
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

tiendaController.delete = async (req, res, next) => {
  try {
    const deleteTienda = await tiendas.destroy({
      where: {
        id: req.tienda.id
      }
    });
    const token = await tokens.destroy({
      where: {
        token: req.token
      }
    })
    
    deleteTienda === 1 || token === 1 ? res.status(200).json('Tienda eliminada.') : res.status(200).json({});
  } catch (e) {
    console.log(e)
    res.status(500).json({});
  }
}

module.exports = tiendaController;