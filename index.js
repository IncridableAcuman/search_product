const express=require('express');
require('dotenv').config();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const db=require('./configs/db');
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/question.routes');
const errorMiddleware=require('./middlewares/error.middleware');
const app=express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

app.use(errorMiddleware);

const port=process.env.PORT || 4000;
db();
app.listen(port,()=>{
    console.log(`Server is starting ${port} on port...`);
});