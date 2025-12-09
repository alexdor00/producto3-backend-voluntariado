
import express from 'express';
import { 
    obtenerUsuarios, 
    crearUsuario, 
    borrarUsuario, 
    loginUsuario 
} from '../controllers/usuariosController.js';

const router = express.Router();

/**
 * @route GET /api/usuarios
 * @description Obtener todos los usuarios
 * @access Public
 */
router.get('/', obtenerUsuarios);

/**
 * @route POST /api/usuarios
 * @description Crear un nuevo usuario
 * @access Public
 */
router.post('/', crearUsuario);

/**
 * @route DELETE /api/usuarios/:email
 * @description Eliminar un usuario por email
 * @access Public
 */
router.delete('/:email', borrarUsuario);

/**
 * @route POST /api/usuarios/login
 * @description Autenticar usuario (login)
 * @access Public
 */
router.post('/login', loginUsuario);

export default router;