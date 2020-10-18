const express = require('express')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const User = require('./models/auth.model');


require('dotenv').config({
    path:'./config/config.env'
})

const app = express();
connectDB();
app.use(bodyParser.json());

  
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

if (process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
    //each req

}


//use routes 
app.use('/api',authRouter);
app.use('/api',userRouter);

app.use((req,res,next)=>{
    res.status(404).json({
        success: false,
        message: "Page not Found"
    })
});
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
});


