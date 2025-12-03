import { Router } from "express";
import { heroController } from "../controller/hero.controller";
import upload from "../config/multer";

const router = Router();

router.get('/', heroController.getHero );
router.post('/create',upload.single('image')  ,heroController.create);
router.patch('/update/:id', upload.single('image') ,heroController.updateHero);

export default router