"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const AppError_1 = require("./AppError");
const userRoutes_1 = __importDefault(require("./modules/user/userRoutes"));
const AuthRoutes_1 = __importDefault(require("./modules/user/auth/AuthRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const CategoryRoutes_1 = __importDefault(require("./modules/category/CategoryRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/Refactor-TS";
const PORT = process.env.PORT || 3000;
database_1.default.connect(URL);
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/auth", AuthRoutes_1.default);
app.use("/api/v1/categories", CategoryRoutes_1.default);
app.all("*", (req, res, next) => {
    next(new AppError_1.AppError("Internal Server Error", 500, `Cannot find this route : ${req.originalUrl}`, true));
});
const errorHandler = new ErrorHandler_1.default();
app.use(errorHandler.HandleExpressErrorsMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
