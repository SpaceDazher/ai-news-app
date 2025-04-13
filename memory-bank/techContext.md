# AI News App - Tech Context

## Technology Stack

### Frontend (React SPA)
- **Framework**: React (v18+)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6+
- **API Communication**: Axios/Fetch API
- **Real-time**: Socket.IO Client
- **Visualization**: Chart.js/Recharts
- **Build Tool**: Vite or Create React App
- **Styling**: CSS Modules, Styled Components, or Tailwind CSS

### Backend (Next.js API Routes)
- **Runtime**: Node.js (v18+)
- **Framework**: Next.js (v14+) with API Routes
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ODM**: Mongoose for MongoDB interactions
- **AI/NLP**: LangChain.js for AI model integration
- **LLM**: OpenAI API (gpt-3.5-turbo for MVP)
- **Real-time**: Socket.IO for WebSocket connections
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Validation**: Zod, class-validator

### Database Schema
- **User**: Authentication and profile data
- **Source**: News sources configuration
- **AnalysisResult**: Results from AI processing
- **Folder**: Organization structure
- **ModuleConfig**: Analysis module settings

### AI Integration
- LangChain.js framework for LLM interaction
- Integration with openrouter (gemini)
- Text preprocessing and cleanup
- Classification and categorization
- Sentiment analysis
- Named Entity Recognition (NER)
- Text summarization
- Importance scoring
- Pattern analysis (post-MVP)

### Development Environment
- **IDE**: VS Code with Cline extension
- **Version Control**: Git with GitHub
- **Package Manager**: npm or yarn
- **Environment Variables**: .env.local files

### Deployment Options
- **Frontend**: Vercel, Netlify, AWS S3, GitHub Pages
- **Backend**: Vercel, Render, Heroku, AWS, Google Cloud
- **Database**: MongoDB Atlas (cloud-hosted)