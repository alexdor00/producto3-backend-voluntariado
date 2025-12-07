// src/controllers/voluntariadosController.js

import { db } from '../data/dataStore.js';

/**
 * Obtiene todos los voluntariados del sistema
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Object} JSON con array de voluntariados
 */
export const obtenerVoluntariados = (req, res) => {
    try {
        res.json({
            ok: true,
            total: db.voluntariados.length,
            voluntariados: db.voluntariados
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener voluntariados',
            error: error.message
        });
    }
};

/**
 * Crea un nuevo voluntariado
 * @param {Object} req - Request con datos del voluntariado en body
 * @param {Object} res - Response de Express
 * @returns {Object} JSON con voluntariado creado
 */
export const crearVoluntariado = (req, res) => {
    try {
        const { titulo, email, fecha, descripcion, tipo } = req.body;
        
        // Validar datos obligatorios
        if (!titulo || !email || !fecha || !descripcion || !tipo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Faltan datos obligatorios'
            });
        }
        
        // Validar tipo
        if (tipo !== 'Oferta' && tipo !== 'Petición') {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipo debe ser "Oferta" o "Petición"'
            });
        }
        
        // Crear voluntariado
        const nuevoVoluntariado = {
            id: db.nextVoluntariadoId(),
            titulo,
            email,
            fecha,
            descripcion,
            tipo
        };
        
        db.voluntariados.push(nuevoVoluntariado);
        
        res.status(201).json({
            ok: true,
            mensaje: 'Voluntariado creado correctamente',
            voluntariado: nuevoVoluntariado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al crear voluntariado',
            error: error.message
        });
    }
};

/**
 * Elimina un voluntariado por su ID
 * @param {Object} req - Request con id en params
 * @param {Object} res - Response de Express
 * @returns {Object} JSON confirmando la eliminación
 */
export const borrarVoluntariado = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const index = db.voluntariados.findIndex(v => v.id === id);
        
        if (index === -1) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Voluntariado no encontrado'
            });
        }
        
        const voluntariadoEliminado = db.voluntariados.splice(index, 1)[0];
        
        res.json({
            ok: true,
            mensaje: 'Voluntariado eliminado correctamente',
            voluntariado: voluntariadoEliminado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar voluntariado',
            error: error.message
        });
    }
};

/**
 * Obtiene voluntariados filtrados por tipo
 * @param {Object} req - Request con tipo en query (Oferta/Petición)
 * @param {Object} res - Response de Express
 * @returns {Object} JSON con voluntariados filtrados
 */
export const obtenerVoluntariadosPorTipo = (req, res) => {
    try {
        const { tipo } = req.query;
        
        if (!tipo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes especificar el tipo (Oferta o Petición)'
            });
        }
        
        const voluntariados = db.voluntariados.filter(v => v.tipo === tipo);
        
        res.json({
            ok: true,
            total: voluntariados.length,
            tipo,
            voluntariados
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al filtrar voluntariados',
            error: error.message
        });
    }
};