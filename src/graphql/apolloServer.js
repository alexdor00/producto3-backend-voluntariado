
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

/**
 * Configuración y creación del servidor Apollo GraphQL
 * @returns {Object} Servidor Apollo configurado
 */
export async function createApolloServer() {
    
    // Crear servidor Apollo con el esquema y resolvers
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // Configuración adicional para producción
        introspection: true, // Permite ver el esquema (útil para desarrollo)
        formatError: (error) => {
            console.error('[GraphQL Error]:', error.message);
            return {
                message: error.message,
                locations: error.locations,
                path: error.path,
            };
        }
    });
    
    // Iniciar el servidor
    await server.start();
    console.log('Servidor Apollo GraphQL iniciado');
    
    return server;
}

/**
 * Obtiene el middleware de GraphQL para Express
 * @param {Object} server - Servidor Apollo
 * @returns {Function} Middleware de Express
 */
export function getGraphQLMiddleware(server) {
    return expressMiddleware(server, {
        context: async ({ req }) => {
            // Aquí puedes añadir información al contexto
            // Por ejemplo: autenticación, base de datos, etc.
            return {
                user: null // Por ahora sin autenticación
            };
        }
    });
}
