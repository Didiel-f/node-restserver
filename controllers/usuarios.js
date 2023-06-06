const { response } = require("express");


const usuariosGet = (req, res = response) => {

    const {q, nombre, apikey} = req.query;
    
    res.json({
        msg: 'API GET - controlador'
    });
};

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    res.json({
        msg: 'API POST - controlador'
    });
};
const usuariosPut = (req, res = response) => {

    const {id} = req.body.params;

    res.json({
        msg: 'API PUT - controlador'
    });
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'API PATCH - controlador'
    });
};
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'API DELETE - controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}