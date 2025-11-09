# 🧪 TaskFlow - Complete Testing Checklist (Priorities 1-8)

**Production URL**: https://task-flow-khaki-nine.vercel.app/

---

## ✅ Priority 1: OAuth Callback UI

### Test Steps:
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/login
2. Click **"Continue with GitHub"** button
3. Authorize the GitHub OAuth app
4. **Watch for animated states**:
   - ⏳ **Loading state**: Animated spinner, progress bar (0% → 100%)
   - ✅ **Success state**: Green checkmark animation, "Welcome! 🎉" message
   - Auto-redirect to dashboard after 1.5 seconds

### Expected Results:
- ✅ Smooth animations with Framer Motion
- ✅ Progress bar fills smoothly
- ✅ Success screen shows briefly before redirect
- ✅ You land on dashboard with your GitHub profile

### Error Scenarios to Test:
- If GitHub email is private → See error: "GitHub Email Required"
- Each error has detailed description and retry button

---

## ✅ Priority 2: Task Assignment

### Test Steps:
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/tasks
2. Click **"Create Task"** button
3. Fill in task details:
   - Title: "Test Assignment Feature"
   - Description: "Testing assignee selection"
   - Project: Select any project
   - **Assign To**: Select yourself or another team member
   - Priority: Medium
   - Due Date: Tomorrow
4. Click **"Create Task"**

### Expected Results:
- ✅ Dropdown shows all team members with roles
- ✅ "You" label appears next to your name
- ✅ "Unassigned" option available
- ✅ Task card shows assignee name with avatar
- ✅ "Assigned: You" or "Assigned: [Name]" appears on card

---

## ✅ Priority 3: Search & Filters

### Test Steps:
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/tasks
2. **Test Search Bar**:
   - Type partial task name
   - Type description keywords
   - Results update in real-time
   - Results count badge updates

3. **Test Status Filter**:
   - Select "In Progress"
   - Only in-progress tasks show
   - Select "Completed"
   - Only completed tasks show

4. **Test Priority Filter**:
   - Select "High"
   - Only high-priority tasks show
   - Select "Urgent"
   - Only urgent tasks show

5. **Test Assignee Filter**:
   - Select "Assigned to Me"
   - Only your tasks show
   - Select "Unassigned"
   - Only unassigned tasks show
   - Select specific team member
   - Only their tasks show

6. **Test Clear Filters**:
   - Apply multiple filters
   - Click **"Clear Filters"** button
   - All tasks reappear

### Expected Results:
- ✅ Search works on title AND description
- ✅ Filters combine (AND logic)
- ✅ Results count shows "X tasks" (plural handling)
- ✅ Clear button only appears when filters active
- ✅ Empty state shows when no matches
- ✅ "Try adjusting your filters" message appears

---

## ✅ Priority 4: Forgot Password Flow

### Test Complete Flow:

#### Part A: Request Reset
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/login
2. Click **"Forgot Password?"** link
3. Enter your email address
4. Click **"Send Reset Instructions"**

**Expected**:
- ✅ Loading state: "Sending..."
- ✅ Success screen: Green checkmark animation
- ✅ "Check Your Email" message
- ✅ Helpful tips about spam folder
- ✅ "Try Another Email" button

#### Part B: Reset Password
5. **Check your email inbox** (or spam folder)
6. Find email from TaskFlow
7. Click the reset link
8. **You're redirected to**: `/reset-password?token=...`

**On Reset Page**:
9. Enter new password (min 6 chars)
10. Confirm new password
11. Watch for real-time validation:
    - ⚠️ Yellow warning if password < 6 chars
    - ⚠️ Red error if passwords don't match
12. Click **"Reset Password"**

**Expected**:
- ✅ Loading: "Resetting Password..."
- ✅ Success: Green checkmark, "Password Reset Complete!"
- ✅ Auto-redirect countdown to login
- ✅ Manual "Continue to Login" button

#### Part C: Login with New Password
13. **Navigate to**: https://task-flow-khaki-nine.vercel.app/login
14. Login with email and NEW password
15. Should successfully log in

### Error Scenarios:
- ❌ Expired token → "Reset link may have expired"
- ❌ Invalid token → "Invalid reset link"
- ❌ Password mismatch → "Passwords do not match"

---

## ✅ Priority 5: Error Boundary

### Test Steps:

#### Manual Error Trigger:
1. Open browser DevTools (F12)
2. Go to Console tab
3. While on any page, type:
   ```javascript
   throw new Error("Testing Error Boundary")
   ```
4. Press Enter

**Expected**:
- ✅ App doesn't crash
- ✅ Error boundary shows:
  - Red warning icon
  - "Oops! Something went wrong" message
  - "Reload Page" button
  - "Go to Home" button
  - "Go to Dashboard" button
- ✅ In development: Error details visible
- ✅ Click "Reload Page" → App restarts

#### Alternative Test (Simulate Component Error):
- This would require temporarily breaking a component
- Not recommended for production testing

---

## ✅ Priority 6: Task Detail Modal

### Test Steps:
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/tasks
2. Find any task card
3. Click **"View Details"** button

**In Modal**:
4. **View all task info**:
   - ✅ Full title
   - ✅ Description
   - ✅ Status badge
   - ✅ Priority badge
   - ✅ Assignee with avatar
   - ✅ Project name
   - ✅ Due date (formatted)
   - ✅ Creator info
   - ✅ Created/updated timestamps

5. **Test Edit Mode**:
   - Click **Edit button** (pencil icon)
   - Change title
   - Change status dropdown
   - Change priority dropdown
   - Change assignee
   - Change due date
   - Click **"Save Changes"**

**Expected**:
- ✅ All changes save successfully
- ✅ Toast notification: "Task Updated!"
- ✅ Task card updates immediately
- ✅ Modal shows updated data

6. **Test Delete**:
   - Click **Delete button** (trash icon)
   - Confirm deletion alert
   - Click OK

**Expected**:
- ✅ Confirmation prompt appears
- ✅ Task removed from list
- ✅ Modal closes
- ✅ Toast: "Task Deleted"

---

## ✅ Priority 7: Dashboard Real Stats

### Test Steps:
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/dashboard
2. **Check all 6 stat cards load**:

**Verify Numbers Match Reality**:
- ✅ **Total Projects**: Count matches your projects page
- ✅ **Total Tasks**: Count matches all tasks
- ✅ **My Tasks**: Only tasks assigned to you
- ✅ **To Do**: Only TODO status tasks
- ✅ **In Progress**: Only IN_PROGRESS tasks
- ✅ **Completed**: Only COMPLETED tasks

3. **Test Loading States**:
   - Refresh page (F5)
   - Watch for skeleton loaders
   - Stats populate after API calls

4. **Test Real-Time Updates**:
   - Go to Tasks page
   - Create a new task
   - Return to Dashboard
   - **Expected**: Total Tasks increased by 1

---

## ✅ Priority 8: Profile Settings

### Test Steps:
1. **Navigate to**: https://task-flow-khaki-nine.vercel.app/profile

**Profile Information Card**:
2. **Check displays**:
   - ✅ Avatar with initials
   - ✅ Full name
   - ✅ Email
   - ✅ Role badge (ADMIN/MANAGER/MEMBER)
   - ✅ "Joined [date]"

**Update Personal Information**:
3. Change your name
4. Click **"Update Profile"**

**Expected**:
- ✅ Loading: "Updating..."
- ✅ Success toast
- ✅ Navbar updates with new name
- ✅ Avatar initials update

**Change Password**:
5. Enter current password
6. Enter new password (min 6 chars)
7. Confirm new password
8. Watch for validation:
   - ⚠️ "Passwords do not match" if mismatch
   - ⚠️ "Minimum 6 characters" if too short
9. Click **"Change Password"**

**Expected**:
- ✅ Loading: "Changing Password..."
- ✅ Success toast
- ✅ Form clears
- ✅ Can login with new password later

**Error Scenarios**:
- ❌ Wrong current password → "Current password is incorrect"
- ❌ Password too short → "Password must be at least 6 characters"
- ❌ Passwords don't match → "Passwords do not match"

---

## 🧪 Cross-Feature Integration Tests

### Test 1: Complete User Journey
1. Login with GitHub OAuth (Priority 1)
2. View dashboard stats (Priority 7)
3. Create task with assignment (Priority 2)
4. Search for your new task (Priority 3)
5. Open task details (Priority 6)
6. Edit task in modal (Priority 6)
7. Return to dashboard → stats updated (Priority 7)

### Test 2: Profile & Password Flow
1. Update profile name (Priority 8)
2. Change password (Priority 8)
3. Logout
4. Try old password → fails
5. Try new password → succeeds
6. Alternatively: Use forgot password flow (Priority 4)

### Test 3: Error Handling
1. Go offline (disable network)
2. Try to create task → error toast
3. Go back online
4. Trigger error boundary (Priority 5)
5. Click "Reload" → app recovers

---

## 📱 Responsive Design Tests

Test on different screen sizes:

### Mobile (375px)
- ✅ Tasks page filters stack vertically
- ✅ Task cards full width
- ✅ Modal scrollable
- ✅ Profile page cards stack
- ✅ Dashboard cards 1 column

### Tablet (768px)
- ✅ Dashboard 2 columns
- ✅ Filters row wraps nicely
- ✅ Task cards 2 columns

### Desktop (1024px+)
- ✅ Dashboard 3 columns
- ✅ All filters in one row
- ✅ Task cards 3 columns
- ✅ Modal comfortable width

---

## 🚀 Performance Tests

1. **Page Load Speed**:
   - Dashboard should load < 2 seconds
   - Tasks page < 2 seconds
   - Check Network tab for API calls

2. **Animation Smoothness**:
   - OAuth callback animations 60fps
   - Modal transitions smooth
   - No jank on scroll

3. **API Response Times**:
   - Tasks API < 500ms
   - Projects API < 300ms
   - Dashboard stats < 1s

---

## 🐛 Known Issues to Watch For

1. **GitHub OAuth**:
   - If email is private → proper error message
   - Token should persist in localStorage

2. **Password Reset**:
   - Tokens expire after 1 hour
   - Check spam folder for email

3. **Task Assignment**:
   - Unassigned tasks show "Unassigned" not null

4. **Filters**:
   - Combining filters uses AND logic
   - Clear button removes ALL filters

---

## ✅ Success Criteria

### All Tests Pass If:
- ✅ GitHub OAuth works with beautiful animations
- ✅ Tasks can be assigned to users
- ✅ Search and all 3 filters work correctly
- ✅ Password reset complete flow succeeds
- ✅ Error boundary catches errors gracefully
- ✅ Task modal shows/edits/deletes tasks
- ✅ Dashboard shows real API data
- ✅ Profile updates and password change work
- ✅ No console errors
- ✅ All animations smooth
- ✅ Responsive on all devices
- ✅ Toast notifications show feedback

---

## 🎯 Priority Order for Testing

**Quick Test (15 minutes)**:
1. Login with GitHub OAuth ✅
2. View dashboard stats ✅
3. Create task with assignee ✅
4. Search/filter tasks ✅
5. Open task modal ✅

**Full Test (45 minutes)**:
1. All Quick Tests
2. Forgot password flow ✅
3. Profile settings updates ✅
4. Error boundary test ✅
5. Responsive design check ✅
6. Integration tests ✅

**Comprehensive Test (90 minutes)**:
- Everything above
- All error scenarios
- Edge cases
- Performance testing
- Multiple browsers

---

## 📊 Test Results Template

Copy and fill out:

```
Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

[ ] Priority 1: OAuth Callback UI
    Notes: ___________

[ ] Priority 2: Task Assignment
    Notes: ___________

[ ] Priority 3: Search & Filters
    Notes: ___________

[ ] Priority 4: Forgot Password
    Notes: ___________

[ ] Priority 5: Error Boundary
    Notes: ___________

[ ] Priority 6: Task Detail Modal
    Notes: ___________

[ ] Priority 7: Dashboard Stats
    Notes: ___________

[ ] Priority 8: Profile Settings
    Notes: ___________

Overall Status: PASS / FAIL
Issues Found: ___________
```

---

## 🔗 Quick Links

- **Frontend**: https://task-flow-khaki-nine.vercel.app/
- **Login**: https://task-flow-khaki-nine.vercel.app/login
- **Dashboard**: https://task-flow-khaki-nine.vercel.app/dashboard
- **Tasks**: https://task-flow-khaki-nine.vercel.app/tasks
- **Profile**: https://task-flow-khaki-nine.vercel.app/profile
- **Forgot Password**: https://task-flow-khaki-nine.vercel.app/forgot-password

---

**Good luck with testing! 🚀**
