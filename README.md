# Producto 3 - Backend Voluntariados

Backend completo con Express REST API, GraphQL y MongoDB Atlas para gestión de voluntariados.

## 🔗 Enlaces del Proyecto

- **GitHub:** https://github.com/alexdor00/producto3-backend-voluntariado
- **CodeSandbox:** https://codesandbox.io/p/sandbox/github/alexdor00/producto3-backend-voluntariado

##  Descripción

Sistema backend para gestión de voluntariados que implementa:
- API REST con Express
- API GraphQL con Apollo Server
- Persistencia en MongoDB Atlas
- Autenticación JWT
- Sistema dual (Atlas + memoria como fallback)

## Tecnologías Utilizadas

- **Node.js** v18+
- **Express** v4.18.2 - Framework web
- **Apollo Server** v4.9.5 - Servidor GraphQL
- **MongoDB** v6.3.0 - Base de datos NoSQL
- **JSON Web Token** v9.0.2 - Autenticación
- **dotenv** v16.3.1 - Variables de entorno

## Estructura del Proyecto

producto3-backend-voluntariado/
├── src/
│   ├── config/
│   │   └── database.js           # Conexión MongoDB Atlas
│   ├── controllers/
│   │   ├── usuariosController.js # Lógica REST usuarios
│   │   └── voluntariadosController.js # Lógica REST voluntariados
│   ├── data/
│   │   └── dataStore.js          # Datos en memoria (fallback)
│   ├── graphql/
│   │   ├── apolloServer.js       # Configuración Apollo
│   │   ├── typeDefs.js           # Esquema GraphQL
│   │   └── resolvers.js          # Resolvers GraphQL
│   ├── middleware/
│   │   └── auth.js               # Verificación JWT
│   ├── routes/
│   │   ├── usuariosRoutes.js     # Rutas REST usuarios
│   │   └── voluntariadosRoutes.js # Rutas REST voluntariados
│   ├── utils/
│   │   └── jwt.js                # Funciones JWT
│   └── index.js                  # Punto de entrada
├── .env                          # Variables de entorno
├── .gitignore
├── package.json
├── docker-compose.yml            # MongoDB local (opcional)
└── README.md


##  Instalación

### 1. Clonar el repositorio
git clone https://github.com/alexdor00/producto3-backend-voluntariado.git
cd producto3-backend-voluntariado
```

### 2. Instalar dependencias
npm install

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz:
properties
PORT=4000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://admin:adminadmin123@cluster0.gg8lavx.mongodb.net/voluntariadosDB?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=mi_clave_super_secreta_voluntariados_2024
JWT_EXPIRATION=24h


### 4. Iniciar servidor

npm start


El servidor iniciará en: `http://localhost:4000`

##  Endpoints Disponibles

### GraphQL API

**URL:** `http://localhost:4000/graphql`

**Queries disponibles:**
- `obtenerUsuarios` - Lista todos los usuarios
- `obtenerUsuario(email: String!)` - Obtiene un usuario por email
- `obtenerVoluntariados` - Lista todos los voluntariados
- `obtenerVoluntariado(id: Int!)` - Obtiene un voluntariado por ID
- `obtenerVoluntariadosPorTipo(tipo: String!)` - Filtra por tipo (Oferta/Petición)

**Mutations disponibles:**
- `crearUsuario(nombre, email, password, rol)` - Crea nuevo usuario (público)
- `loginUsuario(email, password)` - Login y obtención de token JWT (público)
- `crearVoluntariado(...)` - Crea voluntariado (requiere token)
- `borrarVoluntariado(id)` - Elimina voluntariado (requiere token)
- `actualizarVoluntariado(...)` - Actualiza voluntariado (requiere token)
- `borrarUsuario(email)` - Elimina usuario (requiere token admin)

### REST API

**Base URL:** `http://localhost:4000/api`

#### Usuarios
- `GET /api/usuarios` - Obtener todos (público)
- `POST /api/usuarios` - Crear usuario (público)
- `POST /api/usuarios/login` - Login (público)
- `DELETE /api/usuarios/:email` - Eliminar usuario (requiere admin)

#### Voluntariados
- `GET /api/voluntariados` - Obtener todos (público)
- `GET /api/voluntariados/tipo?tipo=Oferta` - Filtrar por tipo (público)
- `POST /api/voluntariados` - Crear voluntariado (requiere token)
- `DELETE /api/voluntariados/:id` - Eliminar voluntariado (requiere token)

##  Autenticación JWT

### Obtener token (REST):

POST http://localhost:4000/api/usuarios/login
Content-Type: application/json

{
  "email": "L@A.U",
  "password": "123"
}


### Obtener token (GraphQL):
```graphql
mutation {
  loginUsuario(email: "L@A.U", password: "123") {
    ok
    token
    usuario {
      nombre
      rol
    }
  }
}


### Usar token en peticiones:

**REST:**

Authorization: Bearer <tu_token_aqui>

**GraphQL:**
Header: Authorization: Bearer <tu_token_aqui>


##  Usuarios de Prueba

| Email | Password | Rol |
|-------|----------|-----|
| L@A.U | 123 | admin |
| M@R.C | 123 | usuario |
| S@O.N | 123 | usuario |



## MongoDB Atlas

### Conexión

El proyecto está configurado para usar MongoDB Atlas:

- **Cluster:** cluster0.gg8lavx.mongodb.net
- **Base de datos:** voluntariadosDB
- **Colecciones:** usuarios, voluntariados
- **Acceso:** Configurado para cualquier IP (0.0.0.0/0)

### Sistema Dual

El proyecto implementa un sistema dual:
- **Primario:** MongoDB Atlas (persistencia en nube)
- **Fallback:** Memoria (arrays) si Atlas no está disponible

javascript
if (usarMongoDB()) {
    // Usar MongoDB Atlas
} else {
    // Usar memoria (dataStore.js)
}
```

##  Docker (Opcional)

Para usar MongoDB local con Docker:

docker-compose up -d


Luego cambiar en `.env`:

MONGODB_URI=mongodb://admin:admin123@localhost:27017/voluntariadosDB?authSource=admin


## Probar con Postman

### Ejemplo 1: Login y crear voluntariado

**1. Login:**
POST http://localhost:4000/api/usuarios/login
Body: {"email": "L@A.U", "password": "123"}


**2. Copiar token de la respuesta**

**3. Crear voluntariado:**

POST http://localhost:4000/api/voluntariados
Headers: Authorization: Bearer <token>
Body: {
  "titulo": "OFREZCO AYUDA",
  "email": "L@A.U",
  "fecha": "2025-12-20",
  "descripcion": "Ayuda con mascotas",
  "tipo": "Oferta"
}


### Ejemplo 2: Query GraphQL
graphql
query {
  obtenerVoluntariados {
    id
    titulo
    email
    tipo
    descripcion
  }
}
```

##  Verificación de Persistencia

Para verificar que los datos persisten en Atlas:

1. Crear un usuario/voluntariado
2. Reiniciar el servidor (`Ctrl+C` y `npm start`)
3. Consultar los datos de nuevo
4. Si persisten → está usando Atlas 

También puedes verificar en MongoDB Atlas web:
https://cloud.mongodb.com → Browse Collections

## ⚠️ Notas Importantes

- El puerto por defecto es `4000` (configurable en `.env`)
- Las credenciales de MongoDB Atlas están incluidas para evaluación
- En producción, usar variables de entorno seguras
- El JWT expira en 24 horas
- Los datos en memoria se pierden al reiniciar (fallback)


##  Licencia

Este proyecto es de uso académico.
