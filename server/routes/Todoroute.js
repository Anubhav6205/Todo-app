const {Router} =require('express');
const router=Router();
const {getTodo,saveTodo,updateTodo,deleteTodo,deleteAllTodo,searchTodo}=require('../controllers/Todocontrollers')
router.get('/',getTodo)
router.post('/save',saveTodo)
router.post('/update',updateTodo)
router.post('/delete',deleteTodo)
router.post('/deleteall',deleteAllTodo)
router.post('/search',searchTodo)

module.exports = router