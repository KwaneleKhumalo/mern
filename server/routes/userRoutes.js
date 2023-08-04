import { Router } from 'express';
import { getSingleUser, getUsers, login, logout, profile, register } from '../controllers/userController.js';
import { adminProtect, protect } from '../middleware/protectMiddleware.js';
const userRouter = Router();

// Get Routes: 

// Admin Only
userRouter.route('/').get(adminProtect, getUsers)
userRouter.route('/:userID').get(adminProtect, getSingleUser)

// Authenticated Users + Admin 
userRouter.get("/auth/profile", protect,profile)

// Post Route
userRouter.post("/registration", register)
userRouter.post("/login", login)

// Users will need to have been Authenticated to logout
userRouter.post("/logout", protect, logout)

// Update Route

// Delete Route


export default userRouter