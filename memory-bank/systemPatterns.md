# AI News App - System Patterns

## Overall Architecture
The AI News App follows a client-server architecture with clear separation between the React frontend and Next.js backend.

```mermaid
flowchart TD
    Client[Frontend: React SPA with FSD] --> |API Calls| Server[Backend: Next.js API Routes]
    Server --> |Responses| Client
    Server --> DB[MongoDB]
    Server --> AI[LangChain + OpenAI]
    Client <--> |WebSocket| Server
Frontend Architecture (React + Feature-Sliced Design)
UI Framework: React with TypeScript
Architecture Pattern: Feature-Sliced Design (FSD)
State Management: Redux Toolkit
Routing: React Router v6+
API Communication: Axios/Fetch API
Real-time Updates: Socket.IO Client
Feature-Sliced Design Structure
src/
├── app/                # Application initialization, providers
├── pages/              # Page components (route entry points)
├── widgets/            # Complex UI blocks combining entities, features
├── features/           # Business logic and user interactions
├── entities/           # Business entities (models, API, UI)
├── shared/             # Reusable infrastructure code
└── index.tsx           # Application entry point
Backend Architecture (Next.js API Routes)
Framework: Next.js API Routes with Node.js
Database: MongoDB with Mongoose ODM
AI/NLP: LangChain.js with OpenAI API
Real-time: Socket.IO for WebSocket connections
Authentication: JWT, bcrypt
Validation: Zod, class-validator
Backend Structure
pages/
├── api/                # API Routes for Next.js
    ├── auth/           # Authentication endpoints
    ├── sources/        # Source management
    ├── posts/          # Content retrieval and analysis
    ├── folders/        # Folder management
    ├── dashboard/      # Analytics and reporting
    ├── admin/          # Admin configuration
    └── socket.ts       # WebSocket configuration
lib/                    # Core libraries and utilities
models/                 # Mongoose models
modules/                # Analysis modules

Data Flow Patterns
sequenceDiagram
    participant Frontend
    participant API
    participant LangChain
    participant MongoDB
    
    Frontend->>API: Request content analysis
    API->>LangChain: Process with AI
    LangChain->>API: Return analysis results
    API->>MongoDB: Store results
    API->>Frontend: Return initial response
    API->>Frontend: Push real-time updates via WebSocket

Authentication Pattern
JWT-based authentication with secure HTTP-only cookies
Middleware for protected API routes
Role-based authorization (regular users vs. admin)
Token verification and user extraction in request pipeline
API Communication Pattern
RESTful API design with proper HTTP methods
Consistent response formats
Error handling with appropriate status codes
WebSocket for real-time updates
Real-time Update Pattern
Socket.IO for WebSocket connections
Event-based communication system
Connection management in dedicated API route
Event emissions for specific update types    
