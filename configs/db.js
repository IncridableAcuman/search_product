const mongoose=require('mongoose');
module.exports=()=>{
    mongoose.connect('mongodb://localhost/quizapp').then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((er)=>{
        console.log("Connection failed!",er);
    });
}