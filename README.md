# Task Manager API

Una API REST completa para gestión de tareas construida con NestJS, TypeORM y PostgreSQL.
## 🛠️ Stack Tecnológico
- **Framework**: NestJS
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT
- **Validación**: class-validator
- **Containerización**: Docker & Docker Compose
## 🔧 Instalación
### 1. Clonar el repositorio
```bash
git clone https://github.com/lolEstraski/wagonPrueba-.git

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
### 6. Iniciar el servidor
```bash
# Desarrollo
npm run start:dev

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
``
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

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Carlos Andres Ortegon Tique

- **Tu Nombre** - [GitHub](https://github.com/tu-usuario)

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](#-documentación-de-la-api)
2. Busca en [Issues](https://github.com/tu-usuario/task-manager-api/issues)
3. Crea un nuevo Issue si no encuentras solución

---

⭐ ¡Dale una estrella si te gusta el proyecto!
