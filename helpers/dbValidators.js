const role = require('../models/role');
const {usuario,Categoria, Producto} = require('../models');


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

const existeCategoria = async( id ) => {
    const categoria = await Categoria.findById(id);
    if( !categoria ){
        throw new Error(`La categoria no existe`);
    }
};

const existeProducto = async( id ) => {
    const producto = await Producto.findById(id);
    if( !producto ){
        throw new Error(`El producto no existe`);
    }
};

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes(coleccion);
    if ( !incluida ) {
        throw new Error(`La coleccion ${coleccion} no es permitida - ${coleccionesPermitidas}`);
    };
    return true;    
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}