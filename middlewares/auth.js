const jwt = require("jsonwebtoken");
const {tiendas} = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const tienda = await tiendas.findOne({
        where: {
          id: data.id
        }
    });
    if (!tienda) return res.status(401).json('Introduce un token válido')
    req.tienda = tienda;
    req.token = token;
    
    next();
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;