# 🚂 Railway Environment Variables Setup

## **Critical: Update These on Railway Dashboard**

Go to: https://railway.app → Your Project → Variables

### **Required Updates:**

```env
# Frontend URL (Vercel)
FRONTEND_URL=https://task-flow-khaki-nine.vercel.app
CORS_ORIGIN=https://task-flow-khaki-nine.vercel.app

# Backend URL (Railway)
BACKEND_URL=https://task-flow-production-2c16.up.railway.app

# GitHub OAuth (already set, but verify)
GITHUB_CLIENT_ID=Ov23lifXjBU9B6ppTUjZ
GITHUB_CLIENT_SECRET=[your-secret]
GITHUB_CALLBACK_URL=https://task-flow-production-2c16.up.railway.app/api/auth/github/callback

# JWT Secret (verify it's set)
JWT_SECRET=[your-secret-here]
JWT_EXPIRES_IN=7d

# Database (Railway should auto-set these)
DATABASE_URL=postgresql://[auto-generated-by-railway]

# Redis (if using)
REDIS_URL=redis://[auto-generated-by-railway]

# Email Service (Resend)
RESEND_API_KEY=[your-resend-key]
EMAIL_FROM=noreply@yourdomain.com

# Node Environment
NODE_ENV=production
PORT=5000
```

---

## **Frontend Environment Variables (Vercel)**

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

```env
NEXT_PUBLIC_API_URL=https://task-flow-production-2c16.up.railway.app/api
```

---

## **GitHub OAuth App Settings**

Update at: https://github.com/settings/developers

**Authorization callback URL:**
```
https://task-flow-production-2c16.up.railway.app/api/auth/github/callback
```

**Homepage URL:**
```
https://task-flow-khaki-nine.vercel.app
```

---

## **How to Update:**

### Railway:
1. Click project → Variables tab
2. Add/update each variable
3. Click "Redeploy" after changes

### Vercel:
1. Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_API_URL`
3. Redeploy from Deployments tab

### GitHub OAuth:
1. https://github.com/settings/developers
2. Click your app
3. Update URLs
4. Save

---

**After updating, redeploy both services!**
