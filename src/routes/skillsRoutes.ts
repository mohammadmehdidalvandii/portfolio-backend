import { Router } from "express";
import { skillsController } from "../controller/skills.controller";

const router = Router();

router.get('/', skillsController.get);
router.post('/create', skillsController.create);
router.patch('/update/:id', skillsController.update)

export default  router