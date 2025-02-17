const BaseError=require('../errors/base.error');
const tokenService=require('../services/token.service');
module.exports=function(req,res,next){
    try {
       const authorization=req.headers;
       if(!authorization){
        return next(BaseError.UnAuthorization());
       } 
       const accessToken=authorization.split("")[1];
       if(!accessToken){
        return next(BaseError.UnAuthorization());
       }
       const userData=tokenService.validateAccessToken(accessToken);
       if(!userData){
        return next(BaseError.UnAuthorization());
       }
       req.user=userData;
       next();
    } catch (error) {
        return next(BaseError.UnAuthorization());
    }
}