# Learning Management System (LMS) Backend

A complete production-ready Learning Management System backend built with Spring Boot, featuring JWT authentication, role-based access control, and comprehensive course management.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (ADMIN, INSTRUCTOR, MENTOR, STUDENT)
- BCrypt password encryption
- Secure API endpoints

### 👑 Admin Module
- User management (CRUD operations)
- User status management (Block/Unblock)
- Course approval workflow
- Mentor assignment to courses
- Dashboard statistics
- View all student queries

### 👨🏫 Instructor Module
- Course creation and management
- Section and lesson management
- Video and PDF content upload
- Student enrollment tracking
- Course analytics

### 🧑💼 Mentor Module
- View assigned courses and students
- Student query management
- Reply to student queries
- Query status management (OPEN, IN_PROGRESS, RESOLVED)

### 👨🎓 Student Module
- Course browsing and enrollment
- Lesson progress tracking
- Query/doubt system
- Mentor interaction
- Course completion tracking

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Hibernate)
- **MySQL Database**
- **Maven** (Build Tool)
- **Lombok** (Code Generation)

## 📦 Project Structure

```
src/main/java/com/lms/
├── config/          # Configuration classes
├── controller/      # REST Controllers
├── dto/            # Data Transfer Objects
├── entity/         # JPA Entities
├── exception/      # Exception Handlers
├── repository/     # JPA Repositories
├── security/       # Security Components
├── service/        # Business Logic
│   └── impl/       # Service Implementations
└── util/           # Utility Classes
```

## 🗄️ Database Schema

### Core Tables
- `users` - User information
- `roles` - User roles
- `user_roles` - User-Role mapping
- `categories` - Course categories
- `courses` - Course information
- `sections` - Course sections
- `lessons` - Individual lessons
- `enrollments` - Student enrollments
- `lesson_progress` - Lesson completion tracking
- `student_queries` - Student questions/doubts
- `query_replies` - Replies to queries
- `mentor_assignments` - Mentor-Course assignments

## 🚀 Getting Started

### Prerequisites
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lms-backend
   ```

2. **Configure Database**
   - Create MySQL database: `lms_db`
   - Update `application.properties` with your database credentials

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the API**
   - Base URL: `http://localhost:9090/api`
   - Default Admin: `admin` / `admin123`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": "Bearer",
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "roles": ["ROLE_STUDENT"]
  }
}
```

### Admin Endpoints

#### Get All Users
```http
GET /api/admin/users?page=0&size=10
Authorization: Bearer <token>
```

#### Toggle User Status
```http
PUT /api/admin/users/{id}/toggle-status
Authorization: Bearer <token>
```

#### Approve Course
```http
PUT /api/admin/courses/{id}/approve
Authorization: Bearer <token>
```

#### Get Pending Courses
```http
GET /api/admin/courses/pending?page=0&size=10
Authorization: Bearer <token>
```

### Student Endpoints

#### Browse Courses
```http
GET /api/student/courses?page=0&size=10
Authorization: Bearer <token>
```

#### Enroll in Course
```http
POST /api/student/courses/{id}/enroll
Authorization: Bearer <token>
```

#### Create Query
```http
POST /api/student/queries
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Question about Spring Boot",
  "description": "I need help understanding dependency injection",
  "courseId": 1,
  "lessonId": 5,
  "imageUrl": "https://example.com/screenshot.png"
}
```

#### Mark Lesson Complete
```http
POST /api/student/lessons/{id}/complete
Authorization: Bearer <token>
```

### Instructor Endpoints

#### Create Course
```http
POST /api/instructor/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Spring Boot Masterclass",
  "description": "Complete guide to Spring Boot development",
  "price": 99.99,
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "categoryId": 1
}
```

#### Create Section
```http
POST /api/instructor/courses/{courseId}/sections
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to Spring Boot",
  "description": "Basic concepts and setup",
  "orderIndex": 1
}
```

#### Create Lesson
```http
POST /api/instructor/sections/{sectionId}/lessons
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Setting up Spring Boot Project",
  "description": "Learn how to create a new Spring Boot project",
  "videoUrl": "https://example.com/video.mp4",
  "pdfUrl": "https://example.com/notes.pdf",
  "orderIndex": 1,
  "durationMinutes": 15
}
```

### Mentor Endpoints

#### Get Assigned Queries
```http
GET /api/mentor/queries?page=0&size=10
Authorization: Bearer <token>
```

#### Reply to Query
```http
POST /api/mentor/queries/{id}/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Here's the solution to your problem..."
}
```

#### Update Query Status
```http
PUT /api/mentor/queries/{id}/status/resolved
Authorization: Bearer <token>
```

## 🔒 Security

### JWT Token
- Include JWT token in Authorization header: `Bearer <token>`
- Token expires in 24 hours (configurable)
- Tokens are stateless and contain user information

### Role-Based Access
- **ADMIN**: Full system access
- **INSTRUCTOR**: Course management
- **MENTOR**: Query management for assigned courses
- **STUDENT**: Course enrollment and learning

## 📊 Default Data

The system automatically creates:
- **Roles**: ADMIN, INSTRUCTOR, MENTOR, STUDENT
- **Admin User**: username: `admin`, password: `admin123`
- **Categories**: Programming, Data Science, Web Development, Mobile Development, DevOps

## 🔧 Configuration

### Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lms_db
spring.datasource.username=root
spring.datasource.password=password
```

### JWT Configuration
```properties
jwt.secret=your-secret-key
jwt.expiration=86400000
```

## 🚨 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing

### Sample Test Flow

1. **Register as Student**
2. **Login and get JWT token**
3. **Browse available courses**
4. **Enroll in a course**
5. **Create a query**
6. **Mark lessons as complete**

### Admin Test Flow

1. **Login as admin** (`admin`/`admin123`)
2. **View all users**
3. **Approve pending courses**
4. **Manage user roles**

## 📈 Future Enhancements

- File upload for course materials
- Real-time notifications
- Course ratings and reviews
- Payment integration
- Video streaming optimization
- Mobile app support
- Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: support@lms.com

---

**Built with ❤️ using Spring Boot**