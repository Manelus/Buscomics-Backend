const Sequelize = require("sequelize");
const {comics} = require('../models');
const Op = Sequelize.Op;

const comicController = {};

comicController.getAll = async function (req, res){
    const comic = await comics.findAll();
    res.status(200).json(comic);
}

comicController.getByName = async function (req, res){
  try {
      const nombre = await comics.findAll({ where:
          { nombre:{
           [Op.like]: `%${req.params.nombre}%`
          }}
      })
  
      const autor = await comics.findAll({ where:
          { autor:{
           [Op.like]: `%${req.params.nombre}%`
          }}
      })

      const personaje = await comics.findAll({ where:
        { personaje:{
         [Op.like]: `%${req.params.nombre}%`
        }}
    })

      const resultado = nombre.concat(autor, personaje)

      return res.status(200).json({resultado: resultado, nombre: nombre, autor: autor, personaje: personaje})
  } catch (error) {
      return res.status(500).json({
          message:
          error.message || "A ocurrido un error."
      })
  }
};

comicController.create = async (req, res) => {
    try {
      const { nombre, precio, autor, personaje, imagen, nombre_tienda, enlace} = req.body;
      const newComic = await comics.create({nombre, precio, autor, personaje, imagen, nombre_tienda, enlace});
      res.status(200).json(newComic);
    } catch (error) {
      res.status(500).send('no se ha podido registrar');
    }
};

comicController.update = async (req, res) => {
    try {
        const { id, nombre, precio, autor, personaje, imagen, nombre_tienda, enlace } = req.body;
        const newComic = await comics.update({

            nombre: nombre,
            precio: precio,
            autor: autor,
            personaje: personaje,
            imagen: imagen,
            nombre_tienda: nombre_tienda,
            enlace: enlace
        }, {
          where: {id: id}
        });
        res.status(200).json(newComic);
    } catch (error) {
        res.status(500).json({});
    }
}

comicController.delete = async (req, res) => {
    const id = req.params.id;
  
    comics.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El comic fue eliminado!"
          });
        } else {
          res.send({
            message: `No se ha podido eliminar el comic con id=${id}. El comic no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar el comic " + id
        });
      });
};




module.exports = comicController;