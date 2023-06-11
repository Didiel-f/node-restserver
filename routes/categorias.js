const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/dbValidators');



const router = Router();

// Todas las categorias
router.get('/', obtenerCategorias);

//Una categoría por id
router.get('/:id', [
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria);

//Crear categoría (privado) token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categoría (privado) token
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

//Borrar categoría (privado) token
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria);
module.exports = router;