const {comics} = require('../models');

const comicController = {};

comicController.getAll = async function (req, res){
    const comic = await comics.findAll();
    res.status(200).json(comic);
}

comicController.getByName = async function (req, res){
    comics.findAll({ where: { nombre: req.params.nombre } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "A ocurrido un error."
        });
      });
  };

comicController.getByAutor = async function (req, res){
    comics.findAll({ where: { autor: req.params.autor } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "A ocurrido un error."
        });
      });
  };

comicController.getByPersonaje = async function (req, res){
    comics.findAll({ where: { personaje: req.params.personaje } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "A ocurrido un error."
        });
      });
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

comicController.deleteAll = (req, res) => {
    comics.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} comics se han eliminado!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error en la eliminacion."
        });
      });
  };


module.exports = comicController;