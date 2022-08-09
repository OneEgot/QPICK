import {Router} from "express";

import UserController from "../controllers/user-controller";

import {body} from "express-validator";

const router:Router = new Router();

router.post("/register", 

        body("username").isLength({min:6, max:12}),

        body("password").isLength({min:6, max:12}),

    UserController.Registration
);

router.post("/login",  UserController.Login)

export default router;