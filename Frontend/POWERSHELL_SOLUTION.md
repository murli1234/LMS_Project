# PowerShell Execution Policy Solution

## ✅ Problem Solved!

Your dev server is now running successfully at **http://localhost:3000/** 🎉

## 🔧 The Issue

PowerShell has script execution disabled on your system, which blocks npm commands.

## 💡 Solutions

### Option 1: Use CMD (Recommended - Easiest)

Instead of running npm commands directly in PowerShell, use `cmd /c`:

```bash
# Instead of:
npm run dev

# Use:
cmd /c "npm run dev"
```

**All npm commands with cmd:**
```bash
cmd /c "npm install"
cmd /c "npm run dev"
cmd /c "npm run build"
cmd /c "npm run preview"
```

### Option 2: Use Git Bash or Command Prompt

Open **Git Bash** or **Command Prompt (cmd.exe)** instead of PowerShell:
- Press `Win + R`
- Type `cmd` and press Enter
- Navigate to your project: `cd "D:\Lms Frontend"`
- Run normally: `npm run dev`

### Option 3: One-Time Bypass (In Current PowerShell Session)

```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

### Option 4: Change Execution Policy (Requires Admin)

⚠️ **Only if you have admin rights:**

1. Open PowerShell as Administrator
2. Run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
3. Type `Y` and press Enter
4. Close and reopen PowerShell
5. Now you can run `npm run dev` directly

## 🎯 Current Status

✅ **Dev server is running!**
- URL: **http://localhost:3000/**
- Backend: http://localhost:8080/api (make sure it's running)

## 📝 Quick Commands Reference

### Using CMD wrapper:
```bash
# Development
cmd /c "npm run dev"

# Build for production
cmd /c "npm run build"

# Preview production build
cmd /c "npm run preview"

# Install new package
cmd /c "npm install package-name"
```

### Or just switch to CMD:
```bash
# Open Command Prompt and run:
cd "D:\Lms Frontend"
npm run dev
```

## 🚀 Next Steps

1. **Keep the dev server running** in current terminal
2. **Open browser** at http://localhost:3000
3. **Ensure backend is running** at http://localhost:8080
4. **Login or Register** to test the application

## 🎓 What to Test

1. Register a new user (Student/Instructor/Mentor)
2. Login and verify role-based redirection
3. Explore your role-specific dashboard
4. Test CRUD operations for your role

Enjoy your LMS application! 🎉
