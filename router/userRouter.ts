import express from "express"
import { UserCreate, Login, Refresh, GetAllUsers } from "../controllers/UserController";
import { Authenticate } from "../middleware/auth";

const router = express.Router();


router.post("/signup", UserCreate)
router.post("/login", Login)
router.post("/refresh", Refresh);
router.get("/getallusers",Authenticate, GetAllUsers)


export  default router