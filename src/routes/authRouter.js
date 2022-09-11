import express from "express"
import { signIn, signUp } from "../controllers/authController.js"
import { validateUserSignIn, validateUserSignUp } from "../middlewares/validateAuthMiddleware.js";



const router = express.Router();
router.post('/register', validateUserSignUp, signUp);
router.post(('/'), validateUserSignIn, signIn);

export default router;