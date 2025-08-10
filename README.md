# Task Manager API

Una API REST completa para gestión de tareas construida con NestJS, TypeORM y PostgreSQL, la cual consta como un block  en el cual puedes listar tus tareas , y su  respectivo  crud en la cual  podras  ver tus tareas pendentes , tareas completadas, tambien con un lpgin y un registrar  usuarios 
## 🛠️ Stack Tecnológico
- **Framework**: NestJS
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT
- **Validación**: class-validator
- **Containerización**: Docker 
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
Crear un archivo `appmodulo,ts` para correr el  backend  desplegado
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'dpg-d2bg1ijuibrs73fiqn90-a'), ojo si quiere correr en local "localhost"
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'tasks'),
        password: configService.get('DB_PASSWORD', 'h6kKePc3hXr4mRoe21AI8Gb82X5h6X4s'),
        database: configService.get('DB_NAME', 'task_manager_osby'), "task_manager"
        entities: [Task, User],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule { }
### configurar el .env  de ser necesario si no abstenerse ```env 
por defecto  ya deberia correr  de ser necesario  si quiere correr en local  
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tasks
DB_PASSWORD=h6kKePc3hXr4mRoe21AI8Gb82X5h6X4s
DB_DATABASE=task_manager
# JWT
JWT_SECRET=tu-jwt-secret-muy-seguro
JWT_EXPIRES_IN=7d

# App
PORT=3001 o 3000
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
npm run start:dev      # Iniciar en modo desarrollo
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



## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Carlos Andres Ortegon Tique

- **Tu Nombre** - [GitHub](https://github.com/lolEstraski)


