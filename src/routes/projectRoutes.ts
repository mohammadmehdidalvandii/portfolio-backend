import { Router } from "express";
import { projectsController } from "../controller/projects.controller";
import upload from "../config/multer";

const router = Router();

router.get('/', projectsController.get);
router.post('/create', upload.single('image') ,projectsController.create);
router.patch('/update/:id', upload.single('image'), projectsController.update);
router.delete('/delete/:id', projectsController.delete);

export default router