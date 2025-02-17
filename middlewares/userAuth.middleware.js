const tokenService = require("../services/token.service");

module.exports=function(req,res,next){
    try {
        const {refreshToken}=req.cookies;
        if(!refreshToken){
            return next(BaseError.UnAuthorization());
        }
        const userData=tokenService.validateRefreshToken(refreshToken);
        if(!userData){
            return next(BaseError.UnAuthorization());
        }
        req.user=userData;
        next();
    } catch (error) {
        return next(BaseError.UnAuthorization());
    }
}