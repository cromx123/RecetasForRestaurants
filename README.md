# MagicGourmet

Aplicación web fullstack de recetas de cocina, migrada desde Android/Kotlin a Next.js + Node.js + MySQL.

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Node.js, Express.js |
| Base de datos | MySQL 8.0 |
| Contenedores | Docker, Docker Compose |
| Autenticación | JWT + bcrypt |

## Estructura del proyecto

```
MagicGourmet-master/
├── apps/
│   ├── web/          # Frontend Next.js
│   └── api/          # Backend Express
├── database/
│   ├── init.sql      # Estructura de tablas
│   └── seed.sql      # Datos iniciales (recetas, ingredientes)
├── docker-compose.yml
├── .env.example
├── docs/
│   └── MIGRACION.md
└── MagicGourmet-master/   # Proyecto Android original (referencia)
```

## Levantar el sistema

```bash
docker compose up --build
```

> La primera vez tarda ~2-3 minutos mientras se construyen las imágenes y MySQL inicializa.

## URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:4000/api/health |
| MySQL | localhost:3306 |

## Credenciales iniciales

| Campo | Valor |
|-------|-------|
| Usuario | Gabriel |
| Contraseña | adm123 |
| Rol | Administrador |

## Reiniciar base de datos

Para limpiar completamente y volver a inicializar:

```bash
docker compose down -v
docker compose up --build
```

## Endpoints principales

### Autenticación
```
POST /api/auth/login        { username, password }
POST /api/auth/register     { username, email, password }
GET  /api/auth/me           [JWT]
```

### Recetas
```
GET    /api/recipes
GET    /api/recipes/search?q=texto
GET    /api/recipes/:id
POST   /api/recipes         [Admin JWT]
PUT    /api/recipes/:id     [Admin JWT]
DELETE /api/recipes/:id     [Admin JWT]
```

### Ingredientes
```
GET    /api/ingredients
POST   /api/ingredients     [Admin JWT]
DELETE /api/ingredients/:id [Admin JWT]
```

### Filtros
```
GET    /api/filters
POST   /api/filters         [Admin JWT]
DELETE /api/filters/:id     [Admin JWT]
```

### Favoritos
```
GET    /api/favorites        [JWT]
POST   /api/favorites/:id    [JWT]
DELETE /api/favorites/:id    [JWT]
```

### Comentarios
```
GET    /api/recipes/:id/comments
POST   /api/recipes/:id/comments  [JWT]
DELETE /api/comments/:id          [JWT, autor o Admin]
```

### Usuarios
```
GET    /api/users           [Admin JWT]
PUT    /api/users/:id       [JWT]
DELETE /api/users/:id       [Admin JWT]
```

## Funcionalidades

**Administrador:**
- Ver, crear, editar y eliminar recetas
- Gestionar ingredientes y filtros
- Administrar usuarios (ver, cambiar rol, eliminar)
- Comentar recetas

**Cliente:**
- Ver todas las recetas
- Buscar recetas por texto o ingredientes
- Ver detalle de receta con pasos
- Agregar/quitar favoritos
- Comentar recetas

**Público (sin cuenta):**
- Ver todas las recetas
- Ver detalle de receta
- Buscar recetas

## Migración desde Android

Este proyecto es una migración completa de la app Android MagicGourmet (Kotlin + SQLite) a una arquitectura web moderna. Ver `docs/MIGRACION.md` para detalles completos.
