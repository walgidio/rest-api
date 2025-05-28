import { Router } from "express";
import AlunoController from "../controllers/AlunoController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get('/', AlunoController.index);
router.get('/:id', AlunoController.show);
router.post('/', loginRequired, AlunoController.store);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);


export default router;
