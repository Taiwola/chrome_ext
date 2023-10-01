"use strict";
const { spawn } = require("child_process");
const ffmpeg = spawn("ffmpeg", [
    "-i",
    "input.mp4",
    "-c:v",
    "libx264",
    "-c:a",
    "aac",
    "-strict",
    "experimental",
    "-b:a",
    "192k",
    "output.mp4",
]);
