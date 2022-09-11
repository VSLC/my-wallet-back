import express from "express"
import { moneyIn, moneyOut, listBalance } from "../controllers/userController.js"
import { validateMoney, validateToken } from "../middlewares/validateUserMiddleware.js";


const router = express.Router();
router.post('/moneyin', validateMoney, validateToken, moneyIn);
router.post('/moneyout', validateMoney, validateToken, moneyOut);
router.get('/home', validateToken, listBalance);

export default router;