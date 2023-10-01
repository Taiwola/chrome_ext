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
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importStar(require("fluent-ffmpeg"));
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
fluent_ffmpeg_1.default.setFfmpegPath(ffmpegPath);
(0, fluent_ffmpeg_1.setFfprobePath)(ffmpegPath);
function convertToAudio(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)()
            .input(inputFilePath) // Input video file
            .audioCodec("libmp3lame") // Output audio codec (MP3)
            .toFormat("mp3") // Output format (MP3)
            .on("end", () => {
            console.log("Conversion finished");
            resolve(outputFilePath); // Resolve with the path to the converted audio file
        })
            .on("error", (err) => {
            console.error("Error during conversion:", err);
            reject(err); // Reject with an error if conversion fails
        })
            .save(outputFilePath); // Output audio file path
    });
}
exports.default = convertToAudio;
// Example usage:
// const inputFilePath = "path/to/input_video.mp4";
// const outputFilePath = "path/to/output_audio.m4a";
// convertToAudio(inputFilePath, outputFilePath)
//   .then((outputFilePath) => {
//     console.log("Audio conversion successful. Output file:", outputFilePath);
//   })
//   .catch((error) => {
//     console.error("Audio conversion failed:", error);
//   });
