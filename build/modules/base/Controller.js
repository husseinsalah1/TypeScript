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
exports.Controller = void 0;
const AppError_1 = require("../../AppError");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class Controller {
    constructor(service) {
        this.service = service;
        this.create = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const item = (yield this.service.create(data));
            yield item.save();
            res.status(200).json({ item });
        }));
        this.find = (populate) => (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 5 || 5;
            const skip = (page - 1) * limit;
            let items = yield this.service.find({}, skip, limit, populate);
            res.status(200).json({ length: items === null || items === void 0 ? void 0 : items.length, page, skip, items });
        }));
        this.findOne = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield this.service.findOne(id);
            if (!item) {
                return next(new AppError_1.AppError("Not found", 404, `Cannot find this id : ${id}`, true));
            }
            res.status(200).json({ item });
        }));
        this.delete = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield this.service.delete(id);
            if (!item) {
                return next(new AppError_1.AppError("Not found", 404, `Cannot find this id : ${id}`, true));
            }
            res.status(200).send();
        }));
        this.update = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = (yield this.service.findOne(id));
            if (!item) {
                return next(new AppError_1.AppError("Not found", 404, `Cannot find this id : ${id}`, true));
            }
            Object.keys(req.body).forEach((update) => (item[update] = req.body[update]));
            yield item.save();
            res.status(200).json({ item });
        }));
    }
}
exports.Controller = Controller;
