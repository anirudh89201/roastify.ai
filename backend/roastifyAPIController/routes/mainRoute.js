import { Router } from "express";
import { FileHandler, removeUser, SignUpService, StatusService } from "../controller/mainController.js";
import { uploadedFile } from "../middlewares/ImageUpload.js";
const router = Router();
router.post("/upload",uploadedFile.single('file'),FileHandler);
router.post("/auth/google",SignUpService);
router.get("/auth/status",StatusService);
router.post("/auth/removeUser",removeUser);
export default router;