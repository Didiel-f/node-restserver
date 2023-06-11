const dbValidators = require('./dbValidators');
const generarJWT = require('./generar-jst');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    dbValidators,
    generarJWT,
    googleVerify,
    subirArchivo
}