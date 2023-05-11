import { Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

routes.post("/user", UserController.create);
routes.get("/user", UserController.get);
routes.put("/user/:id", UserController.update);

export default routes;
