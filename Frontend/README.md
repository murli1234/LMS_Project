# LMS Frontend - Learning Management System

A complete production-ready Learning Management System built with React, Vite, Tailwind CSS v4, and GSAP animations.

## 🚀 Features

- **Role-Based Access Control**: Admin, Instructor, Mentor, and Student roles
- **JWT Authentication**: Secure token-based authentication with localStorage
- **Modern UI**: Beautiful dashboard with Tailwind CSS v4
- **Smooth Animations**: GSAP-powered page transitions and interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Complete CRUD Operations**: Full integration with Spring Boot backend APIs

## 👥 User Roles & Features

### Admin
- View dashboard with system statistics
- Manage all users (activate/deactivate)
- Approve pending courses
- Monitor platform activity

### Instructor
- Create new courses
- Manage course content (sections & lessons)
- View enrollment statistics
- Track student progress

### Mentor
- View student queries
- Reply to student questions
- Mark queries as resolved
- Track response metrics

### Student
- Browse available courses
- Enroll in courses
- Track learning progress
- Ask questions to mentors
- View query responses

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP 3.12
- **HTTP Client**: Axios 1.7
- **State Management**: Context API

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Backend URL** (if needed):
   Open `src/api/axiosConfig.js` and change the `BASE_URL`:
   ```javascript
   export const BASE_URL = 'http://your-backend-url/api';
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🌐 Backend Integration

This frontend is designed to work with a Spring Boot backend. Ensure your backend is running at `http://localhost:8080/api`.

### API Endpoints Used

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Admin
- `GET /api/admin/users?page=0&size=10` - Get all users
- `PUT /api/admin/users/{id}/toggle-status` - Toggle user status
- `GET /api/admin/courses/pending?page=0&size=10` - Get pending courses
- `PUT /api/admin/courses/{id}/approve` - Approve course

#### Instructor
- `POST /api/instructor/courses` - Create course
- `POST /api/instructor/courses/{courseId}/sections` - Add section
- `POST /api/instructor/sections/{sectionId}/lessons` - Add lesson

#### Mentor
- `GET /api/mentor/queries?page=0&size=10` - Get student queries
- `POST /api/mentor/queries/{id}/reply` - Reply to query
- `PUT /api/mentor/queries/{id}/status/resolved` - Resolve query

#### Student
- `GET /api/student/courses?page=0&size=10` - Get available courses
- `POST /api/student/courses/{id}/enroll` - Enroll in course
- `POST /api/student/queries` - Submit query
- `POST /api/student/lessons/{id}/complete` - Mark lesson complete

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── axiosConfig.js     # Axios instance with interceptors
│   ├── authApi.js         # Authentication API calls
│   ├── adminApi.js        # Admin API calls
│   ├── instructorApi.js   # Instructor API calls
│   ├── mentorApi.js       # Mentor API calls
│   └── studentApi.js      # Student API calls
├── components/            # Reusable components
│   ├── Sidebar.jsx        # Navigation sidebar
│   ├── Navbar.jsx         # Top navigation bar
│   ├── Loader.jsx         # Loading spinner
│   └── DashboardLayout.jsx # Dashboard layout wrapper
├── context/               # React Context
│   └── AuthContext.jsx    # Authentication context
├── pages/                 # Page components
│   ├── auth/             # Authentication pages
│   ├── admin/            # Admin pages
│   ├── instructor/       # Instructor pages
│   ├── mentor/           # Mentor pages
│   └── student/          # Student pages
├── routes/               # Route protection
│   ├── ProtectedRoute.jsx # Auth check
│   └── RoleRoute.jsx      # Role-based access
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Axios interceptor adds token to all requests
5. On 401 error, user is redirected to login
6. On 403 error, access denied message is shown

## 🎨 Styling

The project uses Tailwind CSS v4 with custom utility classes:

- `btn-primary` - Primary button style
- `btn-secondary` - Secondary button style
- `btn-success` - Success button style
- `btn-danger` - Danger button style
- `input-field` - Input field style
- `card` - Card container style
- `stat-card` - Statistics card style

## 🚀 Deployment

### Netlify / Vercel
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables if needed

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔧 Configuration

### Change Backend URL
Edit `src/api/axiosConfig.js`:
```javascript
export const BASE_URL = 'https://your-production-backend.com/api';
```

### Modify Port
Edit `vite.config.js`:
```javascript
server: {
  port: 5000, // Change to your desired port
  open: true
}
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer Notes

- All API calls include error handling
- JWT token automatically added to requests
- Responsive design for all screen sizes
- GSAP animations for smooth UX
- Clean component architecture
- Reusable components and utilities

## 🐛 Troubleshooting

**Backend connection issues**:
- Ensure backend is running at `http://localhost:8080`
- Check CORS configuration on backend
- Verify API endpoints match documentation

**Authentication issues**:
- Clear localStorage: `localStorage.clear()`
- Check token expiration on backend
- Verify JWT secret matches

**Build issues**:
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

## 📞 Support

For issues and questions, please create an issue in the repository.
