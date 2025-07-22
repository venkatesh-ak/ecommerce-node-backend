# Mini E-commerceusing Node.js Prisma MySQL

A robust backend template built with **Node.js**, **Express.js**, **Prisma ORM**, and **MySQL** — designed for scalable REST API development.

---

## 🚀 Features

- ✅ RESTful API with Express.js
- ✅ Prisma ORM for type-safe DB access
- ✅ MySQL database integration
- ✅ Modular structure with Controllers, Routes, and Services
- ✅ JWT-based Authentication (optional)
- ✅ Environment variable management using `.env`
- ✅ Built-in error handling and middleware support

---

## 🛠️ Tech Stack

- **Node.js** – Backend Runtime
- **Express.js** – Web Framework
- **Prisma** – Type-safe ORM
- **MySQL** – Relational Database
- **dotenv** – Environment Management
- **Nodemon** – Dev Auto-restart

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/venkatesh-ak/ecommerce-node-backend.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Set up the database
npx prisma migrate dev --name init
