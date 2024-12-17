const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const PORT=process.env.PORT||5000;

mongoose.connect(process.env.DB_URL)
.then((result)=>{
    app.listen(PORT,()=>{

        console.log(`Running on PORT ${PORT}...`);
        
        })

})
.catch((error)=>{

    console.log(`Can't connect to database MentorDB`,error);

});

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser);

// Routes

const authRouter=require('./src/routes/auth');

app.use(`/auth`,authRouter);

// Error

app.use((err, req, res, next) => {
    const message = err.message || "Internal server error"; 
    const status = err.status||500; // You might want to set this dynamically based on the error

    res
    .status(status) 
    .json({ message, status });

});
