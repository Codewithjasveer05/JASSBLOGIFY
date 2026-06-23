const {Router} = require('express')
const router = Router()
const path = require('path')
const multer = require('multer')
const Blog = require('../models/blog')
const Comment = require('../models/comments')

const storage = multer.diskStorage({
   destination : function(req,file,cb){
        cb(null,path.resolve(`./public/uploads/`))
    },
    filename : function(req,file,cb){
     const fileName  = `${Date.now()}-${file.originalname}`
     cb(null,fileName)
    },
})
const upload = multer({storage :storage })

router.get('/add-new',(req,res)=>{
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    return res.render('blog',{
        user : req.user
    })
})

router.post('/', upload.single('coverImage'), async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin');
    }

    try {
        const { title, body } = req.body;

        const newBlog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImgUrl: req.file ? `/uploads/${req.file.filename}` : '',
        });

        return res.redirect(`/blog/${newBlog._id}`);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Something went wrong creating the blog');
    }
});

router.get("/:id", async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin');
    }

    try {
        const blog = await Blog.findById(req.params.id)
            .populate("createdBy");

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        const comments = await Comment.find({
            blogId: req.params.id,
        }).populate("createdBy");

        return res.render("Blogdetails", {
            user: req.user,
            blog,
            comments,
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).send('Blog not found');
    }
});

router.post("/:blogId/comment", async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin');
    }

    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });

        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Something went wrong adding the comment');
    }
});

module.exports = router