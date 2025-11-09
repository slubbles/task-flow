# 🧪 Testing Guide - TaskFlow Refinements

## 📋 Overview

This guide helps you test all the UX refinements that were just implemented.

---

## 🌐 Accessing the Application

### Frontend URL
```
https://laughing-orbit-5pqj6q5wx7whqr4-3000.preview.app.github.dev
```

### Backend API URL
```
https://laughing-orbit-5pqj6q5wx7whqr4-5000.preview.app.github.dev/api
```

### ⚠️ IMPORTANT: Make Ports Public

Before testing, you need to make the ports public in GitHub Codespaces:

1. Click on **PORTS** tab at the bottom of VS Code
2. Find port **3000** (frontend)
3. Right-click → **Port Visibility** → **Public**
4. Find port **5000** (backend)
5. Right-click → **Port Visibility** → **Public**

---

## ✅ Test Checklist

### 1. 🔐 Authentication Pages

#### Login Page (`/login`)
- [ ] Page loads with gradient background
- [ ] Blue icon badge appears at top
- [ ] Form has larger inputs (44px height)
- [ ] Try incorrect credentials:
  - [ ] Toast notification appears (top-right)
  - [ ] Error toast shows "Login Failed"
  - [ ] Toast auto-dismisses after 3-5 seconds
- [ ] Try correct credentials:
  - [ ] Button shows spinning loader
  - [ ] Success toast: "Welcome back!"
  - [ ] Redirects to dashboard
- [ ] Click "Forgot?" link (placeholder for now)
- [ ] Click "Create Account" button → navigates to register

#### Register Page (`/register`)
- [ ] Page loads with gradient background
- [ ] User add icon badge appears
- [ ] All 4 fields present (name, email, password, confirm)
- [ ] Try mismatched passwords:
  - [ ] Toast shows "Validation Error"
  - [ ] Description: "Passwords do not match"
- [ ] Try password < 6 characters:
  - [ ] Toast shows validation error
- [ ] Create valid account:
  - [ ] Button shows spinning loader
  - [ ] Success toast: "Account Created! Welcome to TaskFlow, [Name]!"
  - [ ] Auto-login and redirect to dashboard

---

### 2. 📊 Dashboard Page

#### Basic Checks
- [ ] Navbar appears at top
- [ ] User avatar with initials shows in navbar
- [ ] Stats cards display (Projects, Tasks, etc.)
- [ ] Quick actions section visible

---

### 3. 📁 Projects Page (`/projects`)

#### Initial Load
- [ ] Page shows "Projects" heading
- [ ] While loading:
  - [ ] 6 skeleton cards appear in grid
  - [ ] Skeleton cards pulse/animate
  - [ ] No spinning circle
- [ ] After load:
  - [ ] Real project cards replace skeletons
  - [ ] Smooth transition

#### Create Project (ADMIN/MANAGER only)
- [ ] "Create Project" button visible (if ADMIN/MANAGER role)
- [ ] Click button → Dialog opens
- [ ] Fill form fields
- [ ] Click "Create Project":
  - [ ] Button shows spinning icon
  - [ ] Button text: "Creating..."
  - [ ] Form fields disabled during submit
- [ ] On success:
  - [ ] Toast: "Project Created!"
  - [ ] Description includes project name
  - [ ] Dialog closes
  - [ ] New project appears in list
- [ ] On error:
  - [ ] Toast: "Failed to Create Project"
  - [ ] Error description shown
  - [ ] Form stays open for retry

#### Empty State
- [ ] If no projects:
  - [ ] "No projects yet" message
  - [ ] "Create Your First Project" button (if ADMIN/MANAGER)

---

### 4. ✅ Tasks Page (`/tasks`)

#### Initial Load
- [ ] "Tasks" heading visible
- [ ] While loading:
  - [ ] 6 skeleton cards in grid
  - [ ] Skeletons show task structure (title, badges, details, button)
  - [ ] Animated pulse effect
- [ ] After load:
  - [ ] Real task cards appear
  - [ ] Priority badges (URGENT=red, HIGH=blue, etc.)
  - [ ] Status badges (COMPLETED, IN_PROGRESS, etc.)

#### Task Cards
- [ ] Each card shows:
  - [ ] Title (truncated if long)
  - [ ] Description
  - [ ] Priority badge (top-right)
  - [ ] Status badge
  - [ ] Assignee (if assigned)
  - [ ] Due date (if set)
  - [ ] "View Details" button

#### Error Handling
- [ ] If load fails:
  - [ ] Toast: "Failed to Load Tasks"
  - [ ] Description with error message

---

## 🎨 Visual Design Checks

### Gradients
- [ ] Login/Register: Blue-to-indigo gradient background
- [ ] Other pages: Gray-50 background

### Cards
- [ ] All cards have subtle shadow
- [ ] Hover effect: Shadow increases (hover:shadow-lg)
- [ ] Smooth transitions

### Buttons
- [ ] Primary buttons: Blue background
- [ ] Outline buttons: White with border
- [ ] Disabled state: Grayed out, cursor not-allowed
- [ ] Loading state: Spinning icon + text change

### Toasts
- [ ] Appear top-right corner
- [ ] Success: Green icon
- [ ] Error: Red icon
- [ ] Auto-dismiss after ~4 seconds
- [ ] Can manually close with X button
- [ ] Rich colors enabled

### Skeletons
- [ ] Gray background (bg-gray-200)
- [ ] Pulse animation
- [ ] Match actual content structure
- [ ] Different widths for variety

---

## 🐛 Known Behaviors

### First-Time Registration
- **Default Role:** MEMBER
- **Create Project:** Only ADMIN/MANAGER can create
- **Solution:** You'll need to manually update role in database OR create test accounts with different roles

### Database Access
To test different roles, you can update a user in the database:

```bash
# Connect to database
docker exec -it taskmanagement-db psql -U taskuser -d taskmanagement

# Update user role
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';

# Exit
\q
```

---

## 📸 Screenshot Checklist

Take screenshots of these for your portfolio:

1. **Login page** - Modern gradient design
2. **Register page** - With validation toast
3. **Projects page** - Skeleton loading state
4. **Projects page** - With loaded cards
5. **Create project toast** - Success notification
6. **Tasks page** - Skeleton loading
7. **Tasks page** - With priority/status badges
8. **Navbar** - User dropdown menu

---

## 🔍 Browser DevTools Checks

### Network Tab
- [ ] API calls to backend URL
- [ ] Authorization header includes JWT token
- [ ] CORS working (no errors)

### Console Tab
- [ ] No React errors
- [ ] No TypeScript errors
- [ ] No 404s for missing files

### Application Tab
- [ ] localStorage has `auth-storage` key
- [ ] Contains `state.user` and `state.token`

---

## 🎯 User Flow Testing

### Complete New User Flow
1. [ ] Go to homepage → See landing page
2. [ ] Click "Get Started" → Go to register
3. [ ] Create account → See welcome toast
4. [ ] Auto-login → Redirect to dashboard
5. [ ] Click "Projects" → See skeleton → See empty state
6. [ ] Click "Tasks" → See skeleton → See empty state
7. [ ] (If ADMIN) Create project → See toast → See new card
8. [ ] Logout → Redirect to homepage

### Returning User Flow
1. [ ] Go to `/login`
2. [ ] Enter credentials → See loading spinner
3. [ ] Success → See "Welcome back" toast
4. [ ] Dashboard loads → See user data
5. [ ] Navigate pages → Data persists
6. [ ] Refresh page → Still logged in (localStorage)

---

## 🚨 Error Scenarios to Test

### Network Errors
- [ ] Stop backend container → Try to login → See error toast
- [ ] Restart backend → App recovers

### Validation Errors
- [ ] Empty form submission → HTML5 validation
- [ ] Invalid email format → Browser validation
- [ ] Short password → Client-side toast
- [ ] Mismatched passwords → Client-side toast

### Auth Errors
- [ ] Invalid token → Auto-logout on 401
- [ ] Expired token → Redirect to login
- [ ] No token → Redirect to login (ProtectedRoute)

---

## 📊 Performance Checks

### Initial Load
- [ ] Frontend ready in < 2 seconds
- [ ] No flickering during skeleton → content transition
- [ ] Smooth animations (60fps)

### Interactions
- [ ] Button clicks respond immediately
- [ ] Toasts appear instantly
- [ ] Form submission feedback < 100ms
- [ ] Navigation transitions smooth

---

## ✅ Final Verification

Before moving to next features:

- [ ] All pages load without errors
- [ ] All toasts work correctly
- [ ] All skeletons display properly
- [ ] All loading states show spinners
- [ ] All forms validate properly
- [ ] All API calls complete successfully
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No build warnings

---

## 🎓 What to Show Employers

When presenting this project, highlight:

1. **Modern UX Patterns**
   - "I implemented skeleton loaders instead of spinners for better perceived performance"
   - "Toast notifications provide non-blocking user feedback"

2. **Error Handling**
   - "Graceful error handling with user-friendly messages"
   - "Client-side validation before hitting the backend"

3. **Loading States**
   - "Multiple loading states: skeletons, spinners, disabled buttons"
   - "Prevents double-submission with disabled states"

4. **Design System**
   - "Consistent component usage from shadcn/ui library"
   - "Tailwind CSS for responsive design"

5. **TypeScript**
   - "Full type safety across the application"
   - "Props typed correctly for all components"

---

## 📞 Troubleshooting

### Ports Not Accessible
**Problem:** Can't access URLs in browser  
**Solution:** Make ports 3000 and 5000 Public in PORTS tab

### Toasts Don't Appear
**Problem:** No notifications showing  
**Solution:** Check console for errors, verify Toaster in layout.tsx

### Skeletons Don't Show
**Problem:** Shows old spinner instead  
**Solution:** Hard refresh (Ctrl+Shift+R) to clear cache

### 401 Unauthorized
**Problem:** All API calls fail with 401  
**Solution:** Clear localStorage, re-login to get fresh token

---

**Last Updated:** 2024  
**Status:** ✅ Ready for Testing

Happy Testing! 🎉
