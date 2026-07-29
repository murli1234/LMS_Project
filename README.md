# Learning Management System (LMS)

A full-stack Learning Management System with role-based dashboards for **Admin**, **Instructor**, **Mentor**, and **Student** users. The platform supports course creation, enrollment, lesson progress tracking, and a student–mentor query system.

## Features

### Authentication & Security
- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes on frontend and secured API endpoints on backend
- BCrypt password encryption

### Admin
- Dashboard with platform statistics
- User management (view, activate/deactivate)
- Course approval workflow
- View all courses and pending submissions

### Instructor
- Create and manage courses
- Add sections and lessons (video/PDF content)
- Track course status (pending/approved)
- View enrollment data

### Mentor
- View assigned student queries
- Reply to questions and update query status (Open → In Progress → Resolved)

### Student
- Browse and enroll in approved courses
- Track enrollments and lesson progress
- Submit queries and view mentor replies

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 18, Vite, React Router v7, Tailwind CSS v4, Axios, GSAP |
| Backend  | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA |
| Database | MySQL 8 |
| Auth     | JWT (JSON Web Tokens) |

## Project Structure

```
LMS_PROJECT/
├── Backend/                 # Spring Boot REST API
│   ├── src/main/java/com/lms/
│   │   ├── config/          # Security, CORS, etc.
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Request/response DTOs
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data access layer
│   │   ├── security/        # JWT & auth filters
│   │   └── service/         # Business logic
│   └── src/main/resources/
│       └── application.properties
│
└── Frontend/                # React SPA
    ├── src/
    │   ├── api/             # Axios API modules
    │   ├── components/      # Reusable UI components
    │   ├── context/         # Auth context
    │   ├── pages/           # Role-based pages
    │   └── routes/          # Protected & role routes
    └── package.json
```

## Prerequisites

- **Java 17+**
- **Maven 3.6+**
- **Node.js 18+** and **npm**
- **MySQL 8.0+**

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/murli1234/LMS_Project/tree/main
cd LMS_PROJECT
```

### 2. Set up the database

Create a MySQL database (or let the app create it automatically):

```sql
CREATE DATABASE lms_db;
```

Update database credentials in `Backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lms_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
```

> **Note:** Do not commit real database passwords or JWT secrets to GitHub. Use environment variables or a local config file that is gitignored for production deployments.

### 3. Run the backend

```bash
cd Backend
mvn spring-boot:run
```

The API will be available at:

```
http://localhost:9090/api
```

### 4. Run the frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The app will open at:

```
http://localhost:3000
```

If your backend runs on a different host or port, update `Frontend/src/api/axiosConfig.js`:

```javascript
export const BASE_URL = 'http://localhost:9090/api';
```

## Default Login

On first run, the backend seeds default roles and an admin account:

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | `admin`  | `admin123` |

New users can register as **Student**, **Instructor**, or **Mentor** from the registration page.

## User Roles & Routes

| Role       | Dashboard Path | Key Features |
|------------|----------------|--------------|
| Admin      | `/admin`       | Users, courses, approvals |
| Instructor | `/instructor`  | Create courses, manage content |
| Mentor     | `/mentor`        | Answer student queries |
| Student    | `/student`       | Enroll, learn, ask questions |

## API Overview

Base URL: `http://localhost:9090/api`

| Module     | Example Endpoints |
|------------|-------------------|
| Auth       | `POST /auth/register`, `POST /auth/login` |
| Admin      | `GET /admin/users`, `PUT /admin/courses/{id}/approve` |
| Instructor | `POST /instructor/courses`, `POST /instructor/sections/{id}/lessons` |
| Mentor     | `GET /mentor/queries`, `POST /mentor/queries/{id}/reply` |
| Student    | `GET /student/courses`, `POST /student/courses/{id}/enroll` |

For detailed API documentation, see [Backend/README.md](Backend/README.md).

## Build for Production

**Backend:**

```bash
cd Backend
mvn clean package
java -jar target/lms-backend-1.0.0.jar
```

**Frontend:**

```bash
cd Frontend
npm run build
```

Production files are output to `Frontend/dist/`.

## Environment Configuration

| Setting | File | Description |
|---------|------|-------------|
| Server port | `Backend/.../application.properties` | Default: `9090` |
| API context path | `Backend/.../application.properties` | Default: `/api` |
| JWT secret & expiry | `Backend/.../application.properties` | Configure before deployment |
| Frontend API URL | `Frontend/src/api/axiosConfig.js` | Must match backend URL |



## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

 [@murli1234](https://github.com/murli1234)

---

Built with Spring Boot and React.
