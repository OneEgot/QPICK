"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = __importDefault(require("../services/user-services"));
const express_validator_1 = require("express-validator");
const api_error_1 = __importDefault(require("../exception/api-error"));
class UserController {
    Registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = (0, express_validator_1.validationResult)(req);
                if (!error.isEmpty()) {
                    return next(api_error_1.default.BadRequest("Некорректные данный при вводе"));
                }
                const { username, password } = req.body;
                const candidate = yield user_services_1.default.registration(username, password);
                return res.status(200).json(candidate);
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_services_1.default.login(username, password);
                res.cookie("refreshToken", user.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.status(200).json(Object.assign({}, user));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new UserController;
