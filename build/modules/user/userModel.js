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
exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const slugify_1 = __importDefault(require("slugify"));
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["assistant"] = "assistant";
    UserRole["user"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [6, "Password is too short"],
        max: [64, "Password is too long"],
    },
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.user,
    },
    token: {
        type: String,
    },
}, {
    timestamps: true,
});
// @desc generateAuth Token
userSchema.method("generateAuthToken", function generateAuthToken() {
    const user = this;
    const payload = {
        userId: user._id,
        email: user.email,
    };
    const SECRET_KEY = process.env.SECRET_KEY || "HusseinSec";
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
        expiresIn: "200h",
    });
    user.token = token;
    user.save();
    return token;
});
// @desc Hash password using bcrypt
function hashPassword(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(value, saltRounds);
        return hash;
    });
}
// @desc Pre-save hook to hash the password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = yield hashPassword(this.password);
        next();
    });
});
userSchema.pre("save", function (next) {
    this.slug = (0, slugify_1.default)(this.name);
    next();
});
// @desc Compare password
userSchema.method("comparePassword", function comparePassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt_1.default.compare(password, this.password);
        return isMatch;
    });
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
