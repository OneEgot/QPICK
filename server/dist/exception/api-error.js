"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, error = []) {
        super(message);
        this.status = status;
        this.error = error;
    }
    static UnaftorilizeUser() {
        return new ApiError(401, "Пользователь не авторизован");
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
exports.default = ApiError;
