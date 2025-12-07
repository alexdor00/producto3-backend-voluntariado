import express from 'express';
import { 
    obtenerVoluntariados, 
    crearVoluntariado, 
    borrarVoluntariado,
    obtenerVoluntariadosPorTipo
} from '../controllers/voluntariadosController.js';

const router = express.Router();

/**
 * @route GET /api/voluntariados
 * @description Obtener todos los voluntariados
 * @access Public
 */
router.get('/', obtenerVoluntariados);

/**
 * @route GET /api/voluntariados/tipo
 * @description Obtener voluntariados filtrados por tipo (Oferta/Petición)
 * @query tipo - Oferta o Petición
 * @access Public
 */
router.get('/tipo', obtenerVoluntariadosPorTipo);

/**
 * @route POST /api/voluntariados
 * @description Crear un nuevo voluntariado
 * @access Public
 */
router.post('/', crearVoluntariado);

/**
 * @route DELETE /api/voluntariados/:id
 * @description Eliminar un voluntariado por ID
 * @access Public
 */
router.delete('/:id', borrarVoluntariado);

export default router;