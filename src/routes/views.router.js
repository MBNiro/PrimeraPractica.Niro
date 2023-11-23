import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("chat");
});

import {getAllController,getByIdController,createController,updateController,deleteController,
} from "../controllers/messages.controllers.js";

router.get("/", getAllController);
router.get("/:id", getByIdController);
router.post("/", createController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

export default router;