"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Course name is too short"],
        max: [64, "Course name is too long"],
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    about: {
        type: [String],
    },
    image: String,
    hours: {
        type: Number,
        required: [true, "hours is required"],
    },
    duration: {
        type: String,
    },
    classes: {
        type: String,
    },
    attends: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    isHasOffer: {
        type: Boolean,
        default: false,
    },
    offer: {
        type: Number,
        default: 0,
    },
    startOfferDate: {
        type: Date,
        default: new Date(),
    },
    endOfferDate: {
        type: Date,
        default: new Date(),
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Course must has owner"],
    },
}, { timestamps: true });
courseSchema.pre("save", function (req, next) { });
const CourseModel = (0, mongoose_1.model)("Course", courseSchema);
exports.default = CourseModel;
