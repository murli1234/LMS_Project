# LMS Frontend - Quick Reference

## 🚀 Running the Project

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Change Backend URL
**File**: `src/api/axiosConfig.js`
```javascript
export const BASE_URL = 'http://localhost:8080/api';
// Change to your backend URL
```

### Change Development Port
**File**: `vite.config.js`
```javascript
server: {
  port: 3000,  // Change this
  open: true
}
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/api/axiosConfig.js` | API configuration & interceptors |
| `src/context/AuthContext.jsx` | Authentication state management |
| `src/routes/ProtectedRoute.jsx` | Auth protection |
| `src/routes/RoleRoute.jsx` | Role-based access control |
| `src/components/Sidebar.jsx` | Navigation sidebar |
| `src/components/Navbar.jsx` | Top navigation |
| `src/App.jsx` | Main routing configuration |
| `vite.config.js` | Vite configuration |
| `src/index.css` | Global styles & Tailwind |

## 🎯 User Credentials (Test with Backend)

After backend is running, register users with these roles:
- **Admin**: Register via backend directly or use existing admin
- **Instructor**: Register through `/register` → Select "Instructor"
- **Mentor**: Register through `/register` → Select "Mentor"  
- **Student**: Register through `/register` → Select "Student"

## 🌐 Routes Overview

### Public Routes
- `/login` - Login page
- `/register` - Registration page
- `/unauthorized` - Access denied page

### Admin Routes (`/admin/*`)
- `/admin` - Dashboard
- `/admin/users` - Manage users
- `/admin/pending-courses` - Approve courses

### Instructor Routes (`/instructor/*`)
- `/instructor` - Dashboard
- `/instructor/create-course` - Create course
- `/instructor/my-courses` - My courses

### Mentor Routes (`/mentor/*`)
- `/mentor` - Dashboard
- `/mentor/queries` - Student queries

### Student Routes (`/student/*`)
- `/student` - Dashboard
- `/student/browse-courses` - Browse courses
- `/student/my-enrollments` - My enrollments
- `/student/ask-query` - Ask question
- `/student/my-queries` - My questions

## 🔑 Key Features

### Authentication
- JWT token stored in localStorage
- Automatic token refresh on page reload
- Auto-redirect to login on 401
- Role-based redirection after login

### State Management
- Context API for auth state
- Local state for component data
- No external state management library needed

### Styling
- Tailwind CSS v4
- Custom utility classes
- Responsive design
- Dark mode ready

### Animations
- GSAP for page transitions
- Stagger animations on cards
- Smooth sidebar transitions
- Form entry animations

## 🐛 Troubleshooting

### Backend Not Connecting
1. Ensure backend is running on `http://localhost:8080`
2. Check CORS configuration on backend
3. Verify API endpoints match

### Authentication Issues
1. Clear localStorage: `localStorage.clear()`
2. Check token in browser DevTools → Application → Local Storage
3. Verify JWT token format on backend

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

### Styles Not Loading
1. Verify `@import "tailwindcss";` is in `src/index.css`
2. Check if Tailwind plugin is in `vite.config.js`
3. Restart dev server

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `axios` - HTTP client
- `gsap` - Animations

### Development
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `@tailwindcss/vite` - Tailwind Vite plugin
- `vite-plugin-svgr` - SVG as React components
- `@vitejs/plugin-react` - React plugin for Vite

## 🎨 Custom CSS Classes

```css
/* Buttons */
.btn-primary      /* Blue button */
.btn-secondary    /* Gray button */
.btn-success      /* Green button */
.btn-danger       /* Red button */

/* Forms */
.input-field      /* Styled input */

/* Containers */
.card             /* White card */
.stat-card        /* Statistics card */
```

## 📝 Common Commands

```bash
# Development
npm run dev           # Start dev server

# Production
npm run build         # Build for production
npm run preview       # Preview production build

# Utilities
npm install [pkg]     # Add package
npm uninstall [pkg]   # Remove package
npm update            # Update packages
```

## 🔒 Security Best Practices

1. ✅ JWT tokens in httpOnly cookies (backend handles)
2. ✅ Token validation on every request
3. ✅ Role-based route protection
4. ✅ Input validation on forms
5. ✅ Error handling without exposing sensitive data
6. ✅ HTTPS in production

## 📞 Support

For issues:
1. Check browser console for errors
2. Verify backend is running
3. Clear localStorage and retry
4. Check network tab in DevTools

## 🎉 Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Backend running at `http://localhost:8080`
- [ ] Dev server running (`npm run dev`)
- [ ] Can access login page
- [ ] Can register new user
- [ ] Can login and see dashboard
- [ ] Role-based navigation works
- [ ] API calls successful

---

**Ready to start? Run:**
```bash
npm install
npm run dev
```

Then open http://localhost:3000 🚀
