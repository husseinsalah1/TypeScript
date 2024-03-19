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
exports.Test = exports.Repository = void 0;
const categoryModel_1 = __importDefault(require("./category/categoryModel"));
class Repository {
    constructor(collection) {
        this.collection = collection;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.collection.create(data);
            return user;
        });
    }
    update(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.findByIdAndUpdate(id, updatedData, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.findByIdAndDelete(id);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.findById(id);
        });
    }
    find(filtered, limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.find({}).limit(limit).skip(skip);
        });
    }
}
exports.Repository = Repository;
class Test extends Repository {
    constructor() {
        super(categoryModel_1.default);
    }
}
exports.Test = Test;
