module.exports=class {
    id
    name
    email
    password
    isAdmin
    createdAt
    avatar
    constructor(user){
        this.id=user.id
        this.name=user.name
        this.email=user.email
        this.isAdmin=user.isAdmin
        this.createdAt=user.createdAt
        this.avatar=user.avatar
    }
}