import multer from "multer";
import { Request } from "express";

type File = Express.Multer.File;
type FileFilterCallback = (
  error?: Error | null | string,
  acceptFile?: boolean | string
) => void;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilterVideo = (req: Request, file: File, cb: FileFilterCallback) => {
  if (file.mimetype !== "video/mp4" && file.mimetype !== "video/webm") {
    return cb(new Error("Only image videos are allowed!"), false);
  }
  cb(null, true);
};

export const uploadVideo = multer({
  storage: storage,
  fileFilter: fileFilterVideo,
});
