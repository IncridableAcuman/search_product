const BaseError=require('../errors/base.error');
const Post=require('../models/question.model')
const PostDTO=require('../dtos/question.dto');
class QuestionService{

    async createPost(title,description,counter,id){
        if(!title || !description || !counter){
        throw BaseError.BadRequest("All fields should be required!");
        }

        const post=await Post.create({title,description,counter,user:id});
        return post;
    }

    async getAllPost(){
        return  await Post.find().populate('user');
        
    }

    async getPostOne(id){
        if(!id){
            throw BaseError.NotFound("Post not found");
        }
        const post=await Post.findById(id).populate('user');
        const postDto=new PostDTO(post);
        return postDto;
    }

    async updatePost(id,title,description,counter){
        const post=await Post.findByIdAndUpdate(id,{title,description,counter},{new:true});
        const postDto=new PostDTO(post);
        return postDto;
    }

    async deletePost(id){
        if(!id){
            throw BaseError.NotFound("Post not found");
        }
        return await Post.findByIdAndDelete(id);
    }
}
module.exports=new QuestionService();