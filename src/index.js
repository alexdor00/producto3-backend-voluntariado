import express from 'express';

const app = express();
const PORT = 4000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'Servidor Express funcionando correctamente',
        proyecto: 'Sistema de Voluntariados - Backend'
    });
});

// Ruta de prueba para usuarios
app.get('/api/test', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Prueba: http://localhost:${PORT}/api/test`);
});