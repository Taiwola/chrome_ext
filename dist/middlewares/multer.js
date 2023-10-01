"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const fileFilterVideo = (req, file, cb) => {
    if (file.mimetype !== "video/mp4" && file.mimetype !== "video/webm") {
        return cb(new Error("Only video files (MP4 or WebM) are allowed!"), false);
    }
    cb(null, true);
};
exports.uploadVideo = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilterVideo,
});
