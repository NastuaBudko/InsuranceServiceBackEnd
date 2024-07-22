# Insurance Service API

## Description

The Insurance Service API provides a RESTful interface for managing insurance policies. 
It allows to get, create and delete insurance policies, branches and insurance types.

## API Documentation

Detailed API documentation is available at: [API Docs](https://your-render-url.onrender.com/api-docs)

## Deployed Backend

The project is deployed on Render and accessible at: [Insurance Service API](https://your-render-url.onrender.com)

## Main Endpoints

### Auth Routes
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user information

### Insurance Routes
- `GET /insurances` - Get all insurance policies
- `GET /insurances/:id` - Get insurance policy by ID
- `POST /insurances` - Create a new insurance policy
- `DELETE /insurances/:id` - Delete insurance policy by ID

### Branch Routes
- `GET /branches` - Get all branches
- `GET /branches/:id` - Get branch by ID
- `POST /branches` - Create a new branch
- `DELETE /branches/:id` - Delete branch by ID

### Insurance Type Routes
- `GET /insurance-types` - Get all insurance types
- `GET /insurance-types/:id` - Get insurance type by ID
- `POST /insurance-types` - Create a new insurance type
- `DELETE /insurance-types/:id` - Delete insurance type by ID

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a .env file based on .env.example and fill in the required values:
   ```plaintext
   MONGODB_URL=mongodb+srv://your-mongo-uri
   SECRET_KEY=your-secret-key
   SERVER_URL=your-server-url
   ```
## Running the application

### Development Mode
   ```bash
   npm run start:dev
   ```

### Production Mode
   ```bash
   npm start
   ```

The server will be running at http://localhost:5555 by default.


