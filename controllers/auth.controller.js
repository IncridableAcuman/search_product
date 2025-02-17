const authService = require("../services/auth.service");

class AuthController{

    async signup(req,res,next){
        try {
            const {name,email,password}=req.body;
            const user=await authService.signup(name,email,password);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await authService.login(email,password);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async logout(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.logout(refreshToken);
            res.clearCookie('refeshToken');
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.refresh(refreshToken);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getUser(req,res,next){
        try {
            const {id}=req.user;
            const user=await authService.getUser(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new AuthController();