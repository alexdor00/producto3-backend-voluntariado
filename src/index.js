// src/index.js

import express from 'express';
import cors from 'cors';
import { createApolloServer, getGraphQLMiddleware } from './graphql/apolloServer.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import voluntariadosRoutes from './routes/voluntariadosRoutes.js';

const app = express();
const PORT = 4000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API de Voluntariados - Backend con GraphQL',
        version: '2.0.0',
        endpoints: {
            graphql: '/graphql',
            rest_usuarios: '/api/usuarios',
            rest_voluntariados: '/api/voluntariados'
        },
        info: 'Usa /graphql para consultas GraphQL (recomendado)'
    });
});

// Función principal para iniciar el servidor
async function startServer() {
    try {
        // 1. Crear servidor Apollo GraphQL
        const apolloServer = await createApolloServer();
        
        // 2. Integrar GraphQL con Express
        app.use('/graphql', getGraphQLMiddleware(apolloServer));
        
        // 3. Rutas REST (mantenemos para compatibilidad)
        app.use('/api/usuarios', usuariosRoutes);
        app.use('/api/voluntariados', voluntariadosRoutes);
        
        // 4. Ruta 404 - No encontrada
        app.use((req, res) => {
            res.status(404).json({
                ok: false,
                mensaje: 'Endpoint no encontrado',
                ruta: req.url
            });
        });
        
        // 5. Manejo global de errores
        app.use((err, req, res, next) => {
            console.error('Error:', err);
            res.status(500).json({
                ok: false,
                mensaje: 'Error interno del servidor',
                error: err.message
            });
        });
        
        // 6. Iniciar servidor Express
        app.listen(PORT, () => {
            console.log(' Servidor corriendo en http://localhost:' + PORT);
            console.log('GraphQL Playground: http://localhost:' + PORT + '/graphql');
            console.log(' REST API:');
            console.log('Usuarios:http://localhost:' + PORT + '/api/usuarios');
            console.log('Voluntariados: http://localhost:' + PORT + '/api/voluntariados');
            
        });
        
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Iniciar el servidor
startServer();