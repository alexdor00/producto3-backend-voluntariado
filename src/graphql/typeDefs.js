/**
 * Definición de tipos y esquema de GraphQL
 * Los Types corresponden a los objetos del producto 2
 */

export const typeDefs = `#graphql

  # Tipo Usuario - Representa un usuario del sistema
 type Usuario {
    id: Int!
    nombre: String!
    email: String!
    password: String!
    rol: String!
  }

  # Tipo Voluntariado - Representa una oferta o petición de voluntariado
  type Voluntariado {
    id: Int!
    titulo: String!
    email: String!
    fecha: String!
    descripcion: String!
    tipo: String!
  }

  # Respuesta genérica para operaciones
  type Respuesta {
    ok: Boolean!
    mensaje: String!
  }

  # Respuesta de login con datos del usuario
  type RespuestaLogin {
    ok: Boolean!
    mensaje: String!
    usuario: Usuario
  }

  # QUERIES - Operaciones de lectura (SELECT)
  type Query {
    # Usuarios
    obtenerUsuarios: [Usuario!]!
    obtenerUsuario(email: String!): Usuario
    
    # Voluntariados
    obtenerVoluntariados: [Voluntariado!]!
    obtenerVoluntariado(id: Int!): Voluntariado
    obtenerVoluntariadosPorTipo(tipo: String!): [Voluntariado!]!
  }

  # MUTATIONS - Operaciones de escritura (INSERT, UPDATE, DELETE)
  type Mutation {
    # Usuarios
    crearUsuario(
      nombre: String!
      email: String!
      password: String!
      rol: String
    ): Usuario!
    
    borrarUsuario(email: String!): Respuesta!
    
    loginUsuario(email: String!, password: String!): RespuestaLogin!
    
    # Voluntariados
    crearVoluntariado(
      titulo: String!
      email: String!
      fecha: String!
      descripcion: String!
      tipo: String!
    ): Voluntariado!
    
    borrarVoluntariado(id: Int!): Respuesta!
    
    actualizarVoluntariado(
      id: Int!
      titulo: String
      email: String
      fecha: String
      descripcion: String
      tipo: String
    ): Voluntariado!
  }
`;