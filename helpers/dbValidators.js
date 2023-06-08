const role = require('../models/role');
const usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {
    const existeRol = await role.findOne({rol});
    if( !existeRol ) {
        throw new Error('El rol no está en base de datos');
    }
};

const emailExiste = async(correo = '') => {
    const existeEmail = await usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

const existeUsuarioPorId = async(id) => {

    const existeUsuario = await usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id ${id} no existe`);
    }
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}