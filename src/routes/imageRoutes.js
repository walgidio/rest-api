import { Router } from "express";

import imageController from "../controllers/imageController";

const router = new Router();

router.post('/', imageController.store);

export default router;
