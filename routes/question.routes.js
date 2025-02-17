const {Router}=require('express');
const userAuthMiddleware=require('../middlewares/userAuth.middleware');
const questionController = require('../controllers/question.controller');

const router=Router();

router.post('/create',userAuthMiddleware,questionController.createPost);
router.get('/all',userAuthMiddleware,questionController.getAllPost);
router.get('/one/:id',userAuthMiddleware,questionController.getPostOne);
router.put('/update/:id',userAuthMiddleware,questionController.updatePost);
router.delete('/delete/:id',userAuthMiddleware,questionController.deletePost);

module.exports=router;