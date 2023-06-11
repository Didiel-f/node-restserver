const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jst");
const { googleVerify } = require("../helpers/google-verify");


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / pass no son correctos'
            });
        }

        // Usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'user false'
            });
        }

        // Contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'password'
            });
        }

        // JWT
        const token = await generarJWT( usuario.id );
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
    res.json({
        msg: 'ok'
    });
};

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ";P",
                img,
                rol: "USER_ROLE",
                google: true,
              };

           usuario = new Usuario( data );
           await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el admin, user block'
            });
        }

        const token = await generarJWT( usuario.id );

        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token no se pudo verificar',
        });
    }

};

module.exports = {
    login,
    googleSignIn
};