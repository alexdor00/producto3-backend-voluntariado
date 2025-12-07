

import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuariosRoutes.js';
import voluntariadosRoutes from './routes/voluntariadosRoutes.js';

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors()); // Permitir peticiones desde otros orígenes
app.use(express.json()); // Parsear JSON en el body

// Rutas de bienvenida
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API de Voluntariados - Backend funcionando',
        version: '1.0.0',
        endpoints: {
            usuarios: '/api/usuarios',
            voluntariados: '/api/voluntariados'
        }
    });
});

// Rutas de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/voluntariados', voluntariadosRoutes);

// Ruta 404 - No encontrada
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        mensaje: 'Endpoint no encontrado',
        ruta: req.url
    });
});

// Manejo global de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        ok: false,
        mensaje: 'Error interno del servidor',
        error: err.message
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(` Endpoints disponibles:`);
    console.log(`   - GET  http://localhost:${PORT}/api/usuarios`);
    console.log(`   - POST http://localhost:${PORT}/api/usuarios`);
    console.log(`   - POST http://localhost:${PORT}/api/usuarios/login`);
    console.log(`   - GET  http://localhost:${PORT}/api/voluntariados`);
    console.log(`   - POST http://localhost:${PORT}/api/voluntariados`);
});