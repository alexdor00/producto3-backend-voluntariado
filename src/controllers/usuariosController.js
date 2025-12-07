import { db } from '../data/dataStore.js';

/**
 * Obtiene todos los usuarios del sistema
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Object} JSON con array de usuarios
 */
export const obtenerUsuarios = (req, res) => {
    try {
        res.json({
            ok: true,
            total: db.usuarios.length,
            usuarios: db.usuarios
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

/**
 * Crea un nuevo usuario en el sistema
 * @param {Object} req - Request con datos del usuario en body
 * @param {Object} res - Response de Express
 * @returns {Object} JSON con usuario creado
 */
export const crearUsuario = (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        
        // Validar datos
        if (!nombre || !email || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Faltan datos obligatorios: nombre, email, password'
            });
        }
        
        // Verificar si el email ya existe
        const existe = db.usuarios.find(u => u.email === email);
        if (existe) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El email ya está registrado'
            });
        }
        
        // Crear usuario
        const nuevoUsuario = {
            id: db.nextUsuarioId(),
            nombre,
            email,
            password,
            rol: rol || 'usuario'
        };
        
        db.usuarios.push(nuevoUsuario);
        
        res.status(201).json({
            ok: true,
            mensaje: 'Usuario creado correctamente',
            usuario: nuevoUsuario
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al crear usuario',
            error: error.message
        });
    }
};

/**
 * Elimina un usuario por su email
 * @param {Object} req - Request con email en params
 * @param {Object} res - Response de Express
 * @returns {Object} JSON confirmando la eliminación
 */
export const borrarUsuario = (req, res) => {
    try {
        const { email } = req.params;
        
        const index = db.usuarios.findIndex(u => u.email === email);
        
        if (index === -1) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        
        const usuarioEliminado = db.usuarios.splice(index, 1)[0];
        
        res.json({
            ok: true,
            mensaje: 'Usuario eliminado correctamente',
            usuario: usuarioEliminado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar usuario',
            error: error.message
        });
    }
};

/**
 * Autentica un usuario (login)
 * @param {Object} req - Request con email y password en body
 * @param {Object} res - Response de Express
 * @returns {Object} JSON con datos del usuario autenticado
 */
export const loginUsuario = (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Email y contraseña son obligatorios'
            });
        }
        
        const usuario = db.usuarios.find(u => 
            u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        
        if (usuario.password !== password) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Contraseña incorrecta'
            });
        }
        
        res.json({
            ok: true,
            mensaje: 'Login exitoso',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el login',
            error: error.message
        });
    }
};