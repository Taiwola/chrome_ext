"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const multer_1 = require("../middlewares/multer");
const fs = __importStar(require("fs"));
const stream_1 = require("stream");
const path = __importStar(require("path"));
const router = (0, express_1.Router)();
const video = multer_1.uploadVideo.single("video");
router.post("/upload/:id", video, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const buffer = fs.readFileSync(filePath);
        const bufferBody = req.body;
        const bufferOption = buffer || bufferBody;
        const mp4Readable = new stream_1.Readable();
        mp4Readable._read = () => { };
        mp4Readable.push(bufferOption);
        mp4Readable.push(null);
        const outputFileName = `video_${id}.mp4`;
        const outputDir = "./public";
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true }); // Create the directory if it doesn't exist.
        }
        const outputPath = path.join(outputDir, outputFileName);
        const outputMP4Stream = fs.createWriteStream(outputPath);
        // Pipe the mp4Readable stream into the outputMP4Stream
        mp4Readable.pipe(outputMP4Stream);
        // Optional: You can listen for events to handle errors and completion
        outputMP4Stream.on("error", (error) => {
            console.error("Error writing to outputMP4Stream:", error);
        });
        outputMP4Stream.on("finish", () => {
            console.log("Finished writing to outputMP4Stream");
        });
        return res.status(200).json({
            message: "File uploaded successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "failed",
        });
    }
}));
router.get("/video/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const outputDir = "./public";
    const id = req.params["id"]; // Assuming you have obtained the 'id' from your request
    if (fs.existsSync(outputDir)) {
        // Check if the directory exists
        const files = fs.readdirSync(outputDir);
        let filePaths = [];
        for (const file of files) {
            const filename = file;
            const regex = /video_(\d+)\.mp4/;
            const match = filename.match(regex);
            if (match && match[1]) {
                const numberPart = match[1];
                if (id === numberPart) {
                    // Match found, construct the file path and return it
                    const filePath = path.join(outputDir, filename);
                    return res.status(200).json({
                        filePath: filePath,
                    });
                }
            }
            else {
                console.error("No match found or no number part in the filename.");
            }
        }
        // If the loop finishes without returning, it means no matching file was found
        return res.status(404).json({
            error: "File not found for the given id.",
        });
    }
    else {
        console.error("Directory does not exist:", outputDir);
        return res.status(500).json({
            error: "Server error: Directory not found.",
        });
    }
}));
exports.default = router;
