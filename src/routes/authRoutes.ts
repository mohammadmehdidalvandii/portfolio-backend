import { Router } from "express";
import { adminController } from "../controller/amin.controller";

const router = Router();

router.post('/register', adminController.register );
router.post('/login', adminController.login);

export default router