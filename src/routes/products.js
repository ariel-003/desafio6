import { Router } from "express";
const productsRouter = Router();
import { get, addProduct } from "../controllers/productsController.js";

productsRouter.get("/", get)
productsRouter.post("/", addProduct)

export default productsRouter;