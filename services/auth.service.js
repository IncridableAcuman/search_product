const bcrypt=require('bcrypt');
const BaseError=require('../errors/base.error');
const User=require('../models/user.model');
const UserDTO=require('../dtos/user.dto');
const tokenService=require('./token.service');

class AuthService{

    async signup(name,email,password){
        if(!name || !email || !password){
            throw BaseError.BadRequest("User's information should be required");
        }
        const existUser=await User.findOne({email});
        if(existUser){
            throw BaseError.BadRequest("User already exist");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword});
        const userDto=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {user:userDto,...tokens};
    }
    async login(email,password){
        if( !email || !password){
            throw BaseError.BadRequest("User's information should be required");
        }
        const user=await User.findOne({email});
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            throw BaseError.BadRequest("Password incorrect!");
        }
        const userDto=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {user:userDto,...tokens};
    }
    async logout(refeshToken){
        return await tokenService.removeToken(refeshToken);
    }
    async refresh(refeshToken){
        if(!refeshToken){
            throw BaseError.UnAuthorization();
        }
        const userPayload=tokenService.validateRefreshToken(refeshToken);
        const tokenDb=await tokenService.findToken(refeshToken);
        if(!userPayload || !tokenDb){
            throw BaseError.UnAuthorization();
        }
        const user=await User.findById(userPayload.id);
        const userDto=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {user:userDto,...tokens};
    }

    async getUser(id){
        const user=await User.findById(id);
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const userDto=new UserDTO(user);
        return userDto;
    }
}
module.exports=new AuthService();