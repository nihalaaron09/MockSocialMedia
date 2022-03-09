const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req, res)=> {  
        //make sure users can only update their own accounts
        if (req.params.id === req.body.userId || req.body.isAdmin){
            if (req.body.password){  //if updating password, generate new password and save to request body
                try{
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.pasword, salt);
                }
                catch(err){                 
                    return res.status(500).json(err)
                }
            }
            try{         
                const user = await User.findByIdAndUpdate(req.params.id,
                    {$set: req.body})   //$set operator takes wahtever fields from request body and filles in corresponding fields with user if as req.params.id
                res.status(200).json('account has been updated');
            }
            catch(err){
                res.status(500).json(err)
            }            
        }else{
            return res.status(403).json("can only update your own account")
        }
})

//delete user
router.delete('/:id', async (req, res) => {
        if (req.params.id === req.body.userId || req.body.isAdmin){
            try{
                const user = await User.findByIdAndRemove(req.params.id)
                console.log(user)
                res.json('User removed successfully').status(200)
            }catch(err){
                console.log(err);
                res.status(500).json(err)
            } 
        }else{
            res.status(403).json("can only delete your own account")
        }
})

//get user

router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    
    try{
        const user = userId ? await User.findById(userId) 
        : await User.findOne({username: username}) 
        const { password, updatedAt, ...other} = user._doc  //dont send password and updatedAt fields
        !user && res.status(404).json('User not found!')
        res.status(200).send(other)
    }catch(err){
        res.send(500).json(err)
    }
})


//follow user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
 
            if (!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers: req.body.userId}}) //add req.body.userId to followes
                await currentUser.updateOne({$push:{following: req.params.id}})
                res.status(200).json('User has been followed!')
            }else{
                res.status(403).json('you already follow this user')
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json('cannot follow yourself')
    }
})
//unfollow user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}})  //remove req.body.userId from followes
                await currentUser.updateOne({$pull:{following: req.params.id}})
                res.status(200).json('User has been unfollowed!')
            }else{
                res.status(403).json('you do not follow this user')
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json('cannot unfollow yourself')
    }
})




module.exports = router;