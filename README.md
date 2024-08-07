# API Suggestions with AdonisJS

This API allows users to create suggestions and react with likes or dislikes. It also includes a complete authentication system (register/login). Built with the AdonisJS framework.

## Features

- **Create Suggestions**: Users can submit suggestions.
- **Reactions**: Users can react to suggestions with likes or dislikes.
- **Authentication System**:
    - Register
    - Login

## Prerequisites

- Node.js >= 20.6

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Akira13345/suggestion.git
    cd suggestion
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```


3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your environment-specific variables. You can use the `env.example` file as a reference.


4. **Build the project**:
    ```bash
    npm run build
    ```

5. **Start the project**:
    ```bash
    npm run start
    ```

6. **Access the API**:
   The API will be running at `http://localhost:3333`.

## Endpoints

Here is a list of the available endpoints in this API:

### Authentication

- **Register**
    - `POST /register`
    - Request body:
      ```json
      {
        "username": "string",
        "email": "string",
        "password": "string"
      }
      ```
- **Login**
    - `POST /login`
    - Request body:
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
- **Profile**
    - `GET /profile`
    - Headers:
      ```json
      {
        "Authorization": "Bearer <token>"
      }
      ```

### Suggestions

- **Create Suggestion**
    - `POST /suggestions`
    - Request body:
      ```json
      {
        "content": "string"
      }
      ```
    - Headers:
      ```json
      {
        "Authorization": "Bearer <token>"
      }
      ```

- **React to Suggestion**
    - `POST /suggestions/:id/react`
    - Request body:
      ```json
      {
        "reaction": "like"
      }
      ```
    - Headers:
      ```json
      {
        "Authorization": "Bearer <token>"
      }
      ```

- **Get Suggestions**
    - `GET /suggestions`
    - Headers:
      ```json
      {
        "Authorization": "Bearer <token>"
      }
      ```

