import express from "express";
import MyUserController from '../controller/MyUserController';
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

// api/my/user  for getting the current user
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);

// api/my/user -> call -> send request to the  controller to create user
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export default router;