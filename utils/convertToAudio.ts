import Ffmpeg, { setFfprobePath } from "fluent-ffmpeg";
import { Readable } from "stream";
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
Ffmpeg.setFfmpegPath(ffmpegPath);
setFfprobePath(ffmpegPath);

export default function convertToAudio(
  inputFilePath: string | Readable,
  outputFilePath: string
) {
  return new Promise((resolve, reject) => {
    Ffmpeg()
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
