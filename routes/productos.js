const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/dbValidators');


const router = Router();

// Todos los productos
router.get('/', obtenerProductos);

//Un producto por id
router.get('/:id', [
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto);

//Crear producto (privado) token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto);

//Actualizar producto (privado) token
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto);

//Borrar producto (privado) token
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto);

module.exports = router;