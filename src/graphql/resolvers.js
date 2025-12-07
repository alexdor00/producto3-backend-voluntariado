

import { db } from '../data/dataStore.js';

/**
 * Resolvers de GraphQL - Implementan la lógica de negocio
 * Conectan las operaciones definidas en typeDefs con la base de datos
 */

export const resolvers = {
    
    // QUERIES - Operaciones de lectura
    Query: {
        
        /**
         * Obtiene todos los usuarios del sistema
         * @returns {Array} Lista de usuarios
         */
        obtenerUsuarios: () => {
            console.log('[GraphQL Query] obtenerUsuarios');
            return db.usuarios;
        },
        
        /**
         * Obtiene un usuario por su email
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Argumentos { email }
         * @returns {Object|null} Usuario encontrado o null
         */
        obtenerUsuario: (_, { email }) => {
            console.log('[GraphQL Query] obtenerUsuario:', email);
            return db.usuarios.find(u => u.email === email) || null;
        },
        
        /**
         * Obtiene todos los voluntariados
         * @returns {Array} Lista de voluntariados
         */
        obtenerVoluntariados: () => {
            console.log('[GraphQL Query] obtenerVoluntariados');
            return db.voluntariados;
        },
        
        /**
         * Obtiene un voluntariado por ID
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Argumentos { id }
         * @returns {Object|null} Voluntariado encontrado o null
         */
        obtenerVoluntariado: (_, { id }) => {
            console.log('[GraphQL Query] obtenerVoluntariado:', id);
            return db.voluntariados.find(v => v.id === id) || null;
        },
        
        /**
         * Obtiene voluntariados filtrados por tipo
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Argumentos { tipo }
         * @returns {Array} Lista filtrada de voluntariados
         */
        obtenerVoluntariadosPorTipo: (_, { tipo }) => {
            console.log('[GraphQL Query] obtenerVoluntariadosPorTipo:', tipo);
            return db.voluntariados.filter(v => v.tipo === tipo);
        }
    },
    
    // MUTATIONS - Operaciones de escritura
    Mutation: {
        
        /**
         * Crea un nuevo usuario
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Datos del usuario { nombre, email, password, rol }
         * @returns {Object} Usuario creado
         * @throws {Error} Si el email ya existe
         */
        crearUsuario: (_, { nombre, email, password, rol }) => {
            console.log('[GraphQL Mutation] crearUsuario:', email);
            
            // Validar que no exista el email
            const existe = db.usuarios.find(u => u.email === email);
            if (existe) {
                throw new Error('El email ya está registrado');
            }
            
            // Crear nuevo usuario
            const nuevoUsuario = {
                id: db.nextUsuarioId(),
                nombre,
                email,
                password,
                rol: rol || 'usuario'
            };
            
            db.usuarios.push(nuevoUsuario);
            
            return nuevoUsuario;
        },
        
        /**
         * Elimina un usuario por email
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Argumentos { email }
         * @returns {Object} Respuesta con ok y mensaje
         * @throws {Error} Si el usuario no existe
         */
        borrarUsuario: (_, { email }) => {
            console.log('[GraphQL Mutation] borrarUsuario:', email);
            
            const index = db.usuarios.findIndex(u => u.email === email);
            
            if (index === -1) {
                throw new Error('Usuario no encontrado');
            }
            
            db.usuarios.splice(index, 1);
            
            return {
                ok: true,
                mensaje: 'Usuario eliminado correctamente'
            };
        },
        
        /**
         * Autentica un usuario (login)
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Credenciales { email, password }
         * @returns {Object} Respuesta con ok, mensaje y usuario
         */
        loginUsuario: (_, { email, password }) => {
            console.log('[GraphQL Mutation] loginUsuario:', email);
            
            const usuario = db.usuarios.find(u => 
                u.email.toLowerCase() === email.toLowerCase()
            );
            
            if (!usuario) {
                return {
                    ok: false,
                    mensaje: 'Usuario no encontrado',
                    usuario: null
                };
            }
            
            if (usuario.password !== password) {
                return {
                    ok: false,
                    mensaje: 'Contraseña incorrecta',
                    usuario: null
                };
            }
            
            return {
                ok: true,
                mensaje: 'Login exitoso',
                usuario: usuario
            };
        },
        
        /**
         * Crea un nuevo voluntariado
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Datos del voluntariado
         * @returns {Object} Voluntariado creado
         * @throws {Error} Si faltan datos o el tipo es inválido
         */
        crearVoluntariado: (_, { titulo, email, fecha, descripcion, tipo }) => {
            console.log('[GraphQL Mutation] crearVoluntariado:', titulo);
            
            // Validar tipo
            if (tipo !== 'Oferta' && tipo !== 'Petición') {
                throw new Error('El tipo debe ser "Oferta" o "Petición"');
            }
            
            // Crear nuevo voluntariado
            const nuevoVoluntariado = {
                id: db.nextVoluntariadoId(),
                titulo,
                email,
                fecha,
                descripcion,
                tipo
            };
            
            db.voluntariados.push(nuevoVoluntariado);
            
            return nuevoVoluntariado;
        },
        
        /**
         * Elimina un voluntariado por ID
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - Argumentos { id }
         * @returns {Object} Respuesta con ok y mensaje
         * @throws {Error} Si el voluntariado no existe
         */
        borrarVoluntariado: (_, { id }) => {
            console.log('[GraphQL Mutation] borrarVoluntariado:', id);
            
            const index = db.voluntariados.findIndex(v => v.id === id);
            
            if (index === -1) {
                throw new Error('Voluntariado no encontrado');
            }
            
            db.voluntariados.splice(index, 1);
            
            return {
                ok: true,
                mensaje: 'Voluntariado eliminado correctamente'
            };
        },
        
        /**
         * Actualiza un voluntariado existente
         * @param {Object} _ - Parent (no usado)
         * @param {Object} args - ID y datos a actualizar
         * @returns {Object} Voluntariado actualizado
         * @throws {Error} Si el voluntariado no existe o el tipo es inválido
         */
        actualizarVoluntariado: (_, { id, titulo, email, fecha, descripcion, tipo }) => {
            console.log('[GraphQL Mutation] actualizarVoluntariado:', id);
            
            const index = db.voluntariados.findIndex(v => v.id === id);
            
            if (index === -1) {
                throw new Error('Voluntariado no encontrado');
            }
            
            // Validar tipo si se está actualizando
            if (tipo && tipo !== 'Oferta' && tipo !== 'Petición') {
                throw new Error('El tipo debe ser "Oferta" o "Petición"');
            }
            
            // Actualizar solo los campos proporcionados
            const voluntarioActualizado = {
                ...db.voluntariados[index],
                ...(titulo && { titulo }),
                ...(email && { email }),
                ...(fecha && { fecha }),
                ...(descripcion && { descripcion }),
                ...(tipo && { tipo })
            };
            
            db.voluntariados[index] = voluntarioActualizado;
            
            return voluntarioActualizado;
        }
    }
};