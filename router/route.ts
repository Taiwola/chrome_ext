import { Router } from "express";
import { uploadVideo } from "../middlewares/multer";
import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";

const router = Router();
const video = uploadVideo.single("video");

router.post("/upload/:id", video, async (req, res) => {
  const id = req.params.id;
  try {
    const filePath = req.file?.path;
    const buffer: Buffer = fs.readFileSync(filePath as string);
    const bufferBody = req.body;

    const bufferOption = buffer || bufferBody;

    const mp4Readable = new Readable();
    mp4Readable._read = () => {};
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed",
    });
  }
});

router.get("/video/:id", async (req, res) => {
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
      } else {
        console.error("No match found or no number part in the filename.");
      }
    }

    // If the loop finishes without returning, it means no matching file was found
    return res.status(404).json({
      error: "File not found for the given id.",
    });
  } else {
    console.error("Directory does not exist:", outputDir);
    return res.status(500).json({
      error: "Server error: Directory not found.",
    });
  }
});

export default router;
