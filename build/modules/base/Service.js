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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(repository) {
        this.repository = repository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.create(data);
        });
    }
    update(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.update(id, updatedData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.delete(id);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const x = yield this.repository.findOne(id);
            return yield this.repository.findOne(id);
        });
    }
    find(filtered, skip, limit, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = yield this.repository.find(filtered, skip, limit, populate);
            return x;
        });
    }
}
exports.Service = Service;
