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
const user_model_1 = __importDefault(require("../models/UserModel/user-model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_services_1 = __importDefault(require("./token-services"));
const dtos_1 = __importDefault(require("../DTOS/dtos"));
const api_error_1 = __importDefault(require("../exception/api-error"));
class UserSerices {
    registration(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_model_1.default.findOne({ username });
            if (candidate)
                throw api_error_1.default.BadRequest(`Пользователь c ${username} уже существует`);
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            const user = yield user_model_1.default.create({ username: username, password: hashPassword });
            const UserDto = new dtos_1.default(user.username, user.id);
            const tokens = token_services_1.default.generateTokens(Object.assign({}, UserDto));
            yield token_services_1.default.saveToken(user._id, tokens.accesToken);
            const UserRes = {
                user: Object.assign({}, UserDto),
                tokens: Object.assign({}, tokens)
            };
            return Object.assign({}, UserRes);
        });
    }
    ;
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ username });
            if (!user)
                throw api_error_1.default.BadRequest(`Пользователь c ${username} уже существует`);
            const candidatePassword = yield bcrypt_1.default.compare(password, user.password);
            if (!candidatePassword)
                throw api_error_1.default.BadRequest("Неверный пароль");
            const UserDto = new dtos_1.default(user.username, user.id);
            const tokens = token_services_1.default.generateTokens(Object.assign({}, UserDto));
            yield token_services_1.default.saveToken(UserDto.id, tokens.refreshToken);
            const UserRes = {
                user: Object.assign({}, UserDto),
                tokens: Object.assign({}, tokens)
            };
            return Object.assign({}, UserRes);
        });
    }
}
exports.default = new UserSerices;
