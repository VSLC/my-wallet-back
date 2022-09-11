import express from "express"
import { moneyIn, moneyOut, listBalance } from "../controllers/userController.js"

const router = express.Router();
router.post('/moneyin', moneyIn);
router.post('/moneyout', moneyOut);
router.get('/home', listBalance);

export default router;