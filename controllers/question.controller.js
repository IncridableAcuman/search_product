const questionService = require("../services/question.service");

class QuestionController{
    async createPost(req,res,next){
        try {
            const {title,description,counter}=req.body;
            const {id}=req.user;
            const post=await questionService.createPost(title,description,counter,id);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }
    async getAllPost(req,res,next){
        try {
          const post=await questionService.getAllPost();
          return res.json(post);  
        } catch (error) {
            next(error);
        }
    }
    async getPostOne(req,res,next){
        try {
            const {id}=req.params;
            const post=await questionService.getPostOne(id);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }
    async updatePost(req,res,next){
        try {
            const {title,description,counter}=req.body
            const {id}=req.params
            const post=await questionService.updatePost(id,title,description,counter);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }
    async deletePost(req,res,next){
        try {
            const {id}=req.params
            const post=await questionService.deletePost(id);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new QuestionController();