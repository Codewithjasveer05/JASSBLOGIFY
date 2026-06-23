# 📝 Blogify

A full-stack blogging platform built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. Users can create an account, log in securely, write blogs with cover images, and interact through comments.

---

## 🚀 Features

* 🔐 User Authentication (JWT & Cookies)
* 👤 User Registration & Login
* ✍️ Create New Blog Posts
* 🖼️ Upload Blog Cover Images (Multer)
* 📖 View All Blogs
* 📄 Read Individual Blog Posts
* 💬 Add Comments to Blogs
* 👨‍💻 Display Blog Author Information
* 🎨 Responsive UI with Bootstrap
* 🗄️ MongoDB Database Integration

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* Cookie Parser

### File Upload

* Multer

---

## 📂 Project Structure

```
Blogify
│
├── models
├── routes
├── middleware
├── services
├── public
│   ├── uploads
│   ├── images
│
├── views
│   ├── partials
│   ├── home.ejs
│   ├── blog.ejs
│   ├── Blogdetails.ejs
│
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone  https://github.com/Codewithjasveer05/Jassblogify.git
```

Go to the project folder

```bash
cd blogify
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=8005
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the project

```bash
npm start
```

or

```bash
nodemon index.js
```

Open your browser

```
http://localhost:8000
```

---

## 📸 Screenshots

Add screenshots of:

* Home Page
* Login Page
* Signup Page
* Create Blog Page
* Blog Details Page
* Comments Section

---

## 🌟 Future Improvements

* Edit Blog
* Delete Blog
* Like & Dislike System
* User Profile Page
* Rich Text Editor
* Search Blogs
* Categories & Tags
* Pagination
* Dark Mode

---

## 👨‍💻 Author

**Jasveer Singh**

GitHub: https://github.com/Codewithjasveer05

