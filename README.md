# 📝 Blog Management System

A modern full-stack Blog Management System built with **React**, **Node.js**, **Express**, **Neon DB**, and **Prisma ORM**. The application provides a secure admin dashboard for managing blogs, categories, and media while delivering a fast and responsive reading experience for users.

Designed with scalability, security, and maintainability in mind, this project follows a client-server architecture with a RESTful API and modern frontend tooling.

---

## ✨ Features

### 🔐 Authentication & Security

- Secure Admin Login
- JWT Authentication
- Password Hashing using bcrypt
- HTTP-only Cookies
- Helmet Security Middleware
- API Rate Limiting
- CORS Protection

---

### 📝 Blog Management

- Create Blog
- Update Blog
- Delete Blog
- Rich Text Editor (TipTap)
- Upload Featured Images
- Draft & Publish Support
- Blog Search
- Responsive Blog Layout

---

### 🎨 Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router v7
- React Hook Form
- Axios
- React Hot Toast Notifications
- Responsive Design
- Internationalization (i18next)

---

### ⚙ Backend

- Express.js REST API
- Prisma ORM
- Cloudinary Image Upload
- Multer File Upload
- Morgan Request Logging
- Cookie Parser
- Environment Configuration with dotenv

---

## 🛠 Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- TipTap Editor
- Lucide Icons
- i18next

### Backend

- Node.js
- Express.js
- Prisma ORM
- JWT
- bcrypt
- Multer
- Cloudinary

### Security

- Helmet
- express-rate-limit
- CORS

---

## 📁 Project Structure

```
Blog-Management-System
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── prisma
│   ├── src
│   ├── uploads
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/divyanshu5357/blog-management-system.git
```

---

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

---

## ⚙ Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## ▶ Run Development Server

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## 📦 Build Frontend

```bash
npm run build
```

---

## 📚 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/login | Admin Login |
| POST | /api/blog | Create Blog |
| GET | /api/blog | Get All Blogs |
| GET | /api/blog/:id | Get Single Blog |
| PUT | /api/blog/:id | Update Blog |
| DELETE | /api/blog/:id | Delete Blog |

---

## 🔒 Security Features

- JWT Authentication
- Password Encryption
- Helmet Middleware
- Rate Limiting
- Secure Cookies
- Environment Variables
- Input Validation

---

## 🌍 Internationalization

The application supports multiple languages using **i18next** and browser language detection.

---

## 📸 Screenshots

> Add screenshots of:

- Home Page
- Blog Details
- Admin Dashboard
- Create Blog
- Rich Text Editor
- Mobile View

---

## 📌 Future Improvements

- User Registration
- Comments System
- Like & Bookmark
- Blog Categories
- Email Notifications
- Analytics Dashboard
- AI-assisted Blog Writing
- Reading Time Estimation
- Related Articles
- Dark Mode

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Fork the repository and submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Divyanshu Pratap Singh**

GitHub: https://github.com/divyanshu5357
