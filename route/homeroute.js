import express from 'express';
import HomeController from '../controller/homeController.js';

const homeRouter=express.Router();
const homeController= new HomeController();

homeRouter.get('/',(req,res)=>{homeController.getHomePage(req,res)}) 
homeRouter.get('/habitStatus',(req,res)=>{homeController.habitStatus(req,res)}) 
homeRouter.get('/delete',(req,res)=>{homeController.deleteHabit(req,res)}) 

homeRouter.get('/getList',(req,res)=>{homeController.getListPage(req,res)}) 
homeRouter.get('/weekly',(req,res)=>{homeController.getWeeklyPage(req,res)}) 

homeRouter.post('/submit',(req,res)=>{homeController.addHabit(req,res)}) 

homeRouter.use((req,res)=>{
    res.send("API route not found")
})
export default homeRouter;