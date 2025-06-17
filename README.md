# 🔐 Next.js Authentication System     

url: https://next-js-auth-anby.vercel.app/

A full-stack authentication system built with **Next.js 14**, featuring secure user registration, login, password reset, email verification, and JWT-based session management.

---

## 🚀 Features

- ✅ User Sign Up & Sign In
- ✅ Email Verification
- ✅ Password Reset via Email
- ✅ Secure Hashing with **bcrypt**
- ✅ JWT Authentication
- ✅ API Routes using Next.js App Router
- ✅ Server-side validation and error handling
- ✅ Environment-based config with `.env`

---

## 🧱 Tech Stack

- **Frontend**: React + Next.js 14 (App Router)
- **Backend**: API Routes (Edge + Server Functions)
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Mailing**: Nodemailer
- **Styling**: Tailwind CSS (optional)
- **Environment Config**: dotenv

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Shivam-821/Next_js_auth.git

# Move into the directory
cd Next_js_auth

# Install dependencies
npm install

# Add your environment variables
cp .env.example .env.local
```

# Start the dev server
npm run dev

```bash
## 📁 Folder structure
src/
├── app/
│   ├── signup
│   ├── login
│   ├── profile
│   ├── resetpassword
│   ├── verifyemail
│   ├── api/
│   │   └── users/
│   │       ├── signup
│   │       ├── login
│   │       ├── logout
│   │       ├── me
│   │       ├── resetpassword
│   │       ├── newpassword
│   │       └── verifyemail
├── models/
├── helpers/
├── dbconfig/
```

## 🔐 Authentication Flow

User signs up → Email is sent for verification

User logs in → Gets JWT and session

Forgot password → Link sent to email → Creates new password

Protected routes → Checked via JWT and middleware

---
## 📬 Contact

Made with ❤️ by Shivam Raj
