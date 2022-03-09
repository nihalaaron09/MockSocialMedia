const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer')
const path = require('path')

//middleware
app.use(express.json()); //use to parse JSON data to resquest body
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));
app.use("/images", express.static(path.join(__dirname, "public/images")))


//Route imports
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')


//configure dotenv
dotenv.config();

//connect mongoDB
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("DB connected successfully")
});

const storage = multer.diskStorage({
    filename: function(req,file,cb){
      console.log("filename");
      cb(null, file.originalname);
    },
    destination: function(req,file,cb){
      console.log("storage");
      cb(null,'public/images');
    }
  });


const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res)=> {
    try{
        console.log(req.body.test)
        return res.status(200).json("file uploaded")
    }
    catch(err){
        console.log(err)
    }
})

//Call Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);


//Home route
app.get('/', (req, res)=> {
    res.send('App working as expected');
})


//get Port info
PORT = process.env.PORT || config.get('port');

//Listen on PORT
app.listen(PORT,  () => {
    console.log(`Listening on port ${PORT}`);
} );

