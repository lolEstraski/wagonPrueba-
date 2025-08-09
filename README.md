# Task Manager API

Una API REST completa para gestión de tareas construida con NestJS, TypeORM y PostgreSQL.

## 🚀 Características

- ✅ Autenticación JWT
- ✅ CRUD completo de tareas
- ✅ Gestión de usuarios
- ✅ Base de datos PostgreSQL
- ✅ Validación de datos
- ✅ Containerización con Docker
- ✅ Arquitectura modular

## 🛠️ Stack Tecnológico

- **Framework**: NestJS
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT
- **Validación**: class-validator
- **Containerización**: Docker & Docker Compose

## 📋 Prerrequisitos

- Node.js >= 16
- Docker y Docker Compose
- Git

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/task-manager-api.git
cd task-manager-api
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=task_manager

# JWT
JWT_SECRET=tu-jwt-secret-muy-seguro
JWT_EXPIRES_IN=7d

# App
PORT=3000
NODE_ENV=development
```

### 4. Levantar la base de datos con Docker
```bash
docker-compose up -d
```

### 5. Ejecutar migraciones (opcional si usas synchronize)
```bash
npm run typeorm:run
```

### 6. Iniciar el servidor
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 🐳 Docker

### Ejecutar con Docker Compose
```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Limpiar volúmenes (elimina datos)
docker-compose down -v
```

## 📚 Documentación de la API

### Endpoints de Autenticación

#### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

### Endpoints de Tareas

> **Nota**: Todos los endpoints de tareas requieren autenticación Bearer Token

#### Obtener todas las tareas
```http
GET /tasks
Authorization: Bearer {token}
```

#### Obtener tarea por ID
```http
GET /tasks/:id
Authorization: Bearer {token}
```

#### Crear nueva tarea
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea"
}
```

#### Actualizar tarea
```http
PUT /tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Título actualizado",
  "description": "Descripción actualizada",
  "status": "DONE"
}
```

#### Eliminar tarea
```http
DELETE /tasks/:id
Authorization: Bearer {token}
```

## 🏗️ Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── decorators/      # Decoradores personalizados
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards de autenticación
│   ├── strategies/      # Estrategias de Passport
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── tasks/               # Módulo de tareas
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades de TypeORM
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
├── config/             # Configuraciones
├── app.controller.ts   # Controlador principal
├── app.module.ts       # Módulo principal
├── app.service.ts      # Servicio principal
└── main.ts            # Punto de entrada
```

## 🔐 Estados de las Tareas

- `OPEN`: Tarea abierta/pendiente
- `IN_PROGRESS`: Tarea en progreso
- `DONE`: Tarea completada

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 📝 Scripts Disponibles

```bash
npm run start          # Iniciar en modo producción
npm run start:dev      # Iniciar en modo desarrollo
npm run start:debug    # Iniciar en modo debug
npm run build          # Construir para producción
npm run lint           # Ejecutar linter
npm run format         # Formatear código
npm run test           # Ejecutar tests
```

## 🔄 Comandos TypeORM

```bash
# Generar migración
npm run typeorm:generate-migration -- NombreMigracion

# Ejecutar migraciones
npm run typeorm:run

# Revertir migración
npm run typeorm:revert

# Mostrar migraciones
npm run typeorm:show
```

## 🌍 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Ambiente de ejecución | `development` |
| `DB_HOST` | Host de la base de datos | `localhost` |
| `DB_PORT` | Puerto de la base de datos | `5432` |
| `DB_USERNAME` | Usuario de la base de datos | `postgres` |
| `DB_PASSWORD` | Contraseña de la base de datos | `password` |
| `DB_DATABASE` | Nombre de la base de datos | `task_manager` |
| `JWT_SECRET` | Secreto para JWT | - |
| `JWT_EXPIRES_IN` | Tiempo de expiración del JWT | `7d` |

## 🚧 Desarrollo

### Agregar nueva funcionalidad
1. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
2. Implementar cambios
3. Agregar tests
4. Commit: `git commit -m "feat: nueva funcionalidad"`
5. Push y crear PR

### Convención de commits
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Formateo de código
- `refactor:` Refactorización
- `test:` Agregar tests
- `chore:` Tareas de mantenimiento

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch
3. Commit de cambios
4. Push al branch
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autor

- **Tu Nombre** - [GitHub](https://github.com/tu-usuario)

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](#-documentación-de-la-api)
2. Busca en [Issues](https://github.com/tu-usuario/task-manager-api/issues)
3. Crea un nuevo Issue si no encuentras solución

---

⭐ ¡Dale una estrella si te gusta el proyecto!
