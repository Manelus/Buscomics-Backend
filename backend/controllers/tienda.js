const { user } = require('../models/tiendas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const TiendaController = {}; //Create the object controller

//-------------------------------------------------------------------------------------
//Login user with database
//get user
TiendaController.signIn = (req, res) =>{
        let { email, password } = req.body;
        // Buscar usuario
        user.findOne({ where: { email: email }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "Tienda con este correo no encontrado" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    // Creamos el token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    };


//-------------------------------------------------------------------------------------
//REGISTER new user in database
//create user
TiendaController.signUp = (req, res)=> {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Crear un usuario
        user.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: password
        }).then(user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });
};
//-------------------------------------------------------------------------------------
//Logout user in database
//get user
TiendaController.logout = async (req, res, next) => { 
    try {
      const deleteToken = await token.destroy({
        where: {
          id: req.user.id
        }
      });
      deleteToken >= 1 ? res.status(200).json('Logout All.') : res.status(200).json({});
    } catch (e) {
      res.status(500).json({});
    }
}
        



module.exports = TiendaController;
