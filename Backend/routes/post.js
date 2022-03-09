const router = require('express').Router()
const Post = require('../Models/Post')
const User = require('../Models/User')
var mongoose = require('mongoose')


//create a Post
router.post('/', async (req, res)=> {
    const newPost =  new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
    })

//update a Post
router.put('/:id', async (req, res)=> {
    try{
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
            res.send(200).json('post has been updated')
        }else{
            return res.status(403).json('you can only edit your posts')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
   
})


//delete a Post
router.delete('/:id', async (req, res)=> {
    try{
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.deleteOne({$set: req.body})
            res.send(200).json('post has been deleted')
        }else{
            return res.status(403).json('you can only delete your posts')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
   
})


//like a post
router.put('/:id/like', async (req, res)=> {
    try{
        console.log('here now')
        const post = await Post.findById(req.params.id)
        !post && res.status(404).json('Post not found')
        console.log(post)
        console.log(post.likes)
        if (!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            console.log(post.like)
            res.status(200).json('Post has been liked!')
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            console.log(post.like)
            res.status(200).json('Post has been disliked!')
        }
    }
    catch(err){
        console.log('oooops')
        console.log(err)
        res.status(500).json(err)
    }

})

//get a post
router.get('/', async (req, res)=> {
 
    try{    
        const post = await Post.findById(req.params.id)
        !post && res.status(404).json('No post with that ID found')
        res.status(200).json(post)

    }catch(err){
        res.status(500).json(err)
    }
})


//get timeline posts
router.get('/timeline/:userId', async (req, res)=> {
    
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser.id})
        
        //use promise to fetch in loop
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err)
    }
})


//get all user's posts
router.get('/profile/:username', async (req, res)=> {
    
    try{
        const currentUser = await User.findOne({username:req.params.username})
        const userPosts = await Post.find({userId: currentUser.id})
       
        res.status(200).json(userPosts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;

