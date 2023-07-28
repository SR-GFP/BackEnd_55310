import {Router} from    "express";
import app from "../app";
const router = Router();

app.use("/api/products", productsController);
app.use("/api/")



