const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (req, res)=> {
    console.log('reached here')
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword 
        })
        console.log('created new user')
        console.log(newUser.username)
        console.log(newUser.email)
        console.log(newUser.password)

        //save user and return response
        const user =  await newUser.save();
        console.log('saved user')
        
        res.status(200).send(user);
        
    }catch(err){
        res.status(500).json(err);
    }
})

//Login
router.post('/login', async (req, res) => {
    try{
        const user  = await User.findOne({email:req.body.email});
        //validate user existence
        !user && res.status(404).send("user not found");
        //validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log("valid password is,  " ,validPassword )
        
        !validPassword && res.status(400).send('wrong password');
            
        console.log('User logged in successfully!')
        res.status(200).send(user)
    }catch(err){
        res.status(500).json(err);
    }
    
})


module.exports = router;