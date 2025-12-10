# Producto 3 - Backend Voluntariados

Backend completo con Express REST API, GraphQL y MongoDB Atlas para gestión de voluntariados.

## Enlaces del Proyecto

- **GitHub:** https://github.com/alexdor00/producto3-backend-voluntariado
- **CodeSandbox:** https://codesandbox.io/p/sandbox/github/alexdor00/producto3-backend-voluntariado/tree/main

## Instrucciones para corrección

### Usar CodeSandbox (recomendado)

**URL del proyecto:** https://6flhwn-4000.csb.app/

Si la URL no funciona, abrir el enlace de CodeSandbox de arriba y copiar la URL que aparece (formato: https://xxxxx-4000.csb.app). Las variables de entorno ya están configuradas.

### Ejecutar en local
```
git clone https://github.com/alexdor00/producto3-backend-voluntariado.git
cd producto3-backend-voluntariado
npm install
npm start
```

Crear archivo `.env` con las variables indicadas más abajo.

## Pruebas rápidas con Postman

### 1. Login para obtener token
```
POST [URL]/api/usuarios/login
Content-Type: application/json

{
  "email": "L@A.U",
  "password": "123"
}
```

Copiar el token de la respuesta.

### 2. Ver voluntariados (sin token)
```
GET [URL]/api/voluntariados
```

### 3. Crear voluntariado (con token)
```
POST [URL]/api/voluntariados
Content-Type: application/json
Authorization: Bearer [TOKEN]

{
  "titulo": "PRUEBA",
  "email": "L@A.U",
  "fecha": "2025-12-20",
  "descripcion": "Probando",
  "tipo": "Oferta"
}
```

### 4. GraphQL
```
POST [URL]/graphql
Content-Type: application/json

{
  "query": "{ obtenerVoluntariados { id titulo email tipo } }"
}
```

### 5. Verificar persistencia

Reiniciar el servidor y repetir el paso 2. Si los datos siguen ahí, MongoDB Atlas funciona.

## Descripción

Sistema backend que implementa:
- API REST con Express
- API GraphQL con Apollo Server
- Persistencia en MongoDB Atlas
- Autenticación JWT
- Sistema dual (Atlas + memoria como fallback)

## Tecnologías

- Node.js v18+
- Express v4.18.2
- Apollo Server v4.9.5
- MongoDB v6.3.0
- JSON Web Token v9.0.2
- dotenv v16.3.1

## Estructura del proyecto
```
producto3-backend-voluntariado/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── usuariosController.js
│   │   └── voluntariadosController.js
│   ├── data/
│   │   └── dataStore.js
│   ├── graphql/
│   │   ├── apolloServer.js
│   │   ├── typeDefs.js
│   │   └── resolvers.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── usuariosRoutes.js
│   │   └── voluntariadosRoutes.js
│   ├── utils/
│   │   └── jwt.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Configuración

### Variables de entorno (.env)
```
PORT=4000
MONGODB_URI=mongodb+srv://admin:adminadmin123@cluster0.gg8lavx.mongodb.net/voluntariadosDB?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mi_clave_super_secreta_voluntariados_2024_cambiar_en_produccion
JWT_EXPIRATION=24h
```

### En CodeSandbox

Ir a Settings → Env Variables y añadir las variables de arriba.

## Endpoints

### GraphQL API

URL: `[URL]/graphql`

Queries:
- `obtenerUsuarios`
- `obtenerUsuario(email: String!)`
- `obtenerVoluntariados`
- `obtenerVoluntariado(id: Int!)`
- `obtenerVoluntariadosPorTipo(tipo: String!)`

Mutations:
- `crearUsuario(nombre, email, password, rol)`
- `loginUsuario(email, password)`
- `crearVoluntariado(...)`
- `borrarVoluntariado(id)`
- `actualizarVoluntariado(...)`
- `borrarUsuario(email)`

### REST API

URL base: `[URL]/api`

Usuarios:
- `GET /api/usuarios`
- `POST /api/usuarios`
- `POST /api/usuarios/login`
- `DELETE /api/usuarios/:email`

Voluntariados:
- `GET /api/voluntariados`
- `GET /api/voluntariados/tipo?tipo=Oferta`
- `POST /api/voluntariados`
- `DELETE /api/voluntariados/:id`

## Autenticación

Para rutas protegidas incluir header:
```
Authorization: Bearer [token]
```

## Usuarios de prueba

| Email | Password | Rol |
|-------|----------|-----|
| L@A.U | 123 | admin |
| M@R.C | 123 | usuario |
| S@O.N | 123 | usuario |

## MongoDB Atlas

- Cluster: cluster0.gg8lavx.mongodb.net
- Base de datos: voluntariadosDB
- Colecciones: usuarios, voluntariados

El proyecto tiene un sistema dual: si MongoDB Atlas no está disponible, usa memoria como respaldo.

## Ejemplos Postman

### Login y crear voluntariado
```
1. POST [URL]/api/usuarios/login
   Body: {"email": "L@A.U", "password": "123"}

2. Copiar token

3. POST [URL]/api/voluntariados
   Authorization: Bearer [token]
   Body: {"titulo": "AYUDA", "email": "L@A.U", "fecha": "2025-12-20", "descripcion": "Ayuda", "tipo": "Oferta"}
```

### Query GraphQL
```
POST [URL]/graphql
Body: {"query": "{ obtenerVoluntariados { id titulo email tipo } }"}
```

### Mutation GraphQL
```
POST [URL]/graphql
Authorization: Bearer [token]
Body: {"query": "mutation { crearVoluntariado(titulo: \"Test\", email: \"L@A.U\", fecha: \"2025-12-25\", descripcion: \"Test\", tipo: \"Oferta\") { ok mensaje } }"}
```

## Notas

- Puerto por defecto: 4000
- JWT expira en 24 horas
- Credenciales incluidas para evaluación
- La URL de CodeSandbox puede cambiar


