# Documento de Migración: Android → Web

## Archivos Android usados como referencia

| Archivo Android | Propósito |
|----------------|-----------|
| `model/DatabaseHelper.kt` | Esquema SQLite, datos iniciales, operaciones CRUD |
| `model/Receta.kt` | Modelo de receta |
| `model/Usuario.kt` | Modelo de usuario |
| `model/Ingrediente.kt` | Modelo de ingrediente |
| `model/Paso.kt` | Modelo de paso de receta |
| `controller/ControladorPrincipal.kt` | Pantalla principal |
| `controller/ControladorControlAcceso.kt` | Login |
| `controller/ControladorAutoRegistro.kt` | Registro |
| `controller/ControladorBuscarReceta.kt` | Búsqueda |
| `controller/ControladorRecetaVisualizada.kt` | Detalle de receta |
| `controller/ControladorAdminReceta.kt` | Admin recetas |
| `controller/ControladorAnadirReceta.kt` | Crear receta |
| `controller/ControladorEditarReceta.kt` | Editar receta |
| `controller/ControladorElimReceta.kt` | Eliminar receta |
| `controller/ControladorAdminIngrediente.kt` | Admin ingredientes |
| `controller/ControladorAdminFiltro.kt` | Admin filtros |
| `controller/ControladorAdminUsuario.kt` | Admin usuarios |
| `adapter/AdapterReceta.kt` | Tarjeta de receta |
| `adapter/AdapterIngrediente.kt` | Selector de ingredientes |
| `res/drawable/*.png` | Assets visuales copiados al frontend |

## Mapeo: Activities → Rutas Next.js

| Activity Android | Ruta Web |
|-----------------|----------|
| ControladorPrincipal | `/` |
| ControladorControlAcceso | `/login` |
| ControladorAutoRegistro | `/registro` |
| ControladorPerfilUsuario | `/perfil` |
| ControladorBuscarReceta | `/buscar` |
| ControladorRecetaVisualizada | `/recetas/[id]` |
| ControladorGestFavorito / ControladorVisFavorito | `/favoritos` |
| ControladorAdminReceta (menú) | `/admin/recetas` |
| ControladorAnadirReceta | `/admin/recetas/nueva` |
| ControladorEditarReceta | `/admin/recetas/[id]/editar` |
| ControladorElimReceta | Integrado en `/admin/recetas` |
| ControladorAdminIngrediente | `/admin/ingredientes` |
| ControladorAnadirIngrediente | Integrado en `/admin/ingredientes` |
| ControladorElimIngrediente | Integrado en `/admin/ingredientes` |
| ControladorAdminFiltro | `/admin/filtros` |
| ControladorAnadirFiltro | Integrado en `/admin/filtros` |
| ControladorAdminUsuario | `/admin/usuarios` |
| ControladorModUsuario | Integrado en `/admin/usuarios` |
| ControladorElimUsuario | Integrado en `/admin/usuarios` |

## Mapeo: Funciones SQLite → Endpoints REST

| Función Android | Endpoint Web |
|----------------|-------------|
| `crearReceta()` | `POST /api/recipes` |
| `modificarReceta()` | `PUT /api/recipes/:id` |
| `eliminarReceta()` | `DELETE /api/recipes/:id` |
| `buscarReceta()` | `GET /api/recipes/search?q=` |
| `obtenerRecetasConPasos()` | `GET /api/recipes` |
| `accesoUsuario()` | `POST /api/auth/login` |
| `crearUsuario()` | `POST /api/auth/register` |
| `getAllIngredients()` | `GET /api/ingredients` |
| `anadirIng()` | `POST /api/ingredients` |
| `eliminarIng()` | `DELETE /api/ingredients/:id` |
| `getAllFiltros()` | `GET /api/filters` |
| `anadirFiltro()` | `POST /api/filters` |

## Mapeo: SQLite → MySQL

| Tabla SQLite | Tabla MySQL | Cambios |
|-------------|-------------|---------|
| `Usuario` | `users` | ID numérico auto-increment, email separado, password con bcrypt |
| `Cliente` | `clients` | FK por user_id numérico |
| `Administrador` | `admins` | FK por user_id numérico |
| `Receta` | `recipes` | `Ingredientes` (string) → tabla `recipe_ingredients` |
| `Ingrediente` | `ingredients` | UNIQUE en nombre |
| `Paso` | `steps` | `step_order` explícito, relación por ID de receta |
| `Comentario` | `comments` | FK de usuario, timestamp |
| `Filtro` | `filters` | Tabla clara con `ingredient_id` opcional |
| `Favorito` | `favorites` | PK compuesta, timestamp |
| — | `recipe_ingredients` | Nueva tabla intermedia (normalización) |

## Cambios y correcciones aplicados

1. **Login**: El original mezclaba usuario y correo. La versión web usa solo `username + password`.
2. **Contraseñas**: Migrado de texto plano a `bcrypt` con salt de 10 rondas.
3. **Ingredientes en recetas**: El original guardaba ingredientes como string CSV. Migrado a tabla `recipe_ingredients` normalizada.
4. **Pasos**: El original tenía un solo registro de paso por receta con saltos de línea. Migrado a registros individuales con `step_order`.
5. **Favoritos**: El original tenía pantallas vacías. Implementación completa con add/remove/list.
6. **Comentarios**: El original tenía layouts sin implementación. Implementación completa con CRUD.
7. **Filtros**: El original tenía una tabla confusa. Rediseñado con tabla `filters` clara.
8. **Usuarios**: El original tenía varios controladores placeholder. Admin completo implementado.

## Funcionalidades implementadas

- Autenticación JWT completa
- Registro de usuarios (rol Cliente por defecto)
- Login con bcrypt
- Vista de recetas con ingredientes y pasos
- Búsqueda por nombre, descripción e ingredientes
- Favoritos funcionales
- Comentarios funcionales
- CRUD completo de recetas (admin)
- CRUD de ingredientes con validación de uso
- Gestión de filtros
- Administración de usuarios con cambio de rol

## Mejoras respecto al original

- Arquitectura REST en lugar de SQLite local
- Persistencia centralizada en MySQL
- Seguridad con JWT y bcrypt
- Diseño responsive con tema oscuro
- Búsqueda mejorada (por ingredientes además de nombre)
- Datos normalizados (3FN para ingredientes)

## Mejoras pendientes

- Upload de imágenes (actualmente solo URL)
- Paginación en listas largas
- Tests automatizados
- Notificaciones en tiempo real
- Perfil editable por el usuario
