const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNF-zeVp_jdY3TiIUDGmj3DjCMIOa9QQVoXg&s"
    }

},{timestamps:true});
const User=model('User',userSchema);
module.exports=User;