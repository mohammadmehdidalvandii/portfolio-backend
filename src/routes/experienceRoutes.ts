import { Router } from "express";
import { experienceController } from "../controller/experience.controller";

const router = Router();

router.get('/' , experienceController.get);
router.post('/create', experienceController.create);
router.patch('/update/:id', experienceController.update);
router.delete('/delete/:id', experienceController.delete);

export default router