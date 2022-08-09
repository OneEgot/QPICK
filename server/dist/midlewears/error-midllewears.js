"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exception/api-error"));
exports.default = (err, req, res, next) => {
    if (err instanceof api_error_1.default) {
        return res.status(err.status).json({ message: err.message, errors: err.error });
    }
    return res.status(500).json({ message: "Ошибка" });
};
