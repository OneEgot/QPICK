"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const express_validator_1 = require("express-validator");
const router = new express_1.Router();
router.post("/register", (0, express_validator_1.body)("username").isLength({ min: 6, max: 12 }), (0, express_validator_1.body)("password").isLength({ min: 6, max: 12 }), user_controller_1.default.Registration);
router.post("/login", user_controller_1.default.Login);
exports.default = router;
