# Figuritas del Mundial

A modern, production-ready application for managing football sticker collections built with Angular, NestJS, TypeScript, and following Clean Architecture principles.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with a clear separation of concerns across four layers:

### 📁 Layer Structure

```
src/
├── domain/         → Entities, Value Objects, Domain Services, Repository Interfaces
├── application/    → Use Cases, DTOs, Application Services
├── infrastructure/ → DB clients, HTTP clients, external API adapters
└── interfaces/     → Controllers, Route handlers, entry points
```

### 🔄 Dependency Rule

Dependencies **ONLY** point inward:
- `interfaces` → `application` → `domain`
- `infrastructure` → `application` → `domain`
- `domain` imports **NOTHING** from outside itself

### 🎯 Layer Responsibilities

- **Domain**: Contains business logic, entities, value objects, and repository interfaces. No external dependencies.
- **Application**: Orchestrates domain objects through use cases. Defines DTOs and application services.
- **Infrastructure**: Implements domain/application interfaces. Contains database, HTTP clients, and external services.
- **Interfaces**: Entry points (controllers, CLI, etc.). Translates external requests to use case calls.

## 🚀 Tech Stack

- **Backend**: NestJS, TypeScript, TypeORM, SQLite
- **Frontend**: Angular 17, Angular Material, RxJS
- **Architecture**: Clean Architecture
- **Database**: SQLite (production-ready with TypeORM)
- **Containerization**: Docker & Docker Compose
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer
- **Testing**: Jest
- **Linting**: ESLint, Prettier

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

1. **Clone and install dependencies**:
```bash
# Backend dependencies
npm install

# Frontend dependencies (if developing frontend separately)
cd frontend && npm install
```

2. **Development mode**:
```bash
# Start backend in development mode
npm run start:dev

# Start frontend in development mode (separate terminal)
npm run ng:serve
```

3. **Using Docker**:
```bash
# Development with Docker Compose
docker-compose --profile dev up

# Production build and run
docker-compose up
```

### 🌐 Access Points

- **Frontend**: http://localhost:4200 (development) or http://localhost:3000 (production)
- **API**: http://localhost:3000/api
- **API Documentation**: http://localhost:3000/api/docs

## 📋 Available Scripts

### Backend
- `npm run start:dev` - Start backend in development mode
- `npm run build` - Build the backend
- `npm run start:prod` - Start in production mode
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

### Frontend
- `npm run ng:serve` - Start Angular dev server
- `npm run ng:build` - Build Angular app
- `npm run ng:test` - Run Angular tests

### Docker
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container

## 🎮 Features

### Sticker Management
- Create new football stickers with player information
- View all stickers in a responsive grid layout
- Search and filter stickers by country, team, or position
- Support for special edition stickers
- Image support for sticker photos

### Collection Management
- Create personal sticker collections
- Add stickers to collections with quantities
- Track collection statistics and progress
- View missing stickers and duplicates

### User Interface
- Modern Material Design interface
- Responsive design for mobile and desktop
- Real-time updates and notifications
- Intuitive navigation and user experience

## 📊 Database Schema

### Stickers
- `id`: Unique identifier
- `number`: Sticker number (1-999)
- `playerName`: Player's full name
- `team`: Team name
- `country`: Country name
- `position`: Player position
- `isSpecial`: Special edition flag
- `imageUrl`: Optional image URL

### Collections
- `id`: Unique identifier
- `userId`: Owner user ID
- `name`: Collection name
- `createdAt`: Creation timestamp

### Collected Stickers
- `collectionId`: Reference to collection
- `stickerId`: Reference to sticker
- `quantity`: Number of copies
- `collectedAt`: When added to collection

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose --profile dev up
```

### Production
```bash
docker-compose up -d
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=file:./data/stickers.db
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Follow the Clean Architecture principles
4. Ensure all tests pass
5. Submit a pull request

### Code Guidelines

- Follow the established layer boundaries
- Write tests for new features
- Use TypeScript strictly
- Follow the existing naming conventions
- Document complex business logic

## 📖 API Documentation

The API documentation is automatically generated with Swagger and available at `/api/docs` when the application is running.

### Main Endpoints

- `GET /api/stickers` - Get all stickers
- `POST /api/stickers` - Create a new sticker
- `GET /api/stickers/:id` - Get sticker by ID
- `POST /api/collections` - Create a new collection
- `PATCH /api/collections/:id/stickers` - Add sticker to collection

## 🏛️ Architecture Benefits

### Maintainability
- Clear separation of concerns
- Easy to modify and extend
- Minimal coupling between layers

### Testability
- Each layer can be tested independently
- Mock dependencies easily
- Focus on business logic testing

### Flexibility
- Easy to swap implementations (databases, external services)
- Framework-agnostic domain layer
- Scalable architecture

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Clean Architecture principles by Robert C. Martin
- NestJS framework for the robust backend structure
- Angular Material for the beautiful UI components
- TypeORM for the elegant database abstraction