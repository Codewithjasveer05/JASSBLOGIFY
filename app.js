require('dotenv').config()
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');
const { checkForAuth } = require('./middleware/auth');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const app = express();
const PORT = process.env.PORT || 8000;
console.log('MY PORT NUMBER IS : ',PORT)

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.resolve('./public')));

// Authentication middleware
app.use(checkForAuth('token'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Home Route
app.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.find({})
            .populate('createdBy')
            .sort({ createdAt: -1 });

        console.log('Blogs:', allBlogs);

        return res.render('home', {
            user: req.user,
            blogs: allBlogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Routes
app.use('/user', userRoute);
app.use('/blog', blogRoute);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => { console.log('MongoDB Connected'); })
    .catch((err) => {console.log(err);});

// Server
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});