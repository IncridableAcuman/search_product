const {Schema,model}=require('mongoose');

const questionSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgIcP58MKd4CpuMNwdTncyXrDwBGmCYXWHA&s"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    counter:{
        type:Number,
        default:0,
        required:true
    }
},{timestamps:true});
module.exports=model("Question",questionSchema);