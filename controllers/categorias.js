const { response } = require("express");
const { Categoria } = require("../models");



// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    

    const [ categorias, total ] = await Promise.all([
        Categoria.find({estado:true})
            .skip(desde)
            .limit(limite)
            .populate('usuario'),
        Categoria.countDocuments({estado:true})
    ]);
    

    res.json({
        total,
        categorias
    });
};

// obtenercategoria - populate
const obtenerCategoria = async(req, res = response) => {

    const {id} = req.params;
    
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
};

const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: 'La categoría ya existe'
        });
    };

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(401).json(categoria);
    
};

// actualizar Categoria
const actualizarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate( id, data, {new:true} );

    res.json(categoria);
}

// borrarCategoria
const borrarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, {estado:false}, {new:true} );

    res.json(categoria);
    
};



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
};