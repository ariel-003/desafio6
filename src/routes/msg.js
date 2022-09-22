import { Router } from "express";
const msgRouter = Router();
import { get, addMsg } from "../controllers/msgController.js";

msgRouter.get("/", get);
msgRouter.post("/", addMsg);

export default msgRouter;