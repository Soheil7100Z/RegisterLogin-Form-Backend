# Register & Login Backend

An Express.js backend for handling user registration, login, authentication, and access to protected user profile data.

## 🌐 Live URL

- [Backend on Render](https://registerlogin-form-backend.onrender.com)

## 🔍 Features

- **Endpoints in route auth**:
  - POST /register: Register a new user (stores user in MySQL with hashed password)
  - POST /login: Authenticate user and return JWT token
- **Endpoints in route profile**:
  - GET /protected/profile: Fetch user’s data after verifying token
  - PUT /protected/edited: Update user profile information
 
## 🛠️ Technologies Used

- **Node.js + Express**
- **MySQL** - remote database (freesqldatabase.com)
- **bcrypt** - for password hashing
- **jsonwebtoken (JWT)** - for secure token-based login
- **CORS** – for cross-origin frontend communication
- **dotenv** – for environment configuration

## 🔒 Authentication

- Implements JSON Web Tokens (JWT) for user login
- Token verification middleware protects routes and attaches user info to the request

## 📁 Database

To set up the database, run the following SQL code to create the `users` table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  location VARCHAR(100),
  register_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

### For Database Connection:
- `DB_HOST` — Your database host (e.g., `sql.freesqldatabase.com`)
- `DB_USER` — Database username
- `DB_PASS` — Database password
- `DB_NAME` — Database name

### For JWT:
- `JWT_SECRET` — A long, random string for signing JWT tokens (e.g., `e48afghf3b654cjklcf6`)
 
