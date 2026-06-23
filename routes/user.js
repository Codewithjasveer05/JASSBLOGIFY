const User = require('../models/user')
const {Router} = require('express')
const router = Router()

router.get('/signin',(req,res)=>{
    res.render('signin',{
        user : req.user
    })
})

router.get('/signup',(req,res)=>{
    res.render('signup',{
        user : req.user
    })
})

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.create({ name, password, email });
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
        res.render('signup', {
            error: 'Email already exists or invalid details',
        });
    }
})

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body
    try{
        const token = await User.matchPasswordandGenerateToken(email,password)
        return res.cookie('token',token).redirect('/')
    }
    catch(error){
        res.render('signin',{
            error : 'Incorrect email and password'
        })
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/user/signin');
})

module.exports = router